import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from '../user/dto/create-user.dto';
import User from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    if (await user?.comparePassword(password)) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };

    return {
      jwt: this.jwtService.sign(payload),
      user,
    };
  }

  async register(data: CreateUserDto) {
    return this.userService.create(data);
  }
}
