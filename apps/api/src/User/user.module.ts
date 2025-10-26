import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { PrismaModule } from 'src/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({

    imports: [PrismaModule, AuthModule],
    controllers: [UsersController],
    providers: [UsersService, UsersController],

})

export class UserModule {}