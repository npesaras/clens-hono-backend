import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  DATABASE_URL: z.string(),
  ACCESS_TOKEN: z.string(),
  SALT_ROUNDS: z.string().transform(Number).default('10'),
  RATE_LIMIT_WINDOW: z.string().transform(Number).default('900000'),
  RATE_LIMIT_MAX: z.string().transform(Number).default('100'),
  HEALTH_CHECK_PATH: z.string().default('/health')
});

export const env = envSchema.parse(process.env); 