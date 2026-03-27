// src/app.ts
import express from 'express';
import cors from 'cors';
import type { Express, Request, Response } from 'express';
import env from './env.js'; // import the validated env

const app: Express = express();

app.use(cors());

// Health check route
app.get('/health', (req: Request, res: Response): void => {
  console.log('Health check running');
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'fpl api',
    env: env.NODE_ENV,
    port: env.PORT,
  });
});

// Catch-all 404
app.use((req: Request, res: Response): void => {
  res.status(404).json({ message: 'endpoint not found' });
});

export { app };
export default app;