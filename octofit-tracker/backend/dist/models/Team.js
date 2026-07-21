import { Schema, model } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    description: { type: String, required: true },
    memberUsernames: { type: [String], required: true },
    totalPoints: { type: Number, required: true },
}, { versionKey: false });
export const Team = model('Team', teamSchema);
