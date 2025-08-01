import mongoose, { Schema, Document } from "mongoose";

// Defining the interface for the User model
export interface User extends Document {
  _id: string;
  username: string;
  name: string;
  email: string;
  avatar?: string; // Google profile picture URL
  createdAt?: Date;
  updatedAt?: Date;
}

// Defining the User schema
const UserSchema: Schema<User> = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    avatar: { type: String, required: false }, // Google profile picture URL
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Exporting the model
const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>('User', UserSchema));

export default UserModel;