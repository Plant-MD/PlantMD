"use client";
import React from "react";
import DiseaseResponse from "@/types/diagnosis_card";
import { Badge } from "../ui/badge";
import { HeartPulse, Info } from "lucide-react";

function MainDiagnosis(props: DiseaseResponse) {
  const { disease, cure, confidence } = props;

  const getConfidenceLabel = (confidence: number) => {
    if (confidence <= 25) return "Not sure";
    if (confidence <= 50) return "Pretty sure";
    if (confidence <= 75) return "Likely";
    return "Fully confident";
  };

  const confidenceLabel = getConfidenceLabel(confidence);
  const confidencePercent = confidence.toFixed(2);
  const formattedPlants = disease.common_plants.join(", ");

  return (
    <div className="mt-10 px-4 sm:px-6 md:px-8 w-full max-w-6xl mx-auto ">
      {/* Header */}
      <div className="text-4xl mt-20 sm:text-4xl md:text-5xl lg:text-6xl font-oswald font-bold text-gray-600 mb-4 sm:mb-6">
        {disease.disease_name.replace(/_/g, " ")}
      </div>

      {/* Body Description */}
      <div className="bg-white px-4 py-4 sm:px-6 sm:py-5 space-y-4 text-sm sm:text-base leading-relaxed text-gray-700 rounded-xl shadow-sm">
        <p>
          This condition is categorized under{" "}
          <span className="font-semibold">{disease.category}</span>. It is
          commonly seen in the following plants:{" "}
          <span className="font-medium">
            {formattedPlants || "unspecified species"}
          </span>
          . According to the analysis, this disease has a risk factor labeled as{" "}
          <Badge
            variant="secondary"
            className="inline-block text-xs font-semibold ml-1"
          >
            {disease.risk_factor}
          </Badge>
          . The system is{" "}
          <span className="font-semibold">
            {confidenceLabel.toLowerCase()}
          </span>{" "}
          about this result with a confidence of{" "}
          <span className="font-semibold">{confidencePercent}%</span>. It is
          registered in our system with the internal disease code{" "}
          <Badge
            variant="secondary"
            className="inline-block text-xs font-mono bg-gray-100 text-gray-800 ml-1"
          >
            {disease.disease_code}
          </Badge>
          .
        </p>
      </div>

      {/* Summary Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm text-right text-gray-700 border border-gray-200 rounded-md overflow-hidden">
          <tbody>
            <tr className="border-b">
              <th className="px-4 py-2 text-left font-medium bg-gray-50 w-1/2 min-w-[150px]">
                Disease Name
              </th>
              <td className="px-4 py-2 break-words">
                {disease.disease_name.replace(/_/g, " ")}
              </td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-2 text-left font-medium bg-gray-50">
                Category
              </th>
              <td className="px-4 py-2">{disease.category}</td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-2 text-left font-medium bg-gray-50">
                Common Plants
              </th>
              <td className="px-4 py-2">
                {formattedPlants || "Unspecified species"}
              </td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-2 text-left font-medium bg-gray-50">
                Risk Factor
              </th>
              <td className="px-4 py-2">{disease.risk_factor}</td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-2 text-left font-medium bg-gray-50">
                Confidence
              </th>
              <td className="px-4 py-2">
                {confidenceLabel} ({confidencePercent}%)
              </td>
            </tr>
            <tr>
              <th className="px-4 py-2 text-left font-medium bg-gray-50">
                Disease Code
              </th>
              <td className="px-4 py-2">{disease.disease_code}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Cures */}
      <div className="bg-green-50 px-4 py-5 sm:px-6 rounded-b-3xl mt-6 sm:mt-8">
        <h3 className="text-xl sm:text-2xl flex items-center gap-2 text-forest-green mb-2">
          <HeartPulse className="w-5 h-5" />
          Suggested Treatments
        </h3>

        {cure.cure.length > 0 ? (
          <ul className="list-disc pl-5 text-gray-700 text-sm sm:text-base space-y-1">
            {cure.cure.slice(0, 3).map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic flex items-center gap-1">
            <Info className="w-4 h-4" /> No cure information available at the
            moment.
          </p>
        )}
      </div>
    </div>
  );
}

export default MainDiagnosis;
