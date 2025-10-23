import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateGradeDto, UpdateGradeDto } from "../links/dto/grades.dto";

@Injectable()
export class GradeService {
  constructor(private prisma: PrismaService) {}

  // ✅ Deep include only for read operations
  findAll() {
    return this.prisma.grade.findMany({
      include: {
        submission: {
          include: {
            assignment: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.grade.findUnique({
      where: { id },
      include: {
        submission: {
          include: {
            assignment: true,
          },
        },
      },
    });
  }

  // 🟢 Basic create — no includes here
  async create(dto: CreateGradeDto) {
    const { submission_id, score, feedback, grader_id, student_id } = dto;

    return this.prisma.grade.create({
      data: {
        submission: { connect: { id: submission_id } },
        score,
        feedback,
        teacher: { connect: { id: grader_id } },
        student: { connect: { id: student_id } },
      },
    });
  }

  update(id: string, dto: UpdateGradeDto) {
    const { score, feedback } = dto;

    return this.prisma.grade.update({
      where: { id },
      data: {
        score: score ?? undefined,
        feedback: feedback ?? undefined,
      },
    });
  }

  delete(id: string) {
    return this.prisma.grade.delete({
      where: { id },
    });
  }
}
