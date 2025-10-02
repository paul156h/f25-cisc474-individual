import { Controller, Get, Param } from "@nestjs/common";
import { SubmissionService } from "./submission.service";

@Controller('submission')
export class SubmissionController {

    constructor(private readonly submissionService: SubmissionService) {}

    @Get()
    getAll() {

        return this.submissionService.findAll();

    }

    @Get(':id')
    getOne(@Param('id') id: string) {

        return this.submissionService.findOne(id);

    }
    
}