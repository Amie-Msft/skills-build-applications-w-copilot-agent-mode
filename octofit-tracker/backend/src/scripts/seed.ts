import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const users = [
  {
    username: 'maya_runner',
    email: 'maya.runner@example.com',
    firstName: 'Maya',
    lastName: 'Chen',
    role: 'student-athlete',
    teamName: 'Velocity Vipers',
    joinedAt: new Date('2026-01-08T10:00:00Z'),
  },
  {
    username: 'jamal_lifts',
    email: 'jamal.lifts@example.com',
    firstName: 'Jamal',
    lastName: 'Reed',
    role: 'captain',
    teamName: 'Velocity Vipers',
    joinedAt: new Date('2026-01-10T13:30:00Z'),
  },
  {
    username: 'sofia_swims',
    email: 'sofia.swims@example.com',
    firstName: 'Sofia',
    lastName: 'Patel',
    role: 'student-athlete',
    teamName: 'Core Crushers',
    joinedAt: new Date('2026-01-12T09:15:00Z'),
  },
  {
    username: 'liam_cycles',
    email: 'liam.cycles@example.com',
    firstName: 'Liam',
    lastName: 'Garcia',
    role: 'student-athlete',
    teamName: 'Core Crushers',
    joinedAt: new Date('2026-01-14T16:45:00Z'),
  },
];

const teams = [
  {
    name: 'Velocity Vipers',
    mascot: 'Viper',
    description: 'A speed-focused squad competing on cardio consistency and weekly endurance goals.',
    memberUsernames: ['maya_runner', 'jamal_lifts'],
    totalPoints: 2400,
  },
  {
    name: 'Core Crushers',
    mascot: 'Kettlebell',
    description: 'A strength and mobility team focused on balanced training blocks.',
    memberUsernames: ['sofia_swims', 'liam_cycles'],
    totalPoints: 2185,
  },
];

const activities = [
  {
    username: 'maya_runner',
    activityType: 'Outdoor Run',
    durationMinutes: 42,
    distanceMiles: 4.8,
    caloriesBurned: 410,
    activityDate: new Date('2026-07-18T12:00:00Z'),
  },
  {
    username: 'jamal_lifts',
    activityType: 'Strength Training',
    durationMinutes: 55,
    caloriesBurned: 360,
    activityDate: new Date('2026-07-19T15:30:00Z'),
  },
  {
    username: 'sofia_swims',
    activityType: 'Pool Swim',
    durationMinutes: 38,
    distanceMiles: 1.1,
    caloriesBurned: 335,
    activityDate: new Date('2026-07-20T11:15:00Z'),
  },
  {
    username: 'liam_cycles',
    activityType: 'Cycling',
    durationMinutes: 63,
    distanceMiles: 16.4,
    caloriesBurned: 585,
    activityDate: new Date('2026-07-20T17:45:00Z'),
  },
];

const leaderboard = [
  {
    username: 'maya_runner',
    teamName: 'Velocity Vipers',
    rank: 1,
    totalPoints: 1320,
    weeklyPoints: 420,
    workoutsCompleted: 18,
  },
  {
    username: 'jamal_lifts',
    teamName: 'Velocity Vipers',
    rank: 2,
    totalPoints: 1080,
    weeklyPoints: 365,
    workoutsCompleted: 15,
  },
  {
    username: 'liam_cycles',
    teamName: 'Core Crushers',
    rank: 3,
    totalPoints: 1115,
    weeklyPoints: 340,
    workoutsCompleted: 14,
  },
  {
    username: 'sofia_swims',
    teamName: 'Core Crushers',
    rank: 4,
    totalPoints: 1070,
    weeklyPoints: 310,
    workoutsCompleted: 13,
  },
];

const workouts = [
  {
    title: '5K Pace Builder',
    focus: 'Cardio endurance',
    difficulty: 'Intermediate',
    durationMinutes: 45,
    exercises: ['Dynamic warmup', 'Tempo intervals', 'Cooldown jog', 'Hip mobility'],
    suggestedFor: ['maya_runner', 'liam_cycles'],
  },
  {
    title: 'Foundational Strength Circuit',
    focus: 'Full-body strength',
    difficulty: 'Beginner',
    durationMinutes: 35,
    exercises: ['Goblet squats', 'Push-ups', 'Romanian deadlifts', 'Plank holds'],
    suggestedFor: ['jamal_lifts', 'sofia_swims'],
  },
  {
    title: 'Swim Recovery Mobility',
    focus: 'Recovery and flexibility',
    difficulty: 'Beginner',
    durationMinutes: 25,
    exercises: ['Shoulder openers', 'Thoracic rotations', 'Band pull-aparts', 'Breathing drills'],
    suggestedFor: ['sofia_swims', 'maya_runner'],
  },
];

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await Promise.all([
      User.insertMany(users),
      Team.insertMany(teams),
      Activity.insertMany(activities),
      Leaderboard.insertMany(leaderboard),
      Workout.insertMany(workouts),
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
