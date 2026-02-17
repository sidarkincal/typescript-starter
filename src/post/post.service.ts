import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.post.findMany({ include: { author: true } });
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  create(dto: CreatePostDto, userId: number) {
    return this.prisma.post.create({
      data: { ...dto, authorId: userId },
      include: { author: true },
    });
  }

  async update(id: number, dto: UpdatePostDto, userId: number) {
    const post = await this.findOne(id);
    if (post.authorId !== userId) {
      throw new ForbiddenException('Bu post size ait değil');
    }
    return this.prisma.post.update({
      where: { id },
      data: dto,
      include: { author: true },
    });
  }

  async remove(id: number, userId: number) {
    const post = await this.findOne(id);
    if (post.authorId !== userId) {
      throw new ForbiddenException('Bu post size ait değil');
    }
    return this.prisma.post.delete({ where: { id } });
  }
}
