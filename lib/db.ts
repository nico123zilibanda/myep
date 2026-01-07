import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL haipo kwenye .env");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // muhimu kwa Supabase
  },
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
