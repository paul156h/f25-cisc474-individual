import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateAssignmentDto, UpdateAssignmentDto } from "../links/dto/assignments.dto";

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.assignment.findMany({
      include: { course: true, submissions: true },
    });
  }

  findOne(id: string) {
    return this.prisma.assignment.findUnique({
      where: { id },
      include: { course: true, submissions: true },
    });
  }

  create(dto: CreateAssignmentDto & { owner_id: string }) {
    const { title, due_by, instructions, type, course_id } = dto;

    return this.prisma.assignment.create({
      data: {
        title,
        due_by: new Date(due_by),
        instructions,
        type,
        course: {
          connect: { id: course_id },
        },
      },
      include: { course: true },
    });
  }

  update(id: string, dto: UpdateAssignmentDto) {
    const { title, due_by, instructions, type, course_id } = dto;

    return this.prisma.assignment.update({
      where: { id },
      data: {
        title,
        due_by: due_by ? new Date(due_by) : undefined,
        instructions,
        type,
        course: course_id
          ? {
              connect: { id: course_id },
            }
          : undefined,
      },
      include: { course: true },
    });
  }

  delete(id: string) {
    return this.prisma.assignment.delete({
      where: { id },
    });
  }
}
