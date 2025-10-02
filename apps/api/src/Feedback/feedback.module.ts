import { Module } from "@nestjs/common";
import { FeedbackService } from "./feedback.service";
import { FeedbackController } from "./feedback.controller";
import { PrismaModule } from "src/prisma.module";

@Module({

    imports: [PrismaModule],
    controllers: [FeedbackController],
    providers: [FeedbackService, FeedbackController],

})

export class FeedbackModule {}