import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from "@nestjs/common";
import { GradeService } from "./grade.service";
import { CreateGradeDto, UpdateGradeDto } from "../links/dto/grades.dto";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "../auth/current-user.decorator";

@Controller("grade")
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Get()
  getAll() {
    return this.gradeService.findAll();
  }

  @Get(":id")
  getOne(@Param("id") id: string) {
    return this.gradeService.findOne(id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post()
  create(@CurrentUser() user: any, @Body() dto: CreateGradeDto) {
    // Authenticated user is the grader (professor)
    return this.gradeService.create({
      ...dto,
      grader_id: user.sub,
    });
  }

  @UseGuards(AuthGuard("jwt"))
  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateGradeDto) {
    return this.gradeService.update(id, dto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.gradeService.delete(id);
  }
}
