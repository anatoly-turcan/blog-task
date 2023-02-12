import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { Permissions } from '../role/constants';
import { Permission } from '../role/decorators/permission.decorator';
import { User } from '../user/decorators/user.decorator';
import UserEntity from '../user/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { FindPaginatedPostDto } from './dto/find-paginated-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import PostEntity from './entities/post.entity';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @Permission(Permissions.CREATE_POST)
  async create(@Body() data: CreatePostDto, @User() user: UserEntity) {
    return this.postService.create(user, data);
  }

  @Get(':id')
  @Permission(Permissions.READ_USER_POST, Permissions.READ_PUBLIC_POST)
  async findOne(
    @Param('id', ParseIntPipe) id: PostEntity['id'],
    @User() user: UserEntity,
  ) {
    return this.postService.findOne(id, user);
  }

  @Get()
  @Permission(Permissions.READ_USER_POST, Permissions.READ_PUBLIC_POST)
  async findPaginated(
    @Query() query: FindPaginatedPostDto,
    @User() user: UserEntity,
  ) {
    return this.postService.findPaginated(user, query);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permission(Permissions.UPDATE_USER_POST)
  async update(
    @Param('id', ParseIntPipe) id: PostEntity['id'],
    @User() user: UserEntity,
    @Body() data: UpdatePostDto,
  ) {
    await this.postService.update(id, user, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permission(Permissions.DELETE_USER_POST, Permissions.DELETE_ANY_PUBLIC_POST)
  async remove(
    @Param('id', ParseIntPipe) id: PostEntity['id'],
    @User() user: UserEntity,
  ) {
    await this.postService.remove(id, user);
  }
}
