import mongoose, { Schema, Document } from "mongoose";

export interface Disease extends Document {
    disease_code: string;
    disease_name: string;
    scientific_name: string;
    common_plants: string[];
    category: string;
    risk_factor: string;
    updatedAt: boolean;
    createdAt: boolean;
}

const DiseaseSchema: Schema = new Schema({
    disease_code: { type: String, required: true },
    disease_name: { type: String, required: true },
    scientific_name: { type: String, required: true },
    common_plants: { type: [String], required: true },
    category: { type: String, required: true },
    risk_factor: { type: String, required: true },
},
    {
        timestamps: true,
    }
);

const DiseaseModel = (mongoose.models.Disease as mongoose.Model<Disease>) || (mongoose.model<Disease>('Disease', DiseaseSchema));

export default DiseaseModel;