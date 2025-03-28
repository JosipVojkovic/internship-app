import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async adminPasswordLogin(email: string, password: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    if (!password) {
      throw new BadRequestException('Password is required');
    }

    const admin = await this.prismaService.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      throw new BadRequestException('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign({
      id: admin.id,
      email: admin.email,
      role: 'admin',
    });

    // const accessToken = this.jwtService.sign({
    //   id: '80bc09ab-d789-41f9-89a6-b64c2d49cd75',
    //   email: 'admin@dump.hr',
    //   role: 'admin',
    // });

    return accessToken;
  }
}
