import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import UserEntity from '../entities/user.entity';

export const User = createParamDecorator(
  (property: keyof UserEntity, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();

    return property ? user[property] : user;
  },
);
