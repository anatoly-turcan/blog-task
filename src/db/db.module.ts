import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Config } from '../config/configuration';
import { TypeOrmExceptionFilter } from './filters/typeorm-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<Config>) => ({
        ...config.get<Config['db']>('db'),
        autoLoadEntities: true,
        logging: ['error'],
      }),
    }),
  ],
  providers: [{ provide: APP_FILTER, useClass: TypeOrmExceptionFilter }],
  exports: [TypeOrmModule],
})
export class DbModule {}
