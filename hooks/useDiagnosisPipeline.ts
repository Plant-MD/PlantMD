'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { DiagnosisStorage, PredictionData, EnhancedDiseaseData } from '@/lib/diagnosisStorage';
import { useEnhancedToast } from '@/hooks/useEnhancedToast';

interface AnalysisState {
  isAnalyzing: boolean;
  isProcessingCures: boolean;
  sessionId: string | null;
  progress: number;
  currentStep: string;
  error: string | null;
}

export function useDiagnosisPipeline() {
  const [state, setState] = useState<AnalysisState>({
    isAnalyzing: false,
    isProcessingCures: false,
    sessionId: null,
    progress: 0,
    currentStep: '',
    error: null
  });

  const router = useRouter();
  const toast = useEnhancedToast();

  const updateProgress = useCallback((progress: number, step: string) => {
    setState(prev => ({ ...prev, progress, currentStep: step }));
  }, []);

  const dataURLtoBlob = useCallback((dataURL: string): Blob => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }, []);

  const fetchDiseaseData = useCallback(async (predictions: PredictionData[]): Promise<EnhancedDiseaseData[]> => {
    const results: EnhancedDiseaseData[] = [];
    
    // Process predictions sequentially to avoid overwhelming the API
    for (let i = 0; i < predictions.length; i++) {
      const prediction = predictions[i];
      updateProgress(30 + (i / predictions.length) * 60, `Fetching treatment information...`);
      
      try {
        // Add timeout to prevent hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(
          `/api/predict?disease_name=${encodeURIComponent(prediction.class)}&confidence=${encodeURIComponent(prediction.confidence)}`,
          { signal: controller.signal }
        );
        
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            results.push(data);
          } else {
            console.warn(`API returned unsuccessful response for ${prediction.class}:`, data.message);
          }
        } else {
          console.warn(`API returned ${response.status} for ${prediction.class}`);
          const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
          console.warn('Error details:', errorData);
        }
      } catch (error) {
        console.error(`Error fetching data for ${prediction.class}:`, error);
        // Skip this prediction instead of adding fallback data
      }
    }

    if (results.length === 0) {
      throw new Error('No disease information could be retrieved from the database. Please try again later.');
    }

    return results;
  }, [updateProgress]);

  const startAnalysis = useCallback(async (imageData: string, plantType: 'tomato' | 'corn') => {
    try {
      // Create new diagnosis session
      const sessionId = DiagnosisStorage.createSession(plantType, imageData);
      
      setState(prev => ({
        ...prev,
        isAnalyzing: true,
        isProcessingCures: false,
        sessionId,
        progress: 0,
        currentStep: 'Preparing image for analysis...',
        error: null
      }));

      updateProgress(10, 'Uploading image to analysis service...');

      // Prepare form data
      const formData = new FormData();
      const blob = dataURLtoBlob(imageData);
      formData.append('file', blob, 'plant.jpg');
      formData.append('plant', plantType);

      // Start analysis
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      updateProgress(25, 'Processing AI analysis...');

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const apiErrorMessage = errorData.error || `HTTP error! status: ${response.status}`;
        throw new Error(apiErrorMessage);
      }

      const analysisData = await response.json();

      if (!analysisData.success || !analysisData.predictions) {
        throw new Error('Invalid response from analysis service');
      }

      // Update session with predictions
      DiagnosisStorage.updateSessionWithPredictions(sessionId, analysisData.predictions);

      updateProgress(30, 'Analysis complete! Fetching treatment information...');

      // Start processing cures
      setState(prev => ({ ...prev, isProcessingCures: true }));

      // Start processing cures
      setState(prev => ({ ...prev, isProcessingCures: true }));

      // Fetch disease and cure data
      const diseaseData = await fetchDiseaseData(analysisData.predictions);

      // Store disease data
      DiagnosisStorage.storeDiseaseData(sessionId, diseaseData);

      updateProgress(100, 'Diagnosis complete!');

      // Show success toast
      toast.success(
        "Analysis Complete", 
        `${plantType.charAt(0).toUpperCase() + plantType.slice(1)} analysis completed successfully`,
        3000
      );

      // Navigate to diagnosis page
      setTimeout(() => {
        router.push('/diagnosis');
      }, 1000);

    } catch (error) {
      console.error('Analysis failed:', error);
      
      // Update session with error
      if (state.sessionId) {
        DiagnosisStorage.updateSessionWithError(state.sessionId, error instanceof Error ? error.message : 'Unknown error');
      }

      // Determine error type and show appropriate toast
      let errorMessage = 'Analysis failed. Please try again.';
      let contextualIcon: 'camera' | 'upload' | 'network' | 'default' = 'default';
      
      if (error instanceof Error) {
        if (!error.message.includes('HTTP error! status:')) {
          errorMessage = error.message;
        } else {
          if (error.message.includes('400')) {
            errorMessage = 'Invalid file or plant type. Please check your selection and try again.';
            contextualIcon = 'upload';
          } else if (error.message.includes('422')) {
            errorMessage = 'The selected plant type or image format is not supported. Please try a different image or plant type.';
            contextualIcon = 'upload';
          } else if (error.message.includes('408')) {
            errorMessage = 'Analysis timeout. Please try again with a smaller image.';
            contextualIcon = 'upload';
          } else if (error.message.includes('502')) {
            errorMessage = 'Analysis service is temporarily unavailable. Please try again later.';
            contextualIcon = 'network';
          } else if (error.message.includes('503')) {
            errorMessage = 'Unable to connect to analysis service. Please check your internet connection and try again.';
            contextualIcon = 'network';
          }
        }
      }
      
      toast.error("Analysis Failed", errorMessage, 5000, contextualIcon);

      setState(prev => ({
        ...prev,
        isAnalyzing: false,
        isProcessingCures: false,
        error: errorMessage
      }));
    }
  }, [dataURLtoBlob, fetchDiseaseData, router, toast, state.sessionId, updateProgress]);

  const resetAnalysis = useCallback(() => {
    setState({
      isAnalyzing: false,
      isProcessingCures: false,
      sessionId: null,
      progress: 0,
      currentStep: '',
      error: null
    });
  }, []);

  return {
    ...state,
    startAnalysis,
    resetAnalysis
  };
}