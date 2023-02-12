import { IsBoolean, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';
import { ToBoolean } from 'src/utils/decorators/to-boolean.decorator';

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
