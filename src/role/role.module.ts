import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import Role from './entities/role.entity';
import { PermissionGuard } from './guards/permission.guard';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleService, { provide: APP_GUARD, useClass: PermissionGuard }],
  exports: [RoleService],
})
export class RoleModule {}
