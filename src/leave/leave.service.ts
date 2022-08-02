import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditLeaveDto, CreateLeaveDto, ApproveLeaveDto } from './dto';
import { getDays } from '../utils'

@Injectable()
export class LeaveService {
  constructor(private prisma: PrismaService) { }

  async getLeaveById(
    isAdmin: boolean,
    employeeId: number,
    leaveId: number,
  ) {

    // get the employee by id
    const leave =
      await this.prisma.leaveApplication.findUnique({
        where: {
          id: leaveId,
        },
      });

      const isEmployee = employeeId === leave.employeeId
 
    // check if leave exists and if request is from an admin and make make sure employee is part of the leave
    if (!leave || (!isEmployee && !isAdmin))
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return leave;
  }

  async createLeave(employeeId: number, dto: CreateLeaveDto) {

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
        leaveApplications: {
          create: [
            {
              fromDate: dto.fromDate,
              toDate: dto.toDate,
              reasonForLeave: dto.reasonForLeave,
              type: dto.type,
            }
          ]
        },
       },
       include: {
        leaveApplications: true
       }
    });

    return employee.leaveApplications
 }

 async manageLeaveById(
  leaveId: number,
  dto: ApproveLeaveDto,
) {
  // get the Leave by id
  const leave =
    await this.prisma.leaveApplication.findUnique({
      where: {
        id: leaveId,
      },
    });

  // check if leave exists
  if (!leave)
    throw new ForbiddenException(
      'Access to resources denied',
    );

    const employee =
      await this.prisma.employee.findUnique({
        where: {
          id: leave.employeeId,
        }
      });

    // If the leave is approved, deduct number of days from employee leave balance
    if (dto.status === 'APPROVED' && leave.status !== 'APPROVED') {

      await this.prisma.employee.update({
        where: {
          id: employee.id
        },
        data: {
          leaveBalance: employee.leaveBalance - getDays(leave.fromDate, leave.toDate)
        }
      })
      // If leave is cancelled return deducted number of days to employees leave balance
  } else if (dto.status === 'CANCELLED' && leave.status === 'APPROVED') {
      
      await this.prisma.employee.update({
        where: {
          id: employee.id
        },
        data: {
          leaveBalance: employee.leaveBalance + getDays(leave.fromDate, leave.toDate)
        }
      })
  }

  return this.prisma.leaveApplication.update({
    where: {
      id: leaveId,
    },
    data: { 
      status: dto.status
    },
  });

}

  async updateLeaveById(
    isAdmin: boolean,
    employeeId: number,
    leaveId: number,
    dto: EditLeaveDto,
  ) {

    // get the Leave by id
    const leave =
      await this.prisma.leaveApplication.findUnique({
        where: {
          id: leaveId,
        },
      });

      const isEmployee = employeeId === leave.employeeId

    // check if leave exists
    if (!leave || (!isEmployee && !isAdmin))
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return this.prisma.leaveApplication.update({
      where: {
        id: leaveId,
      },
      data: { 
        ...dto,
      },
    });

  }

  async getLeaves(offset?: {skip? : number, take? : number}) {
      return this.prisma.leaveApplication.findMany(offset)
  }

  async deleteLeaveById(
    isAdmin: boolean,
    employeeId: number,
    leaveId: number,
  ) {

    // get the leave by id
    const leave =
      await this.prisma.leaveApplication.findUnique({
        where: {
          id: leaveId,
        },
      });

      const isEmployee = employeeId === leave.employeeId

    // check if leave exists and if request is from an admin and make make sure employee is part of the leave
    if (!leave || (!isEmployee && !isAdmin))
      throw new ForbiddenException(
        'Access to resources denied',
      );

      await this.prisma.leaveApplication.delete({
        where: {
          id: leaveId,
        },
      });
  }
}
