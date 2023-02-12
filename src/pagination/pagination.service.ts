import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';

import { PaginationDto } from './dto/pagination.dto';
import { PaginationResult } from './PaginationResult';

@Injectable()
export class PaginationService {
  async paginate<T>(queryBuilder: SelectQueryBuilder<T>, data: PaginationDto) {
    const [items, total] = await queryBuilder
      .take(data.limit)
      .skip(data.offset)
      .getManyAndCount();

    return new PaginationResult<T>(items, total, data);
  }
}
