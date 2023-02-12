import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { RoleService } from '../role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import User from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    })
      .useMocker((token) => {
        if (token === RoleService) {
          return { find: jest.fn() };
        }

        if (token === 'UserRepository') {
          return {
            findOneBy: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
          };
        }
      })
      .compile();

    service = await module.get<UserService>(UserService);
    repository = await module.get<Repository<User>>('UserRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findOneById', () => {
    it('should return user', async () => {
      const user = new User();
      user.id = 1;

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);

      expect((await service.findOneById(user.id)).id === user.id).toBe(true);
    });
  });

  describe('findOneByEmail', () => {
    it('should return user', async () => {
      const user = new User();
      user.email = 'some@email.com';

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);

      expect(
        (await service.findOneByEmail(user.email)).email === user.email,
      ).toBe(true);
    });
  });

  describe('create', () => {
    it('should create user', async () => {
      const user = new User();
      user.roleId = 1;

      const userData = new CreateUserDto();
      userData.email = 'some@email.com';
      userData.password = 'User1234';

      user.email = userData.email;

      jest.spyOn(repository, 'save').mockResolvedValue(user);

      const createdUser = await service.create(userData);

      expect(userData.email === createdUser.email).toBe(true);
      expect(createdUser.roleId).toBeDefined();
    });
  });
});
