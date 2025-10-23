import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
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

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe(@CurrentUser() user: any) {
        return {
            id: user.sub,
            email: user.email,
            name: user.name,
            ...user
        };
    }

}