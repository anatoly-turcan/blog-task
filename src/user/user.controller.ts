import { Controller, Get } from '@nestjs/common';
import { User } from './decorators/user.decorator';
import UserEntity from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getMe(@User() user: UserEntity) {
    return user;
  }
}
