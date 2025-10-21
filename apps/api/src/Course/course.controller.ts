import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourseDto, UpdateCourseDto } from "../links/dto/course.dto";

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

  @Post()
  create(@Body() dto: CreateCourseDto) {
    return this.courseService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.courseService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.courseService.delete(id);
  }
}
