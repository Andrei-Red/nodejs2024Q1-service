import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUsersDto {
  @IsNotEmpty({ message: 'Login is required.' })
  @IsString({ message: 'Login must be a string.' })
  login: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @IsString({ message: 'Password must be a string.' })
  password: string;
}

export class UpdateUsersDto extends PartialType(CreateUsersDto) {
  @IsNotEmpty({ message: 'Old password is required.' })
  @IsString({ message: 'Old password must be a string.' })
  oldPassword: string;

  @IsNotEmpty({ message: 'New password is required.' })
  @IsString({ message: 'New password must be a string.' })
  newPassword: string;
}
