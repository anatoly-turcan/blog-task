import app from './app';
import auth from './auth';
import db from './db';
import swagger from './swagger';

export type Config = ReturnType<typeof configuration>;

export function configuration() {
  return {
    app: app(),
    db: db(),
    auth: auth(),
    swagger: swagger(),
  };
}
