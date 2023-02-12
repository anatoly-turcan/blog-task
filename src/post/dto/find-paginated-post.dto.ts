import { IsBoolean, IsOptional } from 'class-validator';

import { PaginationDto } from '../../pagination/dto/pagination.dto';
import { ToBoolean } from '../../utils/decorators/to-boolean.decorator';

export class FindPaginatedPostDto extends PaginationDto {
  @IsBoolean()
  @IsOptional()
  @ToBoolean()
  isHidden: boolean;

  @IsBoolean()
  @IsOptional()
  @ToBoolean()
  isMine: boolean;
}
