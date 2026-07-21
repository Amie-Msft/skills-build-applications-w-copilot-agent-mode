import { Router } from 'express';
import { Leaderboard } from '../models/Leaderboard.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 }).lean();

    res.json({ leaderboard });
  } catch (error) {
    next(error);
  }
});

export default router;