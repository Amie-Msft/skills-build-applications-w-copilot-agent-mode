import { Router } from 'express';
import { Team } from '../models/Team.js';
const router = Router();
router.get('/', async (_req, res, next) => {
    try {
        const teams = await Team.find().sort({ totalPoints: -1 }).lean();
        res.json({ teams });
    }
    catch (error) {
        next(error);
    }
});
export default router;
