import { Controller, Get, Param } from "@nestjs/common";
import { FeedbackService } from "./feedback.service";

@Controller('feedback')
export class FeedbackController {

    constructor(private readonly feedbackService: FeedbackService) {}

    @Get()
    getAll() {

        return this.feedbackService.findAll();

    }

    @Get(':id')
    getOne(@Param('id') id: string) {

        return this.feedbackService.findOne(Number(id));

    }

}