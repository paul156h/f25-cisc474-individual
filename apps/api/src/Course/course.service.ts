import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateCourseDto, UpdateCourseDto } from "../links/dto/course.dto";

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.course.findMany({
      include: { assignments: true },
    });
  }

  findOne(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
      include: { assignments: true },
    });
  }

  create(dto: CreateCourseDto & { owner_id: string }) {
  return this.prisma.course.create({
    data: {
      name: dto.title,
      description: dto.description,
      owner: { connect: { id: dto.owner_id } },
    },
  });
}

  update(id: string, dto: UpdateCourseDto) {
  return this.prisma.course.update({
    where: { id },
    data: {
      name: dto.title ?? undefined,
      description: dto.description ?? undefined,
    },
  });
}

  delete(id: string) {
    return this.prisma.course.delete({
      where: { id },
    });
  }
}
