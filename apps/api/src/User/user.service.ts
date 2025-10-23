import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto, UpdateUserDto } from '../links/dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findOrCreateFromAuth0(auth0User: any) {
    // Try to find existing user
    let user = await this.prisma.user.findUnique({
      where: { id: auth0User.sub },
    });

    // Create if not found
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          id: auth0User.sub, // Auth0 ID as primary key
          name: auth0User.name ?? null,
          email: auth0User.email ?? null,
          role: 'STUDENT', // default role — adjust if you detect roles from Auth0
        },
      });
    }

    return user;
  }

  create(dto: CreateUserDto & { auth0_sub: string }) {
    return this.prisma.user.create({
      data: {
        id: dto.auth0_sub, // Auth0 ID as DB ID
        name: dto.name,
        email: dto.email,
        role: dto.role,
      },
    });
  }

  update(id: string, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: {
        name: dto.name ?? undefined,
        email: dto.email ?? undefined,
        role: dto.role ?? undefined,
      },
    });
  }

  delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
