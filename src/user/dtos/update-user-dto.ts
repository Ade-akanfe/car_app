import { IsEmail, IsStrongPassword, IsOptional } from 'class-validator';

export class UpdateUserDTO {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsStrongPassword()
  @IsOptional()
  password: string;
}
