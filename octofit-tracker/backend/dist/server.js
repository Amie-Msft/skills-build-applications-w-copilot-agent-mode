import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import db from './config/database.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import teamsRouter from './routes/teams.js';
import usersRouter from './routes/users.js';
import workoutsRouter from './routes/workouts.js';
const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        apiBaseUrl,
        database: db.readyState === 1 ? 'connected' : 'connecting',
    });
});
app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
});
app.listen(port, () => {
    console.log(`Octofit backend listening at ${apiBaseUrl}`);
});
