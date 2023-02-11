import { JwtModuleOptions } from '@nestjs/jwt';

import { DEFAULT_JWT_EXPIRES_IN } from './constants';

export default function auth() {
  const jwt: JwtModuleOptions = {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES_IN || DEFAULT_JWT_EXPIRES_IN,
    },
  };

  return { jwt };
}
