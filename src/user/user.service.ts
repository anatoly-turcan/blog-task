import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/role/constants';
import { RoleService } from 'src/role/role.service';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import User from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  async findOneByEmail(email: User['email']) {
    return this.repository.findOneBy({ email });
  }

  async findOneById(id: User['id']) {
    return this.repository.findOneBy({ id });
  }

  async create(data: CreateUserDto, role: Roles = Roles.BLOGGER) {
    return this.repository.save(
      this.repository.create({
        ...data,
        role: await this.roleService.find(role),
      }),
    );
  }
}
