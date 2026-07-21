import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, required: true },
    teamName: { type: String, required: true },
    joinedAt: { type: Date, required: true },
  },
  { versionKey: false },
);

export const User = model('User', userSchema);