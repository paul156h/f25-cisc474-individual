import { assignMetadata, Module } from "@nestjs/common";
import { AssignmentService } from "./assignment.service";
import { AssignmentController } from "./assignment.controller";

@Module({

    controllers: [AssignmentController],
    providers: [AssignmentService, AssignmentController],

})

export class AssignmentModule {}