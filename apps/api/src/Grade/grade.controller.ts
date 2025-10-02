import { Controller, Get, Param } from "@nestjs/common";
import { GradeService } from "./grade.service";
import { get } from "http";

@Controller('grade')
export class GradeController {

    constructor(private readonly gradeService: GradeService) {}

    @Get()
    getAll() {

        return this.gradeService.findAll();

    }

    @Get(':id')
    getOne(@Param('id') id: string) {

        return this.gradeService.findOne(id);

    }

}