import { Config } from "drizzle-kit"
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
});
export default {
  schema: "./src/db/schema/*",
  driver: "mysql2",
  dbCredentials: {
    host: process.env.DRIZZLE_DATABASE_HOST!,
    user: process.env.DRIZZLE_DATABASE_USER,
    password: process.env.DRIZZLE_DATABASE_PASSWORD,
    database: process.env.DRIZZLE_DATABASE_NAME!,
  },
  out: "./drizzle",
} satisfies Config