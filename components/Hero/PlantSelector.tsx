import React, { useState, useRef, useEffect } from 'react';

interface PlantTypeSelectorProps {
  selectedPlant: "tomato" | "corn" | "rice" | "potato" | null;
  onSelectPlant: (plant: "tomato" | "corn" | "rice" | "potato") => void;
  className?: string;
}

const PlantTypeSelector: React.FC<PlantTypeSelectorProps> = ({
  selectedPlant,
  onSelectPlant,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const plantTypes = [
    { value: "tomato" as const, label: "Tomato", icon: "🍅" },
    { value: "corn" as const, label: "Corn", icon: "🌽" },
    { value: "rice" as const, label: "Rice", icon: "🌾" },
    { value: "potato" as const, label: "Potato", icon: "🥔" }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (plantType: "tomato" | "corn" | "rice" | "potato") => {
    onSelectPlant(plantType);
    setIsOpen(false);
  };

  const selectedPlantData = plantTypes.find(p => p.value === selectedPlant);

  return (
    <div id="plant-selector" className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left shadow-sm hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {selectedPlantData ? (
              <>
                <span className="text-lg">{selectedPlantData.icon}</span>
                <span className="font-medium text-gray-900">{selectedPlantData.label}</span>
              </>
            ) : (
              <span className="text-gray-500">Select plant type</span>
            )}
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 overflow-hidden">
          {plantTypes.map((plant) => (
            <button
              key={plant.value}
              onClick={() => handleSelect(plant.value)}
              className={`w-full px-4 py-3 text-left hover:bg-green-50 transition-colors flex items-center space-x-3 ${
                selectedPlant === plant.value ? 'bg-green-50 text-green-700' : 'text-gray-900'
              }`}
            >
              <span className="text-lg">{plant.icon}</span>
              <span className="font-medium">{plant.label}</span>
              {selectedPlant === plant.value && (
                <svg className="w-4 h-4 text-green-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlantTypeSelector;