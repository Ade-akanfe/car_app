import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsStrongPassword({ minLength: 7 })
  password: string;
}
