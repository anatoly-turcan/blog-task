import { DEFAULT_DB_HOST, DEFAULT_DB_PORT } from './constants';

export default function db() {
  return {
    host: process.env.DB_HOST || DEFAULT_DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : DEFAULT_DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
}
