import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourseDto, UpdateCourseDto } from "../links/dto/course.dto";
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from "../auth/current-user.decorator";

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

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@CurrentUser() user: any, @Body() dto: CreateCourseDto) {
    return this.courseService.create({
      ...dto,
      owner_id: user.sub,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.courseService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.courseService.delete(id);
  }
}
