import { Injectable, ForbiddenException } from '@nestjs/common';
import { Employee } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EditProjectDto, CreateProjectDto } from './dto';


@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) { }

  async getProjectById(
    employee: Employee,
    projectId: number,
  ) {

    // get the employee by id
    const project =
      await this.prisma.project.findUnique({
        where: {
          id: projectId,
        },
        include: {
          employees: true
        }
      });

    // // check if project exists and if request is from an admin and make make sure employee is part of the project
    // if (!project || !isAdmin || !project.employee.includes(employee))
    //   throw new ForbiddenException(
    //     'Access to resources denied',
    //   );
 
    // check if project exists and if request is from an admin and make make sure employee is part of the project
    if (!project)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return project;
  }

  async createProject(dto: CreateProjectDto) {

    const projectEmployees = dto.employees || []

    return this.prisma.project.create({
        data: { 
          ...dto,
          employees: {
            connect: [...projectEmployees]
          },
         },
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
              admin: true
            }
        }
      }
      });
  }

  async getProjects(offset?: {skip? : number, take? : number}) {
      return this.prisma.project.findMany(offset)
  }

  async updateProjectById(
    projectId: number,
    dto: EditProjectDto,
  ) {

    const projectEmployees = dto.employees || []

    // get the project by id
    const project =
      await this.prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });

    // check if project exists
    if (!project)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return this.prisma.project.update({
      where: {
        id: projectId,
      },
      data: { 
        ...dto,
        employees: {
          connect: [...projectEmployees]
        }
      },
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
            admin: true
          }
        }
      }
    });

  }

  async deleteProjectById(
    projectId: number,
  ) {

    // get the project by id
    const project =
      await this.prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });

    // check if project exists and if request is from an admin
    if (!project)
      throw new ForbiddenException(
        'Access to resources denied',
      );

      await this.prisma.project.delete({
        where: {
          id: projectId,
        },
      });
  }
}
