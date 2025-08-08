'use client';

import React from 'react';
import Image from 'next/image';
import CameraView from '@/components/scan/CameraView';
import ImageUploadArea from '@/components/scan/ImageUploadArea';
import ImagePreview from '@/components/scan/ImagePreview';
import TipsSection from '@/components/scan/TipsSection';
import ErrorAlert from '@/components/scan/ErrorAlert';

interface ScanLayoutProps {
  selectedImage?: string | null;
  isProcessing?: boolean;
  isDragging: boolean;
  selectedPlant: 'tomato' | 'corn';
  
  showCamera: boolean;
  stream: MediaStream | null;
  cameraReady: boolean;
  cameraError?: string | null;
  
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onBrowseFiles: () => void;
  onStartCamera: () => void;
  onPlantChange: (plant: 'tomato' | 'corn') => void;
  
  onClearImage?: () => void;
  onAnalyze?: () => void;
  
  onCapturePhoto: (videoElement?: HTMLVideoElement) => void;
  onStopCamera: () => void;
  onDismissError?: () => void;
}

const ScanLayout: React.FC<ScanLayoutProps> = ({
  selectedImage,
  isProcessing = false,
  isDragging,
  selectedPlant,
  showCamera,
  stream,
  cameraReady,
  cameraError,
  onDragOver,
  onDragLeave,
  onDrop,
  onBrowseFiles,
  onStartCamera,
  onPlantChange,
  onClearImage,
  onAnalyze,
  onCapturePhoto,
  onStopCamera,
  onDismissError
}) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 items-start">
        
        <div className="order-1 xl:order-1 flex flex-col items-center xl:items-end justify-center space-y-6 lg:space-y-8">
          <div className="w-full max-w-sm lg:max-w-md xl:max-w-lg">
            <Image
              src="/sprouty.png"
              alt="PlantMD Mascot"
              width={400}
              height={400}
              className="w-full h-auto object-contain drop-shadow-lg"
              priority
            />
          </div>
          
          <div className="text-center xl:text-right space-y-2 lg:space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
              <span className="text-forest-green font-oswald block">
                Diagnose Plant Disease
              </span>
              <span className="text-plant-dark text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black block">
                Instantly
              </span>
              <span className="text-forest-green font-oswald block">
                with PlantMD
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-sage max-w-md mx-auto xl:mx-0">
              Upload a photo of your plant and get instant AI-powered disease diagnosis with treatment recommendations.
            </p>
          </div>
        </div>

        <div className="order-2 xl:order-2 w-full space-y-6">
          
          {cameraError && (
            <ErrorAlert 
              error={cameraError} 
              onDismiss={onDismissError} 
            />
          )}

          <div className="bg-soft-beige/90 backdrop-blur-lg rounded-2xl lg:rounded-3xl border border-sage/20 shadow-xl p-4 sm:p-6 lg:p-8">
            
            {showCamera && (
              <CameraView
                stream={stream}
                cameraReady={cameraReady}
                onCapturePhoto={onCapturePhoto}
                onStopCamera={onStopCamera}
              />
            )}

            {!showCamera && selectedImage && (
              <ImagePreview
                selectedImage={selectedImage}
                selectedPlant={selectedPlant}
                isProcessing={isProcessing}
                onClearImage={onClearImage}
                onAnalyze={onAnalyze}
              />
            )}

            {!showCamera && !selectedImage && (
              <ImageUploadArea
                isDragging={isDragging}
                selectedPlant={selectedPlant}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onBrowseFiles={onBrowseFiles}
                onStartCamera={onStartCamera}
                onPlantChange={onPlantChange}
              />
            )}
          </div>

          <TipsSection />
        </div>
      </div>
    </div>
  );
};

export default ScanLayout;