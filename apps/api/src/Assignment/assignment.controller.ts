import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from "@nestjs/common";
import { AssignmentService } from "./assignment.service";
import { CreateAssignmentDto, UpdateAssignmentDto } from "../links/dto/assignments.dto";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "../auth/current-user.decorator";

@Controller("assignment")
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Get()
  getAll() {
    return this.assignmentService.findAll();
  }

  @Get(":id")
  getOne(@Param("id") id: string) {
    return this.assignmentService.findOne(id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post()
  create(@CurrentUser() user: any, @Body() dto: CreateAssignmentDto) {
    return this.assignmentService.create({
      ...dto,
      owner_id: user.sub, 
    });
  }

  @UseGuards(AuthGuard("jwt"))
  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateAssignmentDto) {
    return this.assignmentService.update(id, dto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.assignmentService.delete(id);
  }
}
