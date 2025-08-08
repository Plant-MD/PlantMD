'use client';

import React, { useState } from 'react';
import { Sparkles, X, RefreshCw, Zap, Leaf, Wheat } from 'lucide-react';

interface ResponsiveImagePreviewProps {
  selectedImage: string;
  selectedPlant: 'tomato' | 'corn';
  isProcessing?: boolean;
  onClearImage?: () => void;
  onAnalyze?: () => void;
}

const ResponsiveImagePreview: React.FC<ResponsiveImagePreviewProps> = ({
  selectedImage,
  selectedPlant,
  isProcessing = false,
  onClearImage,
  onAnalyze
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const PlantIcon = selectedPlant === 'tomato' ? Leaf : Wheat;

  return (
    <div className="space-y-6 lg:space-y-8">
      
      <div className="relative group">
        
        <div className="relative w-full max-w-2xl mx-auto">
          <div className="aspect-video w-full rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl bg-pale">
            <img
              src={selectedImage}
              alt="Selected plant for analysis"
              className={`w-full h-full object-contain transition-all duration-500 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-forest"></div>
              </div>
            )}
          </div>

          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center bg-soft-beige/90 backdrop-blur-md rounded-full px-3 py-2 shadow-lg border border-sage/20">
            <PlantIcon className="h-4 w-4 text-leaf-green mr-2" />
            <span className="text-sm font-semibold text-forest capitalize">
              {selectedPlant}
            </span>
          </div>

          {onClearImage && (
            <button
              onClick={onClearImage}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-3 bg-warning-red/90 backdrop-blur-md text-white rounded-full hover:bg-warning-red transition-all duration-200 shadow-lg hover:shadow-xl opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 focus:ring-4 focus:ring-warning-red/30 focus:outline-none"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          )}

          <div className="absolute inset-0 rounded-xl lg:rounded-2xl border-2 border-transparent bg-gradient-to-r from-leaf-green/20 via-mint/20 to-leaf-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>

      <div className="text-center space-y-6 lg:space-y-8">
        
        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-leaf-green rounded-full animate-pulse"></div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-dark">
              {selectedPlant.charAt(0).toUpperCase() + selectedPlant.slice(1)} Image Ready for Analysis
            </h3>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-sage max-w-lg mx-auto">
            Our advanced AI will examine your {selectedPlant} plant for diseases and health issues to provide accurate diagnosis and treatment recommendations.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 max-w-sm mx-auto">
          
          {onAnalyze && (
            <button
              onClick={onAnalyze}
              disabled={isProcessing}
              className="group relative inline-flex items-center justify-center px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-forest to-leaf-green text-white font-bold rounded-xl lg:rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-forest-green hover:to-forest hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl focus:ring-4 focus:ring-mint/30 focus:outline-none overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-mint to-leaf-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative flex items-center">
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 border-b-2 border-white mr-3"></div>
                    <span className="text-sm sm:text-base lg:text-lg">Analyzing {selectedPlant}...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-3 h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 group-hover:animate-spin" />
                    <span className="text-sm sm:text-base lg:text-lg">Analyze {selectedPlant.charAt(0).toUpperCase() + selectedPlant.slice(1)}</span>
                    <Zap className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-bounce" />
                  </>
                )}
              </div>
            </button>
          )}

          {onClearImage && (
            <button
              onClick={onClearImage}
              className="inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-soft-beige border-2 border-sage/30 text-forest font-semibold rounded-xl lg:rounded-2xl hover:bg-pale hover:border-leaf-green hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg focus:ring-4 focus:ring-mint/20 focus:outline-none"
            >
              <RefreshCw className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base lg:text-lg">Choose Different Image</span>
            </button>
          )}
        </div>

       
        
      </div>
    </div>
  );
};

export default ResponsiveImagePreview;