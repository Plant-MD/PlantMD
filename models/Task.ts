import mongoose, { Schema, Document } from "mongoose";

export interface Task extends Document {
    userID: string; // Required - each task belongs to a specific user
    title: string;
    description: string;
    date: string;
    type: 'watering' | 'fertilizing' | 'pruning' | 'repotting' | 'harvesting' | 'other';
    completed: boolean;
    plantName?: string;
    createdAt: boolean;
    updatedAt: boolean;
}

const TaskSchema: Schema = new Schema({
    userID: { type: String, required: true }, // Required - each task belongs to a specific user
    title: { type: String, required: true, trim: true },
    description: { type: String, required: false, trim: true },
    date: { type: String, required: true }, // ISO date string format: YYYY-MM-DD
    type: {
        type: String,
        required: true,
        enum: ['watering', 'fertilizing', 'pruning', 'repotting', 'harvesting', 'other'],
    },
    completed: { type: Boolean, default: false },
    plantName: { type: String, required: false, trim: true },
},
    {
        timestamps: true,
    }
);

// Index for efficient querying by date and user
TaskSchema.index({ userID: 1, date: 1 });
TaskSchema.index({ userID: 1, completed: 1 });

const TaskModel = (mongoose.models.Task as mongoose.Model<Task>) || (mongoose.model<Task>('Task', TaskSchema));

export default TaskModel; 