// models/Comment.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface CommentDocument extends Document {
  threadId: string;  // Reference to Thread._id (string)
  author: string;
  text: string;
  createdAt: Date;
}

const CommentSchema: Schema<CommentDocument> = new Schema({
  threadId: { type: String, required: true, index: true },
  author: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
});

const CommentModel: Model<CommentDocument> =
  mongoose.models.Comment || mongoose.model<CommentDocument>("Comment", CommentSchema);

export default CommentModel;
