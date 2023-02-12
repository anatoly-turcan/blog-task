import { PaginationDto } from './dto/pagination.dto';

export class PaginationResult<T> {
  page: number;
  pageSize: number;
  totalPages: number;

  constructor(
    public readonly items: T[],
    public total: number,
    params: PaginationDto,
  ) {
    this.page = Math.floor(params.offset / params.limit) + 1;
    this.pageSize = params.limit;
    this.totalPages = Math.ceil(this.total / params.limit);
  }
}
