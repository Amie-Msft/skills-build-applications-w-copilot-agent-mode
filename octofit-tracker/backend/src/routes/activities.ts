import { Router } from 'express';
import { Activity } from '../models/Activity.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const activities = await Activity.find().sort({ activityDate: -1 }).lean();

    res.json({ activities });
  } catch (error) {
    next(error);
  }
});

export default router;