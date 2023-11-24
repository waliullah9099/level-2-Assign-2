import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  PORT: process.env.PORT,
  database_url: process.env.DB_URL,
  bycript_solt_rounds: process.env.BCRIPT_SOLT_ROUNDS,
};
