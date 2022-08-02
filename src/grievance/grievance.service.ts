import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditGrievanceDto, CreateGrievanceDto } from './dto';

@Injectable()
export class GrievanceService {
  constructor(private prisma: PrismaService) { }

  async getGrievanceById(
    isAdmin: boolean,
    employeeId: number,
    grievanceId: number,
  ) {

    // get the employee by id
    const grievance =
      await this.prisma.grievance.findUnique({
        where: {
          id: grievanceId,
        },
      });

      const isEmployee = employeeId === grievance.employeeId
 
    // check if grievance exists and if request is from an admin and make make sure employee is part of the grievance
    if (!grievance || (!isEmployee && !isAdmin))
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return grievance;
  }

  async createGrievance(employeeId: number, dto: CreateGrievanceDto) {

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
        grievances: {
          create: [
            {
             ...dto
            }
          ]
        },
       },
       include: {
        grievances: true
       }
    });

    return employee.grievances
 }

  async updateGrievanceById(
    employeeId: number,
    grievanceId: number,
    dto: EditGrievanceDto,
  ) {

    // get the Grievance by id
    const grievance =
      await this.prisma.grievance.findUnique({
        where: {
          id: grievanceId,
        },
      });

      const isEmployee = employeeId === grievance.employeeId

    // check if grievance exists
    if (!grievance || !isEmployee)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return this.prisma.grievance.update({
      where: {
        id: grievanceId,
      },
      data: { 
        ...dto,
      },
    });

  }

  async getGrievances(offset?: {skip? : number, take? : number}) {
      return this.prisma.grievance.findMany(offset)
  }

  async deleteGrievanceById(
    isAdmin: boolean,
    employeeId: number,
    grievanceId: number,
  ) {

    // get the grievance by id
    const grievance =
      await this.prisma.grievance.findUnique({
        where: {
          id: grievanceId,
        },
      });

      const isEmployee = employeeId === grievance.employeeId

    // check if grievance exists and if request is from an admin and make make sure employee is part of the grievance
    if (!grievance || (!isEmployee && !isAdmin))
      throw new ForbiddenException(
        'Access to resources denied',
      );

      await this.prisma.grievance.delete({
        where: {
          id: grievanceId,
        },
      });
  }
}
