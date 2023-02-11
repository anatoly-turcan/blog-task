import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { DEFAULT_DB_HOST, DEFAULT_DB_PORT } from './constants';

export default function db() {
  const db: TypeOrmModuleOptions & DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || DEFAULT_DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : DEFAULT_DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
    extra: { max: 100 }, // number of connections
  };

  return db;
}
