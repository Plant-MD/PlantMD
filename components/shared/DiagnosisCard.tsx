"use client";
import React from 'react';
import DiseaseResponse from '@/types/diagnosis_card';
import { Badge } from '../ui/badge';
import { HeartPulse } from 'lucide-react';

function DiagnosisCard(props: DiseaseResponse) {
  const { disease, cure, confidence } = props;

  // Confidence label generator
  const getConfidenceLabel = (confidence: number) => {
    if (confidence <= 25) return "Not sure";
    if (confidence <= 50) return "Pretty sure";
    if (confidence <= 75) return "Likely";
    return "Fully confident";
  };

  // Early return if required data is missing
  if (!disease || !disease.disease_name) {
    return (
      <div className="mt-8 w-full shadow-lg border rounded-3xl overflow-hidden">
        <div className="p-6 bg-white text-gray-700 text-sm">
          <p>No disease information available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 w-full shadow-lg border rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="text-xl font-bold text-white bg-deep-mint py-4 px-6 flex justify-start items-center gap-2">
        {disease.disease_name.replace(/_/g, " ")}
        <span className="font-roboto">
          <Badge
            variant="secondary"
            className="text-xs font-light font-mono bg-white text-black hover:bg-white ml-2"
          >
            {getConfidenceLabel(confidence)}
          </Badge>
          <span className='inline ml-2 font-roboto'>{confidence.toFixed(1)}%</span>
        </span>
      </div>

      {/* Content */}
      <div className="p-6 bg-white text-gray-700 text-sm space-y-4 font-roboto">
        <p>
          {disease.disease_name.replace(/_/g, " ")} is a plant disease that primarily affects {disease.common_plants?.join(', ') || 'various plants'}. 
          It falls under the category of {disease.category || 'unknown'} and is identified by the disease code {disease.disease_code || 'N/A'}. 
          The associated risk factor is {disease.risk_factor || 'unknown'}.
        </p>

        <div>
          <h2 className="text-lg font-semibold text-gray-500 flex items-center gap-2">
            <HeartPulse className="w-5 h-5" />
            Suggested Cures
          </h2>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            {cure?.cure && Array.isArray(cure.cure) ? (
              cure.cure.slice(0, 3).map((c, idx) => (
                <li key={idx}>{c}</li>
              ))
            ) : (
              <li>No cure information available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DiagnosisCard;
