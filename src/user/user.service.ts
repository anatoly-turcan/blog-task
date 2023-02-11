import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import User from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  async findOneByEmail(email: User['email']) {
    return this.repository.findOneBy({ email });
  }

  async findOneById(id: User['id']) {
    return this.repository.findOneBy({ id });
  }

  async create(data: CreateUserDto) {
    return this.repository.save(this.repository.create(data));
  }
}
