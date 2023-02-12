import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isDefined } from 'class-validator';
import { PaginationService } from 'src/pagination/pagination.service';
import { Permissions } from 'src/role/constants';
import User from 'src/user/entities/user.entity';
import { Brackets, Not, Repository } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { FindPaginatedPostDto } from './dto/find-paginated-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import Post from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly repository: Repository<Post>,
    private readonly paginationService: PaginationService,
  ) {}

  async create(user: User, data: CreatePostDto) {
    return this.repository.save(
      this.repository.create({ ...data, userId: user.id }),
    );
  }

  async findOne(id: Post['id'], user: User) {
    return this.buildFindQuery(user, id).getOneOrFail();
  }

  async findPaginated(user: User, data: FindPaginatedPostDto) {
    const query = this.buildFindQuery(user);

    if (isDefined(data.isHidden)) {
      query.andWhere({ isHidden: data.isHidden });
    }

    if (isDefined(data.isMine)) {
      query.andWhere({ userId: data.isMine ? user.id : Not(user.id) });
    }

    return this.paginationService.paginate<Post>(query, data);
  }

  async update(id: Post['id'], user: User, data: UpdatePostDto) {
    const { affected } = await this.buildUpdateQuery(user, id)
      .set(data)
      .execute();

    if (!affected) {
      throw new NotFoundException();
    }
  }

  async remove(id: Post['id'], user: User) {
    const { affected } = await this.buildDeleteQuery(user, id).execute();

    if (!affected) {
      throw new NotFoundException();
    }
  }

  private buildFindQuery(user: User, id?: Post['id']) {
    const query = this.repository.createQueryBuilder().select();

    if (id) {
      query.where({ id });
    }

    query.andWhere(
      new Brackets((qb) => {
        if (user.hasPermission(Permissions.READ_USER_POST)) {
          qb.orWhere({ userId: user.id });
        }

        if (user.hasPermission(Permissions.READ_PUBLIC_POST)) {
          qb.orWhere({ isHidden: false });
        }
      }),
    );

    return query;
  }

  private buildUpdateQuery(user: User, id?: Post['id']) {
    const query = this.repository
      .createQueryBuilder()
      .update()
      .where({ userId: user.id });

    if (id) {
      query.andWhere({ id });
    }

    return query;
  }

  private buildDeleteQuery(user: User, id?: Post['id']) {
    const query = this.repository
      .createQueryBuilder()
      .delete()
      .where(
        new Brackets((qb) => {
          if (user.hasPermission(Permissions.DELETE_USER_POST)) {
            qb.orWhere({ userId: user.id });
          }

          if (user.hasPermission(Permissions.DELETE_ANY_PUBLIC_POST)) {
            qb.orWhere({ isHidden: false });
          }
        }),
      );

    if (id) {
      query.andWhere({ id });
    }

    return query;
  }
}
