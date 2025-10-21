import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class GradeService {

    constructor(private prisma: PrismaService) {}

    findAll() {

        return this.prisma.grade.findMany({
            include: {
                submission: {
                    include: {
                        assignment: true,
                    },
                },
            },
        }
        );

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

}