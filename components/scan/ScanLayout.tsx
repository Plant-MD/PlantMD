'use client';

import React from 'react';
import Image from 'next/image';
import CameraView from '@/components/scan/CameraView';
import ImageUploadArea from '@/components/scan/ImageUploadArea';
import TipsSection from '@/components/scan/TipsSection';
import ErrorAlert from '@/components/scan/ErrorAlert';

interface ScanLayoutProps {
  selectedImage?: string | null;
  isProcessing?: boolean;
  isDragging: boolean;
<<<<<<< HEAD
=======
  selectedPlant: 'tomato' | 'corn';
  
>>>>>>> 95b30fb1578ab2214345ca531e6edd7792f94137
  showCamera: boolean;
  stream: MediaStream | null;
  cameraReady: boolean;
  cameraError?: string | null;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onBrowseFiles: () => void;
  onStartCamera: () => void;
<<<<<<< HEAD
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
=======
  onPlantChange: (plant: 'tomato' | 'corn') => void;
  
>>>>>>> 95b30fb1578ab2214345ca531e6edd7792f94137
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
<<<<<<< HEAD
  fileInputRef,
  handleFileInputChange,
=======
  onPlantChange,
>>>>>>> 95b30fb1578ab2214345ca531e6edd7792f94137
  onClearImage,
  onAnalyze,
  onCapturePhoto,
  onStopCamera,
  onDismissError
}) => {
  return (
<<<<<<< HEAD
    <div className="flex w-full flex-col md:flex-row justify-center">
      <div className="sprouty ml-auto max-w-md mr-10">
        <Image
          src="/sprouty.png"
          alt="Hero"
          width={350}
          height={350}
          className="mx-auto"
        />
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 leading-tight text-right">
          <span className="text-[#054714] font-oswald">
            Diagnose Plant Disease
          </span>{' '}
          <span className="text-black text-5xl">Instantly</span>
          <br />
          <span className="text-[#054714] font-oswald">with PlantMD</span>
        </h1>
      </div>
      <div className="w-full md:flex-1">
        {cameraError && (
          <ErrorAlert 
            error={cameraError} 
            onDismiss={onDismissError} 
          />
        )}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-sage/20 p-4 sm:p-8 mb-6 sm:mb-8 shadow-xl mx-3 sm:mx-0">
          {showCamera ? (
            <CameraView
              stream={stream}
              cameraReady={cameraReady}
              onCapturePhoto={onCapturePhoto}
              onStopCamera={onStopCamera}
            />
          ) : (
            <ImageUploadArea
              isDragging={isDragging}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onBrowseFiles={onBrowseFiles}
              onStartCamera={onStartCamera}
              fileInputRef={fileInputRef}
              handleFileInputChange={handleFileInputChange}
              selectedImage={selectedImage}
            />
          )}
        </div>
        <TipsSection />
=======
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
>>>>>>> 95b30fb1578ab2214345ca531e6edd7792f94137
      </div>
    </div>
  );
};

export default ScanLayout;