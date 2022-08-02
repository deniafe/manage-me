import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  async leaveReport() {

    const leaveApplications =
      await this.prisma.leaveApplication.findMany({
        include: {
          employee: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              dateOfJoining: true,
              leaveBalance: true,
            }

          },
        },
      })

    return leaveApplications;
    
  }

  async projectReport() {

    const projects =
      await this.prisma.project.findMany({
        include: {
          employees: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              gender: true,
              photo: true,
              phone: true,
            }

          },
        },
      })

    return projects;
  }

  async activityReport() {

    const activities =
      await this.prisma.activity.findMany({
        include: {
          employee: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              dateOfJoining: true,
              leaveBalance: true,
            }

          },
        },
      })

    return activities;
  }
}
