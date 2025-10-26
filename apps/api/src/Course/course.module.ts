import { Module } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CourseController } from "./course.controller";
import { PrismaModule } from "src/prisma.module";
import { AuthModule } from '../auth/auth.module';

@Module({

    imports: [PrismaModule, AuthModule],
    controllers: [CourseController],
    providers: [CourseService, CourseController],

})

export class CourseModule {}