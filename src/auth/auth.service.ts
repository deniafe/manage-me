import { Injectable, ForbiddenException, } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { SignupDto, SigninDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    ) {}
  async signup(dto: SignupDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    try {
      const employee = await this.prisma.employee.create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          middleName: dto.middleName,
          gender: dto.gender,
          dob: dto.dob,
          dateOfJoining: dto.dateOfJoining,
          terminateDate: dto.terminateDate,
          phone: dto.phone,
          photo: dto.photo,
          admin: false,
          hash,
        },
      })

      return this.signToken(employee.id, employee.email);
      
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
      console.log('There was an error trying to send the message ========>', error)
      throw error;
    }
  }

  async signin(dto: SigninDto) {
    // find the user by email
    const employee =
      await this.prisma.employee.findUnique({
        where: {
          email: dto.email,
        },
      });
    // if user does not exist throw exception
    if (!employee)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    // compare password
    const pwMatches = await argon.verify(
      employee.hash,
      dto.password,
    );
    // if password incorrect throw exception
    if (!pwMatches)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    return this.signToken(employee.id, employee.email);
  }

  async signToken(
    employeeId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: employeeId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '15m',
        secret: secret,
      },
    );

    return {
      access_token: token,
    };
  }
}
