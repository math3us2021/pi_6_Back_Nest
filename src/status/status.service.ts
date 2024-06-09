// status.service.ts

import { Injectable } from '@nestjs/common';
import prisma from '../prisma/prisma.service';
import { status, Prisma, PrismaClient } from '@prisma/client';
import { CreateStatusDto, UpdateStatusDto } from './status.dto';

@Injectable()
export class StatusService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: CreateStatusDto): Promise<status> {
    return this.prisma.status.create({
      data,
    });
  }

  async findAll(): Promise<status[]> {
    return this.prisma.status.findMany();
  }

  async findById(id: string): Promise<status | null> {
    return this.prisma.status.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdateStatusDto): Promise<status | null> {
    return this.prisma.status.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<status | null> {
    return this.prisma.status.delete({
      where: { id },
    });
  }
}
