import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
