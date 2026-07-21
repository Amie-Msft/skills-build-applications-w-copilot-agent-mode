import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    teamName: { type: String, required: true },
    rank: { type: Number, required: true },
    totalPoints: { type: Number, required: true },
    weeklyPoints: { type: Number, required: true },
    workoutsCompleted: { type: Number, required: true },
  },
  { versionKey: false },
);

export const Leaderboard = model('Leaderboard', leaderboardSchema);