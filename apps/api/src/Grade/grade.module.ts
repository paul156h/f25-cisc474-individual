import { Module } from "@nestjs/common";
import { GradeService } from "./grade.service";
import { GradeController } from "./grade.controller";

@Module({

    controllers: [GradeController],
    providers: [GradeService, GradeController],

})

export class GradeModule {}