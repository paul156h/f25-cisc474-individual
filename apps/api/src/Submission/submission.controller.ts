import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from "@nestjs/common";
import { SubmissionService } from "./submission.service";
import { CreateSubmissionDto, UpdateSubmissionDto } from "../links/dto/submissions.dto";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "../auth/current-user.decorator";

@Controller("submission")
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Get()
  getAll() {
    return this.submissionService.findAll();
  }

  @Get(":id")
  getOne(@Param("id") id: string) {
    return this.submissionService.findOne(id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post()
  create(@CurrentUser() user: any, @Body() dto: CreateSubmissionDto) {
    // enforce that submission owner_id matches authenticated user
    return this.submissionService.create({
      ...dto,
      owner_id: user.sub,
    });
  }

  @UseGuards(AuthGuard("jwt"))
  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateSubmissionDto) {
    return this.submissionService.update(id, dto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.submissionService.delete(id);
  }
}
