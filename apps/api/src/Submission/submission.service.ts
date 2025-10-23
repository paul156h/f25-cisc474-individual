import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateSubmissionDto, UpdateSubmissionDto } from "../links/dto/submissions.dto";

@Injectable()
export class SubmissionService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.submission.findMany({
      include: { assignment: true, owner: true, grades: true, feedbacks: true },
    });
  }

  findOne(id: string) {
    return this.prisma.submission.findUnique({
      where: { id },
      include: { assignment: true, owner: true, grades: true, feedbacks: true },
    });
  }

  async create(dto: CreateSubmissionDto) {
    const { assignment_id, content, type, owner_id } = dto;

    return this.prisma.submission.create({
      data: {
        assignment: { connect: { id: assignment_id } },
        content,
        type,
        owner: { connect: { id: owner_id } },
      },
      include: { assignment: true, owner: true },
    });
  }

  update(id: string, dto: UpdateSubmissionDto) {
    const { content, type } = dto;

    return this.prisma.submission.update({
      where: { id },
      data: {
        content: content ?? undefined,
        type: type ?? undefined,
      },
    });
  }

  delete(id: string) {
    return this.prisma.submission.delete({
      where: { id },
    });
  }
}
