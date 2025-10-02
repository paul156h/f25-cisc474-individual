import { Module } from "@nestjs/common";
import { AssignmentService } from "./assignment.service";
import { AssignmentController } from "./assignment.controller";
import { PrismaModule } from "src/prisma.module";

@Module({

    imports: [PrismaModule],
    controllers: [AssignmentController],
    providers: [AssignmentService, AssignmentController],

})

export class AssignmentModule {}