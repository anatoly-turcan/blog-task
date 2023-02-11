import app from './app';
import auth from './auth';
import db from './db';

export type Config = ReturnType<typeof configuration>;

export function configuration() {
  return {
    app: app(),
    db: db(),
    auth: auth(),
  };
}
