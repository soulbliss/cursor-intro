import { pgDbConfig } from '@/config/pg';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
const pool = new Pool({
  connectionString: pgDbConfig.connectionString!,
  max: 20,
  idleTimeoutMillis: pgDbConfig.idleTimeoutMillis,
  connectionTimeoutMillis: pgDbConfig.connectionTimeoutMillis,
  ssl: true
});
export const db = drizzle({
  client: pool, casing: 'snake_case', schema: {
    ...schema
  }
});
