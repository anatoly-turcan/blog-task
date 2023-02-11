import { DEFAULT_APP_PORT, Environment } from './constants';

export default function app() {
  return {
    port: process.env.PORT ? Number(process.env.PORT) : DEFAULT_APP_PORT,
    env: process.env.NODE_ENV as Environment,
  };
}
