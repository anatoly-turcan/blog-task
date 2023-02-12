import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { configuration } from './config/configuration';
import { DbModule } from './db/db.module';
import { PaginationModule } from './pagination/pagination.module';
import { PostModule } from './post/post.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.local.env', '.env'],
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    DbModule,
    UserModule,
    AuthModule,
    RoleModule,
    PostModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
