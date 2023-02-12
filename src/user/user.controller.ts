import { Controller, Get } from '@nestjs/common';

import { User } from './decorators/user.decorator';
import UserEntity from './entities/user.entity';

@Controller('user')
export class UserController {
  @Get()
  getMe(@User() user: UserEntity) {
    return user;
  }
}
