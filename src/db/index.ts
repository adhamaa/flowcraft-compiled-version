import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
// import * as schema from './schema';

const poolConnection = mysql.createPool({
  host: process.env.DRIZZLE_DATABASE_HOST,
  user: process.env.DRIZZLE_DATABASE_USER,
  password: process.env.DRIZZLE_DATABASE_PASSWORD,
  database: process.env.DRIZZLE_DATABASE_NAME,
});

export const db = drizzle(poolConnection, {
  // mode: 'default',
  // schema,
  logger: true
});

export * from 'drizzle-orm'

