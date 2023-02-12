import { IsInt, Max, Min } from 'class-validator';

import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_OFFSET,
  PAGINATION_LIMIT,
} from '../constants';

export class PaginationDto {
  @IsInt()
  @Min(0)
  offset: number = DEFAULT_PAGINATION_OFFSET;

  @IsInt()
  @Min(1)
  @Max(PAGINATION_LIMIT)
  limit: number = DEFAULT_PAGINATION_LIMIT;
}
