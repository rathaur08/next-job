import { drizzle } from "drizzle-orm/mysql2";

const pool = mysql2.createPool({
  uri: process.env.DATABASE_URL,
});

export const db = drizzle(pool);
