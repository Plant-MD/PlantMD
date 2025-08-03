import mongoose, { Schema, Document } from "mongoose";


export interface ThreadDB {
    _id: string;
    title: string;
    vote: number;
    content: string;
    media: string[];
    category: string;
    children: string[];
    parent?: string;
    author: string;

    updatedAt: Date;
    createdAt: Date;
}

export interface Thread extends Document {
    _id: string;
    title: string;
    vote: number;
    content: string;
    media: string[];
    category: string;
    children: string[];
    parent?: string;
    author: string;
    
    updatedAt: Date;
    createdAt: Date;
}

const ThreadSchema: Schema = new Schema({
    title: { type: String, required: true, trim: true },
    vote: { type: Number },
    content: { type: String, required: true },
    media: { type: [String], required: true },
    category: { type: String, required: true },
    children: { type: [String], required: false, default: [] },
    parent: { type: String, required: false, default: null },
    author: { type: String, required: true },
},
    {
        timestamps: true,
    }
);


const ThreadModel = (mongoose.models.Thread as mongoose.Model<Thread>) || (mongoose.model<Thread>('Thread', ThreadSchema));

export default ThreadModel;