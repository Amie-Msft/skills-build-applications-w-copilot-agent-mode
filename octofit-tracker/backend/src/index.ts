import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import db from './config/database.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', database: db.readyState === 1 ? 'connected' : 'connecting' });
});

app.listen(port, () => {
  console.log(`Octofit backend listening on port ${port}`);
});
