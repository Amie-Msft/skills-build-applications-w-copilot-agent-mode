import { Router } from 'express';
import { User } from '../models/User.js';
const router = Router();
router.get('/', async (_req, res, next) => {
    try {
        const users = await User.find().sort({ lastName: 1, firstName: 1 }).lean();
        res.json({ users });
    }
    catch (error) {
        next(error);
    }
});
export default router;
