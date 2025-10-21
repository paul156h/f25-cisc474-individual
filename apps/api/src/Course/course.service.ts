import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

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

}