// status.controller.ts

import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto, UpdateStatusDto } from './status.dto';
import {  status } from '@prisma/client';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  async create(@Body() createStatusDto: CreateStatusDto): Promise<status> {
    return this.statusService.create(createStatusDto);
  }

  @Get()
  async findAll(): Promise<status[]> {
    return this.statusService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<status | null> {
    return this.statusService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto): Promise<status | null> {
    return this.statusService.update(id, updateStatusDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<status | null> {
    return this.statusService.delete(id);
  }
}
