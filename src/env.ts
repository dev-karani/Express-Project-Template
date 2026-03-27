// src/env.ts
import { z } from 'zod';
import 'dotenv/config'; // loads .env automatically in dev

// Determine the stage early
const APP_STAGE = process.env.APP_STAGE || 'development'; // dev/test/production

// Optionally: load different .env files depending on stage
if (APP_STAGE === 'development') {
  // dotenv already loaded .env
} else if (APP_STAGE === 'test') {
  // Load .env.test manually
  import('dotenv').then(dotenv => dotenv.config({ path: '.env.test' }));
} else if (APP_STAGE === 'production') {
  // production usually relies on actual env vars, no file needed
  console.log('Running in production, ensure env vars are set in server');
}

// Zod schema for validation
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  APP_STAGE: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().positive().default(3000),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
});

// parse & validate
const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  APP_STAGE,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
});

export { env };
export default env;