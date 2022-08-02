import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditActivityDto, CreateActivityDto } from './dto';

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) { }

  async getActivityById(
    isAdmin: boolean,
    employeeId: number,
    activityId: number,
  ) {

    // get the employee by id
    const activity =
      await this.prisma.activity.findUnique({
        where: {
          id: activityId,
        },
      });

      const isEmployee = employeeId === activity.employeeId
 
    // check if activity exists and if request is from an admin and make make sure employee is part of the activity
    if (!activity || (!isEmployee && !isAdmin))
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return activity;
  }

  async createActivity(employeeId: number, dto: CreateActivityDto) {

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
        activities: {
          create: [
            {
              in: dto.in,
              date: dto.date,
              tasksForToday: dto.tasksForToday
            }
          ]
        },
       },
       include: {
        activities: true
       }
    });

    return employee.activities
 }

  async updateActivityById(
    isAdmin: boolean,
    employeeId: number,
    activityId: number,
    dto: EditActivityDto,
  ) {

    // get the Activity by id
    const activity =
      await this.prisma.activity.findUnique({
        where: {
          id: activityId,
        },
      });

      const isEmployee = employeeId === activity.employeeId

    // check if activity exists
    if (!activity || (!isEmployee && !isAdmin))
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return this.prisma.activity.update({
      where: {
        id: activityId,
      },
      data: { 
        ...dto,
      },
    });

  }

  async getActivities(offset?: {skip? : number, take? : number}) {
      return this.prisma.activity.findMany(offset)
  }

  async deleteActivityById(
    isAdmin: boolean,
    employeeId: number,
    activityId: number,
  ) {

    // get the activity by id
    const activity =
      await this.prisma.activity.findUnique({
        where: {
          id: activityId,
        },
      });

      const isEmployee = employeeId === activity.employeeId

    // check if activity exists and if request is from an admin and make make sure employee is part of the activity
    if (!activity || (!isEmployee && !isAdmin))
      throw new ForbiddenException(
        'Access to resources denied',
      );

      await this.prisma.activity.delete({
        where: {
          id: activityId,
        },
      });
  }
}
