import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AssignmentService {

    constructor(private prisma: PrismaService) {}

    findAll() {

        return this.prisma.assignment.findMany();

    }

    findOne(id: number) {

        return this.prisma.course.course.findUnique( {where: { id }} );

    }

}