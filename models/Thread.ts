// models/Thread.ts
import mongoose, { Schema, Document } from "mongoose";

interface MediaItem {
  data: Buffer;          // Binary image data
  contentType: string;   // MIME type, e.g. "image/png"
}

export interface ThreadDB {
  title: string;
  vote: number;
  content: string;
  media: MediaItem[];    // Array of images stored as buffers + MIME types
  category: string;
  author: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface Thread extends Document, ThreadDB {}

const MediaSchema = new Schema<MediaItem>(
  {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true }
  },
  { _id: false }
);

const ThreadSchema: Schema<Thread> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    vote: { type: Number, default: 0 },
    content: { type: String, required: true },
    media: { type: [MediaSchema], default: [] },
    category: { type: String, required: true },
    author: { type: String, required: true }
  },
  { timestamps: true }
);

const ThreadModel =
  mongoose.models.Thread || mongoose.model<Thread>("Thread", ThreadSchema);

export default ThreadModel;
