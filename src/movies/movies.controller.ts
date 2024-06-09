
// movies.controller.ts

import {Controller, Post, Body, Get, Param, Patch, Delete, Put, Injectable} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto, UpdateMovieDto } from './movies.dto';
import { movies } from '@prisma/client';
import {PubSubService} from "../pub-sub/pub-sub.service";

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService,
              private readonly pubSubService: PubSubService
              ) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto): Promise<movies> {
    console.log(createMovieDto)
    const createMovie = this.moviesService.create(createMovieDto);
    if (createMovieDto) {
      await this.pubSubService.publishMessage(
          'register_movie',
          JSON.stringify(createMovieDto),
      );
    }
    return createMovie;
  }

  @Get()
  async findAll(): Promise<movies[]> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<movies | null> {
    return this.moviesService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto): Promise<movies | null> {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<movies | null> {
    return this.moviesService.delete(id);
  }
}
