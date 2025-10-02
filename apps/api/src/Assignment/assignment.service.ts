import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AssignmentService {

    constructor(private prisma: PrismaService) {}

    findAll() {

        return this.prisma.assignment.findMany();

    }

    findOne(id: string) {

        return this.prisma.assignment.findUnique( {where: { id }} );

    }

}