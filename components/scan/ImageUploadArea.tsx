'use client';

import React, { useState, useEffect } from 'react';
import { Upload, Video, Image as ImageIcon } from 'lucide-react';
import PlantTypeSelector from '@/components/scan/PlantTypeSelector';

interface ImageUploadAreaProps {
  isDragging: boolean;
  selectedPlant: 'tomato' | 'corn';
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onBrowseFiles: () => void;
  onStartCamera: () => void;
<<<<<<< HEAD
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImage?: string | null;
=======
  onPlantChange: (plant: 'tomato' | 'corn') => void;
>>>>>>> 95b30fb1578ab2214345ca531e6edd7792f94137
}

const ImageUploadArea: React.FC<ImageUploadAreaProps> = ({
  isDragging,
  selectedPlant,
  onDragOver,
  onDragLeave,
  onDrop,
  onBrowseFiles,
  onStartCamera,
<<<<<<< HEAD
  fileInputRef,
  handleFileInputChange,
  selectedImage
=======
  onPlantChange
>>>>>>> 95b30fb1578ab2214345ca531e6edd7792f94137
}) => {
  const [aspectRatio, setAspectRatio] = useState<string>('aspect-[4/3]');

  useEffect(() => {
    if (selectedImage) {
      const img = new Image();
      img.onload = () => {
        const ratio = img.width / img.height;
        let aspectClass = 'aspect-[4/3]'; // default
        
        if (ratio > 1.5) {
          aspectClass = 'aspect-[16/9]'; // wide
        } else if (ratio > 1.2) {
          aspectClass = 'aspect-[4/3]'; // standard
        } else if (ratio > 0.8) {
          aspectClass = 'aspect-square'; // square-ish
        } else {
          aspectClass = 'aspect-[3/4]'; // portrait
        }
        
        setAspectRatio(aspectClass);
      };
      img.onerror = () => {
        setAspectRatio('aspect-[4/3]'); // fallback
      };
      img.src = selectedImage;
    } else {
      setAspectRatio('aspect-[4/3]'); // default when no image
    }
  }, [selectedImage]);

  return (
<<<<<<< HEAD
    <div className="w-full max-w-md mx-auto">
      <div
        className={`${aspectRatio} flex items-center justify-center relative border-2 border-dashed rounded-xl sm:rounded-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm ${
          isDragging
            ? 'border-blue-400 bg-blue-50/30 scale-105'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50/50'
=======
    <div className="space-y-8">
      
      <PlantTypeSelector
        selectedPlant={selectedPlant}
        onPlantChange={onPlantChange}
      />

      <div
        className={`relative border-2 border-dashed rounded-xl lg:rounded-2xl transition-all duration-300 ${
          isDragging
            ? 'border-leaf-green bg-pale scale-[1.02]'
            : 'border-sage/50 hover:border-leaf-green hover:bg-pale/50'
>>>>>>> 95b30fb1578ab2214345ca531e6edd7792f94137
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
<<<<<<< HEAD
        style={{
          backgroundImage: `
            linear-gradient(45deg, #f8f9fa 25%, transparent 25%), 
            linear-gradient(-45deg, #f8f9fa 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #f8f9fa 75%), 
            linear-gradient(-45deg, transparent 75%, #f8f9fa 75%)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }}
      >
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div className="relative flex flex-col items-center justify-center w-full h-full space-y-4 sm:space-y-8 bg-white/80 rounded-xl sm:rounded-2xl m-2 p-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center animate-float border border-blue-200">
                <ImageIcon className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl sm:rounded-2xl opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
              Drop your image here
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-8 px-2">
              or choose an option below • Supports JPG, PNG, WebP up to 10MB
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4 justify-center w-full">
            <button
              onClick={onBrowseFiles}
              className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl touch-manipulation"
            >
              <Upload className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
              Browse Files
            </button>
            <button
              onClick={onStartCamera}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-lg sm:rounded-xl border border-gray-300 hover:bg-white hover:border-gray-400 transition-all duration-300 touch-manipulation"
            >
              <Video className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
              Use Camera
            </button>
          </div>
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
            style={{ display: 'none' }}
          />
=======
      >
        <div className="absolute inset-0 rounded-xl lg:rounded-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-leaf-green to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <div className="relative p-8 sm:p-12 text-center space-y-8">
          
          <div className="flex justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-pale to-mint/20 rounded-2xl flex items-center justify-center">
              <ImageIcon className="h-10 w-10 sm:h-12 sm:w-12 text-forest" />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-bold text-primary-dark">
              {isDragging ? 'Drop your image here' : `Upload ${selectedPlant.charAt(0).toUpperCase() + selectedPlant.slice(1)} Image`}
            </h3>
            <p className="text-sm text-neutral-gray">
              Supports JPG, PNG, WebP • Max 10MB
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-sm mx-auto">
            
            <button
              onClick={onBrowseFiles}
              className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-forest to-leaf-green text-white font-semibold rounded-xl hover:from-forest-green hover:to-forest hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-mint/30 focus:outline-none"
            >
              <Upload className="mr-2 h-5 w-5" />
              Browse Files
            </button>

            <button
              onClick={onStartCamera}
              className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-soft-beige border-2 border-sage/30 text-forest font-semibold rounded-xl hover:bg-pale hover:border-leaf-green hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg focus:ring-4 focus:ring-mint/20 focus:outline-none"
            >
              <Video className="mr-2 h-5 w-5" />
              Camera
            </button>
          </div>
>>>>>>> 95b30fb1578ab2214345ca531e6edd7792f94137
        </div>
      </div>
    </div>
  );
};

export default ImageUploadArea;