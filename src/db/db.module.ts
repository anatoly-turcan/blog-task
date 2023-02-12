import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Config } from '../config/configuration';
import { TypeOrmEntityNotFoundExceptionFilter } from './filters/typeorm-entity-not-found-exception.filter';
import { TypeOrmQueryExceptionFilter } from './filters/typeorm-query-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<Config>) => ({
        ...config.get<Config['db']>('db'),
        autoLoadEntities: true,
        logging: 'all',
      }),
    }),
  ],
  providers: [
    { provide: APP_FILTER, useClass: TypeOrmQueryExceptionFilter },
    { provide: APP_FILTER, useClass: TypeOrmEntityNotFoundExceptionFilter },
  ],
  exports: [TypeOrmModule],
})
export class DbModule {}
