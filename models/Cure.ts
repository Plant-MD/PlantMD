import mongoose, { Schema, Document, Types  } from "mongoose";

export interface Cure extends Document {
    disease_id: Types.ObjectId;
    disease: string;
    cure: string[];
    updatedAt: boolean;
    createdAt: boolean;
}

const CureSchema: Schema = new Schema({
    disease_id: { type: Schema.Types.ObjectId, ref: "Disease", required: true },
    disease: { type: String, required: true },
    cure: { type: [String], required: true },
},
    {
        timestamps: true,
    }
);

const CureModel = (mongoose.models.Cure as mongoose.Model<Cure>) || (mongoose.model<Cure>('Cure', CureSchema));

export default CureModel;