import dotenv from "dotenv";
import { join } from "path";

dotenv.config({ path: join((process.cwd(), ".env")) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};