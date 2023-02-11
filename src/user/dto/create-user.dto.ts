import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { PASSWORD_LENGTH } from '../constants';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(PASSWORD_LENGTH.MIN, PASSWORD_LENGTH.MAX)
  password: string;
}
