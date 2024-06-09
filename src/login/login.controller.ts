// login.controller.ts

import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto, UpdateLoginDto } from './login.dto';
import {LoginModule } from './login.model';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async create(@Body() createLoginDto: CreateLoginDto): Promise<LoginModule> {
    return this.loginService.create(createLoginDto);
  }

  @Get()
  async findAll(): Promise<LoginModule[]> {
    return this.loginService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<LoginModule | null> {
    return this.loginService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto): Promise<LoginModule| null> {
    return this.loginService.update(id, updateLoginDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<LoginModule| null> {
    return this.loginService.delete(id);
  }
}
