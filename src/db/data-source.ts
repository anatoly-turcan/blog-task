import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { Config, configuration } from '../config/configuration';

config();
const configService = new ConfigService<Config>(configuration());

// NOTE: DataSource for CLI (migrations)
export default new DataSource({
  ...configService.get<Config['db']>('db'),
  migrations: ['migrations/*.{ts,js}'],
  extra: { max: 1 },
  logging: 'all',
});
