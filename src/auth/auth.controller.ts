import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { User } from '../user/decorators/user.decorator';
import { CreateUserDto } from '../user/dto/create-user.dto';
import UserEntity from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@User() user: UserEntity) {
    return this.authService.login(user);
  }

  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    await this.authService.register(body);
  }
}
