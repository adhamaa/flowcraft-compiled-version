import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const poolConnection = mysql.createPool({
  host: process.env.DRIZZLE_DATABASE_HOST,
  user: process.env.DRIZZLE_DATABASE_USER,
  password: process.env.DRIZZLE_DATABASE_PASSWORD,
  database: process.env.DRIZZLE_DATABASE_NAME,
});

export const db = drizzle(poolConnection, { logger: true });

export * from 'drizzle-orm'

