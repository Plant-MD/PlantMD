"use client";
import React, { useEffect, useState } from "react";
import DiagnosisCard from "@/components/shared/DiagnosisCard";
import axios from "axios";
import { Leaf, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MainDiagnosis from "@/components/shared/Diagnosis";


function Diagnosis() {
  const [plants, setPlants] = useState<any[]>([]);
  const [plantType, setPlantType] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlants = async () => {
      const params = new URLSearchParams(window.location.search);
      const predictionsParam = params.get("predictions");
      const plantParam = params.get("plant");

      if (!predictionsParam) return;

      setPlantType(plantParam || 'plant');

      try {
        const predictions = JSON.parse(decodeURIComponent(predictionsParam));
        console.log('Parsed predictions:', predictions);

        // Fetch all plant data in parallel with error handling
        const responses = await Promise.allSettled(
          predictions.map((prediction: any) => {
            const diseaseName = prediction.class;
            const confidence = prediction.confidence;

            return axios.get(
              `/api/predict?disease_name=${encodeURIComponent(diseaseName)}&confidence=${encodeURIComponent(confidence)}`
            );
          })
        );

        // Process successful responses and create fallback data for failed ones
        const processedPlants = responses.map((response, index) => {
          if (response.status === 'fulfilled') {
            return response.value.data;
          } else {
            console.error(`Failed to fetch data for prediction ${index}:`, response.reason);
            // Create fallback data structure
            const prediction = predictions[index];
            return {
              success: true,
              disease: {
                _id: `fallback-${index}`,
                disease_code: 'N/A',
                disease_name: prediction.class.replace(/_/g, ' '),
                scientific_name: 'Unknown',
                common_plants: ['Unknown'],
                category: 'Unknown',
                risk_factor: 'Unknown'
              },
              cure: {
                _id: `fallback-cure-${index}`,
                disease_id: `fallback-${index}`,
                disease: prediction.class.replace(/_/g, ' '),
                cure: ['Treatment information not available'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              },
              confidence: Number(prediction.confidence) * 100
            };
          }
        });

        setPlants(processedPlants);
      } catch (error) {
        console.error("Error fetching plants:", error);
        setPlants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
          </div>
        ) : plants.length > 0 ? (
          <div className="space-y-6">
            <MainDiagnosis {...plants[0]} />
            <div className="text-left mb-8">
              <h2 className="text-4xl font-oswald font-bold text-gray-600 mb-2 ml-2">
                More Results
              </h2>

            </div>

            {plants.slice(1, 3).map((plant, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <DiagnosisCard {...plant} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Results</h3>
            <p className="text-gray-600">No disease predictions were found for your plant.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Diagnosis;
