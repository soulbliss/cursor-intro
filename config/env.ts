import { z } from 'zod';

const envSchema = z.object({
  AUTH_SECRET: z.string().min(1, 'AUTH_SECRET is required'),


  PG_DB_MAX_CONNECTIONS: z.preprocess(
    (val) => Number(val),
    z.number().int().positive(),
  ),
  PG_DB_CONNECTION_TIMEOUT: z.preprocess(
    (val) => Number(val),
    z.number().int().nonnegative(),
  ),
  PG_DB_IDLE_TIMEOUT: z.preprocess(
    (val) => Number(val),
    z.number().int().nonnegative(),
  ),
  PG_DB_CONNECTION_STRING: z
    .string()
    .min(1, 'PG_DB_CONNECTION_STRING is required'),

  GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID is required'),
  GOOGLE_CLIENT_SECRET: z.string().min(1, 'GOOGLE_CLIENT_SECRET is required'),



});

// Parse and validate the environment variables
const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('❌ Invalid environment variables:', env.error.format());
  throw new Error('Invalid environment variables');
}

export const {
  AUTH_SECRET,
  PG_DB_MAX_CONNECTIONS,
  PG_DB_IDLE_TIMEOUT,
  PG_DB_CONNECTION_TIMEOUT,
  PG_DB_CONNECTION_STRING,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = env.data;
