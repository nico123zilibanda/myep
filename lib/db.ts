import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // muhimu kwa Supabase
  },
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
