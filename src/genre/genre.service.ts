// genre.service.ts

import { Injectable } from '@nestjs/common';
import prisma from '../prisma/prisma.service';
import { genre, PrismaClient } from '@prisma/client';
import { CreateGenreDto, UpdateGenreDto } from './genre.dto';

@Injectable()
export class GenreService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create(data: CreateGenreDto): Promise<genre> {
    return this.prisma.genre.create({
      data,
    });
  }

  async findAll(): Promise<genre[]> {
    return this.prisma.genre.findMany();
  }

  async findById(id: string): Promise<genre | null> {
    return this.prisma.genre.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdateGenreDto): Promise<genre | null> {
    return this.prisma.genre.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<genre | null> {
    return this.prisma.genre.delete({
      where: { id },
    });
  }
}
