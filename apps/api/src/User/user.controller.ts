import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '../links/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  // 🧠 Authenticated route that auto-creates or returns the user
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@CurrentUser() user: any) {
    const dbUser = await this.userService.findOrCreateFromAuth0(user);
    return dbUser;
  }

  // Create user manually (rarely used — for admin tools)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@CurrentUser() user: any, @Body() dto: CreateUserDto) {
    return this.userService.create({
      ...dto,
      auth0_sub: user.sub,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
