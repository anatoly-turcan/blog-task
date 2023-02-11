import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

import { MAX_POST_TEXT_LENGTH } from '../constants';

export class CreatePostDto {
  @IsString()
  @MaxLength(MAX_POST_TEXT_LENGTH)
  text: string;

  @IsBoolean()
  @IsOptional()
  isHidden?: boolean;
}
