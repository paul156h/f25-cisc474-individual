import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class EnrollmentService {

    constructor(private prisma: PrismaService) {}

    findAll() {

        return this.prisma.enrollment.findMany();

    }

    findOne(id: string) {

        return this.prisma.enrollment.findUnique( {where: { id }} );

    }

}