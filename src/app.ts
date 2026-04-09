// src/app.ts
import express from 'express';
import cors from 'cors';
import type { Express, Request, Response } from 'express';
import env from './env.js'; // import the validated env
import authRoutes from './routes/authRoutes.js'
import habitRoutes from './routes/habitRoutes.js'
import userRoutes from './routes/userRoutes.js'
import helmet from 'helmet'
import morgan from 'morgan'
// import test from 'node:test';

const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.use((req, res,next)=>{
  console.log('Oncoming request:', req.method, req.url);
  next()
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/habits', habitRoutes)

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