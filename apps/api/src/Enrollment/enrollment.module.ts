import { Module } from "@nestjs/common";
import { EnrollmentService } from "./enrollment.service";
import { EnrollmentController } from "./enrollment.controller";
import { PrismaModule } from "src/prisma.module";

@Module({

    imports: [PrismaModule],
    controllers: [EnrollmentController],
    providers: [EnrollmentService, EnrollmentController],

})

export class EnrollmentModule {}