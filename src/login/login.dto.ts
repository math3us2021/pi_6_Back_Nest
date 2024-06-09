import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateLoginDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  userId!: string;

  constructor(createLoginDto: CreateLoginDto) {
    Object.assign(this, createLoginDto);
  }
}

export class UpdateLoginDto {
  @IsNotEmpty()
  password!: string;

  constructor(updateLoginDto: UpdateLoginDto) {
    Object.assign(this, updateLoginDto);
  }
}
