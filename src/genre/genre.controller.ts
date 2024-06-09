// genre.controller.ts

import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto, UpdateGenreDto } from './genre.dto';
import { genre } from '@prisma/client';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  async create(@Body() createGenreDto: CreateGenreDto): Promise<genre> {
    return this.genreService.create(createGenreDto);
  }

  @Get()
  async findAll(): Promise<genre[]> {
    return this.genreService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<genre | null> {
    return this.genreService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto): Promise<genre | null> {
    return this.genreService.update(id, updateGenreDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<genre | null> {
    return this.genreService.delete(id);
  }
}
