import { Module } from "@nestjs/common";
import { SubmissionService } from "./submission.service";
import { SubmissionController } from "./submission.controller";
import { PrismaModule } from "src/prisma.module";

@Module({

    imports: [PrismaModule],
    controllers: [SubmissionController],
    providers: [SubmissionService, SubmissionController],

})

export class SubmissionModule {}