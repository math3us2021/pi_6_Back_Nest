
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import prisma from '../prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: any) {
    return this.prisma.user.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async countNewUsersThisMonth(): Promise<number> {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const newUsersCount = await this.prisma.user.count({
      where: {
        dateRegistered: {
          gte: firstDayOfMonth,
        },
      },
    });
    return newUsersCount;
  }
  async countTotalUsers(): Promise<number> {
    const totalUsersCount = await this.prisma.user.count();
    return totalUsersCount;
  }
}
