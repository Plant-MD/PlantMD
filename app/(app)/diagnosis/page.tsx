"use client";
import React, { useEffect, useState } from "react";
import DiagnosisCard from "@/components/shared/DiagnosisCard";
import axios from "axios";
import { Leaf, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MainDiagnosis from "@/components/shared/Diagnosis";
import { DiagnosisStorage, EnhancedDiseaseData } from "@/lib/diagnosisStorage";
import { useRouter } from "next/navigation";


function Diagnosis() {
  const [plants, setPlants] = useState<EnhancedDiseaseData[]>([]);
  const [plantType, setPlantType] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadDiagnosisData = async () => {
      try {
        // Get current diagnosis session
        const session = DiagnosisStorage.getCurrentSession();
        
        if (!session) {
          setError('No diagnosis session found. Please start a new analysis.');
          setLoading(false);
          return;
        }

        if (session.status === 'error') {
          setError(session.error || 'Analysis failed. Please try again.');
          setLoading(false);
          return;
        }

        if (session.status === 'analyzing') {
          setError('Analysis is still in progress. Please wait for it to complete.');
          setLoading(false);
          return;
        }

        setSessionId(session.id);
        setPlantType(session.plantType);

        // Try to get cached disease data first
        let diseaseData = DiagnosisStorage.getDiseaseData(session.id);
        
        if (diseaseData) {
          console.log('Using cached disease data:', diseaseData);
          setPlants(diseaseData);
          setLoading(false);
          return;
        }

        // If no cached data, fetch from API
        if (session.predictions && session.predictions.length > 0) {
          console.log('Fetching fresh disease data for predictions:', session.predictions);
          
          const responses = await Promise.allSettled(
            session.predictions.map((prediction) => {
              return axios.get(
                `/api/predict?disease_name=${encodeURIComponent(prediction.class)}&confidence=${encodeURIComponent(prediction.confidence)}`
              );
            })
          );

          // Process only successful responses
          const processedPlants: EnhancedDiseaseData[] = [];
          responses.forEach((response, index) => {
            if (response.status === 'fulfilled' && response.value.data.success) {
              processedPlants.push(response.value.data);
            } else {
              console.error(`Failed to fetch data for prediction ${index}:`, response.status === 'fulfilled' ? response.value.data : response.reason);
            }
          });

          if (processedPlants.length === 0) {
            setError('Unable to retrieve disease information from the database. The database may be temporarily unavailable.');
          } else {
            // Cache the data
            DiagnosisStorage.storeDiseaseData(session.id, processedPlants);
            setPlants(processedPlants);
          }
        } else {
          setError('No predictions found in the session.');
        }
      } catch (error) {
        console.error("Error loading diagnosis data:", error);
        setError('Failed to load diagnosis data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadDiagnosisData();
  }, []);

  const handleRetry = () => {
    DiagnosisStorage.clearSession();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Analysis
              </Button>
              {plantType && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Leaf className="h-3 w-3 mr-1" />
                  {plantType.charAt(0).toUpperCase() + plantType.slice(1)}
                </Badge>
              )}
            </div>
            {/* Removed session display */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-600">Loading diagnosis results...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="h-10 w-10 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Results</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
            <Button onClick={handleRetry} className="bg-green-600 hover:bg-green-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Start New Analysis
            </Button>
          </div>
        ) : plants.length > 0 ? (
          <div className="space-y-6">
            <MainDiagnosis {...plants[0]} />
            {plants.length > 1 && (
              <>
                <div className="text-left mb-8">
                  <h2 className="text-4xl font-oswald font-bold text-gray-600 mb-2 ml-2">
                    Additional Results
                  </h2>
                  <p className="text-gray-500 ml-2">
                    Other potential conditions detected in your plant
                  </p>
                </div>

                {plants.slice(1, 3).map((plant, index) => (
                  <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <DiagnosisCard {...plant} />
                  </div>
                ))}
              </>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Results</h3>
            <p className="text-gray-600 mb-6">No disease predictions were found for your plant.</p>
            <Button onClick={handleRetry} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Start New Analysis
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Diagnosis;
