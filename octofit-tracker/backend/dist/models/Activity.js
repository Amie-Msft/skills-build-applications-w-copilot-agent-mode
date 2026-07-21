import { Schema, model } from 'mongoose';
const activitySchema = new Schema({
    username: { type: String, required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceMiles: { type: Number, required: false },
    caloriesBurned: { type: Number, required: true },
    activityDate: { type: Date, required: true },
}, { versionKey: false });
export const Activity = model('Activity', activitySchema);
