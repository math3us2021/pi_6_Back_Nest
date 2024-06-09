// movies.service.ts

import {Injectable} from '@nestjs/common';
import prisma from '../prisma/prisma.service';

import {movies, PrismaClient} from '@prisma/client';
import {CreateMovieDto, UpdateMovieDto} from './movies.dto';

@Injectable()
export class MoviesService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }
  

  async create(data: CreateMovieDto): Promise<movies> {
    return this.prisma.movies.create({
      data,
    });
  }

  async findAll(): Promise<movies[]> {
    return this.prisma.movies.findMany();
  }

  async findById(id: string): Promise<movies | null> {
    return this.prisma.movies.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdateMovieDto): Promise<movies | null> {
    return this.prisma.movies.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<movies | null> {
    return this.prisma.movies.delete({
      where: { id },
    });
  }
  async countTotalMovies(): Promise<number> {
    return await this.prisma.movies.count();
  }

}
