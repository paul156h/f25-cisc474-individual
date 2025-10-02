import { Controller, Get, Param } from "@nestjs/common";
import { AssignmentService } from "./assignment.service";

@Controller('assignment')
export class AssignmentController {

    constructor(private readonly assignmentService: AssignmentService) {}

    @Get()
    getAll() {

        return this.assignmentService.findAll();

    }

    @Get(':id')
    getOne(@Param('id') id: string) {

        return this.assignmentService.findOne(Number(id));

    }

}