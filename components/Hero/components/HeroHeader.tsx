import React from 'react';

const HeroHeader: React.FC = () => {
  return (
    <>
      <div className="mb-6">
        <div className="inline-flex items-center rounded-full border border-green-200/50 bg-white/90 px-4 py-2 shadow-md backdrop-blur-sm">
          <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="text-xs font-semibold text-green-800">
            AI-Powered Plant Disease Detection
          </span>
        </div>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          <span className="text-green-600">Diagnose</span> Plant Disease <span className="text-green-600">Instantly</span>
        </h1>
        <p className="text-sm text-gray-600 max-w-sm">
          Upload a photo and get instant AI diagnosis with treatment recommendations
        </p>
      </div>
    </>
  );
};

export default HeroHeader;