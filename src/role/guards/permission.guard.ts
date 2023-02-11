import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import User from 'src/user/entities/user.entity';

import { PERMISSION_METADATA_KEY, Permissions } from '../constants';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permissions[]>(
      PERMISSION_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const user = context.switchToHttp().getRequest().user as User;

    return user.hasAtLeastOnePermission(requiredPermissions);
  }
}
