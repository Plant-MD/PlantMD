export default interface DiseaseResponse {
  success: boolean;
  disease: {
    _id: string;
    disease_code: string;
    disease_name: string;
    scientific_name: string;
    common_plants: string[];
    category: string;
    risk_factor: string;
  };
  cure: {
    _id: string;
    disease_id: string;
    disease: string;
    cure: string[];
    createdAt: string;
    updatedAt: string;
  };
  confidence: number;
}