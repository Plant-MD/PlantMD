'use client';

import React from 'react';
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
  onPlantChange: (plant: 'tomato' | 'corn') => void;
}

const ImageUploadArea: React.FC<ImageUploadAreaProps> = ({
  isDragging,
  selectedPlant,
  onDragOver,
  onDragLeave,
  onDrop,
  onBrowseFiles,
  onStartCamera,
  onPlantChange
}) => {
  return (
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
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
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
        </div>
      </div>
    </div>
  );
};

export default ImageUploadArea;