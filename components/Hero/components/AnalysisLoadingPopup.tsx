'use client';

import React, { useState, useEffect } from 'react';
import { X, Leaf, Sparkles, Microscope, Brain, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AnalysisLoadingPopupProps {
  isOpen: boolean;
  plantType: 'tomato' | 'corn';
  onClose: () => void;
}

const AnalysisLoadingPopup: React.FC<AnalysisLoadingPopupProps> = ({
  isOpen,
  plantType,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const analysisSteps = [
    {
      icon: <Microscope className="w-6 h-6" />,
      title: "Analyzing Image",
      description: "Examining plant structure and identifying key features",
      color: "text-blue-600"
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Plant Classification",
      description: `Identifying ${plantType} specific diseases`,
      color: "text-green-600"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Generating Results",
      description: "Preparing detailed diagnosis and treatment plan",
      color: "text-orange-600"
    }
  ];

  useEffect(() => {
    if (!isOpen) return;

    // Reset states when popup opens
    setCurrentStep(0);
    setProgress(0);

    // Calculate timing for smooth animation
    const totalDuration = 8000; // 8 seconds total
    const stepDuration = totalDuration / analysisSteps.length; // 2 seconds per step
    const progressInterval = 50; // Update progress every 50ms
    const progressIncrement = (100 / (totalDuration / progressInterval)); // Calculate increment per update

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, stepDuration);

    const progressIntervalId = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return Math.min(prev + progressIncrement, 100);
        }
        return prev;
      });
    }, progressInterval);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressIntervalId);
    };
  }, [isOpen, analysisSteps.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl animate-in slide-in-from-bottom-4 duration-500">
        <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-3xl overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="relative mx-auto w-20 h-20 mb-4">
                <div className="w-20 h-20 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-emerald-400 rounded-full animate-spin" 
                     style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Analyzing Your {plantType.charAt(0).toUpperCase() + plantType.slice(1)}
              </h2>
              <p className="text-gray-600 text-base sm:text-lg">
                Our AI is examining your plant image for diseases and health issues
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 font-medium">Analysis Progress</span>
                <span className="text-green-600 font-semibold">{Math.round(progress)}%</span>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-300 ease-out relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Steps */}
            <div className="space-y-4">
              {analysisSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-500 ${
                    index <= currentStep
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    index <= currentStep
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold text-lg ${
                      index <= currentStep ? step.color : 'text-gray-400'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm ${
                      index <= currentStep ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                  {index <= currentStep && (
                    <div className="flex-shrink-0">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Info */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
                <span>This may take a few moments...</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisLoadingPopup; 