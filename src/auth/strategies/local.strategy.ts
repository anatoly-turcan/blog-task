import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import User from '../../user/entities/user.entity';
import { AuthService } from '../auth.service';
import { USERNAME_FIELD } from '../constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: USERNAME_FIELD });
  }

  async validate(email: string, password: string) {
    let user: User;

    if (email && password) {
      user = await this.authService.validate(email, password);
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
