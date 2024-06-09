// user.dto.ts

import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name?: string;

  @IsEmail()
  email?: string;

  @IsNotEmpty()
  password?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  favoriteGenres?: string;

  @IsOptional()
  receiveNotifications?: boolean;

  @IsOptional()
  isAdmin?: boolean;

  constructor(createUserDto: CreateUserDto) {
    Object.assign(this, createUserDto);
  }
}

export class UpdateUserDto {
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  favoriteGenres?: string;

  @IsOptional()
  receiveNotifications?: boolean;

  @IsOptional()
  isAdmin?: boolean;

  constructor(updateUserDto: UpdateUserDto) {
    Object.assign(this, updateUserDto);
  }
}
