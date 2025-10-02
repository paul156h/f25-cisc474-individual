import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class FeedbackService {

    constructor(private prisma: PrismaService) {}

    findAll() {

        return this.prisma.feedback.findMany();

    }

    findOne(id: number) {

        return this.prisma.feedback.findUnique( {where: { id }} );

    }

}