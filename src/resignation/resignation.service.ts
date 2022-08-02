import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditResignationDto, CreateResignationDto } from './dto';

@Injectable()
export class ResignationService {
  constructor(private prisma: PrismaService) { }

  async getResignationById(
    isAdmin: boolean,
    employeeId: number,
    resignationId: number,
  ) {

    // get the employee by id
    const resignation =
      await this.prisma.resignation.findUnique({
        where: {
          id: resignationId,
        },
      });

      const isEmployee = employeeId === resignation.employeeId
 
    // check if resignation exists and if request is from an admin and make make sure employee is part of the resignation
    if (!resignation || (!isEmployee && !isAdmin))
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return resignation;
  }

  async createResignation(employeeId: number, dto: CreateResignationDto) {

     // get the employee by id
     const isEmployee =
     await this.prisma.employee.findUnique({
       where: {
         id: employeeId,
       },
     });

   // Throw an error if the employee does not exists
   if (!isEmployee)
     throw new ForbiddenException(
       'Access to resources denied',
     );


    const employee = await this.prisma.employee.update({
      where: {
        id: employeeId,
      },
      data: { 
        resignation: {
          create: { ...dto }
        },
       },
       include: {
        resignation: true
       }
    });

    return employee.resignation
 }

  async updateResignationById(
    employeeId: number,
    resignationId: number,
    dto: EditResignationDto,
  ) {

    // get the resignation by id
    const resignation =
      await this.prisma.resignation.findUnique({
        where: {
          id: resignationId,
        },
      });

      const isEmployee = employeeId === resignation.employeeId

    // check if resignation exists
    if (!resignation || !isEmployee)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return this.prisma.resignation.update({
      where: {
        id: resignationId,
      },
      data: { 
        ...dto,
      },
    });

  }

  async getResignations(offset?: {skip? : number, take? : number}) {
      return this.prisma.resignation.findMany(offset)
  }

  async deleteResignationById(
    isAdmin: boolean,
    employeeId: number,
    resignationId: number,
  ) {

    // get the resignation by id
    const resignation =
      await this.prisma.resignation.findUnique({
        where: {
          id: resignationId,
        },
      });

      const isEmployee = employeeId === resignation.employeeId

    // check if resignation exists and if request is from an admin and make make sure employee is part of the resignation
    if (!resignation || (!isEmployee && !isAdmin))
      throw new ForbiddenException(
        'Access to resources denied',
      );

      await this.prisma.resignation.delete({
        where: {
          id: resignationId,
        },
      });
  }
}
