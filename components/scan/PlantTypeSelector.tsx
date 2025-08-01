'use client';

import React from 'react';
import { Leaf, Wheat } from 'lucide-react';

interface PlantTypeSelectorProps {
  selectedPlant: 'tomato' | 'corn';
  onPlantChange: (plant: 'tomato' | 'corn') => void;
}

const PlantTypeSelector: React.FC<PlantTypeSelectorProps> = ({
  selectedPlant,
  onPlantChange
}) => {
  return (
    <div className="w-full max-w-xs mx-auto mb-8">
      <div className="relative bg-sage/10 rounded-full p-1 shadow-inner border border-sage/20">
        
        <div 
          className={`absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-forest to-leaf-green rounded-full shadow-md transition-all duration-300 ease-out ${
            selectedPlant === 'tomato' ? 'left-1' : 'left-1/2'
          }`}
        />

        <div className="relative grid grid-cols-2">
          
          <button
            type="button"
            onClick={() => onPlantChange('tomato')}
            className={`relative flex items-center justify-center px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 z-10 ${
              selectedPlant === 'tomato'
                ? 'text-white'
                : 'text-sage hover:text-forest'
            }`}
          >
            <Leaf className={`h-4 w-4 mr-2 transition-all duration-300 ${
              selectedPlant === 'tomato' ? 'text-white scale-110' : 'text-leaf-green'
            }`} />
            Tomato
          </button>

          <button
            type="button"
            onClick={() => onPlantChange('corn')}
            className={`relative flex items-center justify-center px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 z-10 ${
              selectedPlant === 'corn'
                ? 'text-white'
                : 'text-sage hover:text-forest'
            }`}
          >
            <Wheat className={`h-4 w-4 mr-2 transition-all duration-300 ${
              selectedPlant === 'corn' ? 'text-white scale-110' : 'text-leaf-green'
            }`} />
            Corn
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantTypeSelector;