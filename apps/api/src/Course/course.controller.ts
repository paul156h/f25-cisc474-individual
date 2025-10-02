import { Controller, Get, Param } from "@nestjs/common";
import { CourseService } from "./course.service";

@Controller('course')
export class CourseController {

    constructor(private readonly courseService: CourseService) {}

    @Get()
    getAll() {

        return this.courseService.findAll();

    }

    @Get(':id')
    getOne(@Param('id') id: string) {

        return this.courseService.findOne(id);

    }

}