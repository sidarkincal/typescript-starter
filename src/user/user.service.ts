import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const userSelect = {
  id: true,
  fullname: true,
  email: true,
} as const;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({ select: userSelect });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id }, select: userSelect });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findOneUser(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  create(dto: CreateUserDto) {
    return this.prisma.user.create({ data: dto, select: userSelect });
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.findOne(id);
    return this.prisma.user.update({ where: { id }, data: dto, select: userSelect });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.user.delete({ where: { id }, select: userSelect });
  }
}
