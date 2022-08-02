import { Injectable, ForbiddenException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditEmployeeDto } from './dto';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async getEmployeeById(
    employeeId: number,
  ) {

    // get the employee by id
    const employee =
      await this.prisma.employee.findUnique({
        where: {
          id: employeeId,
        },
        include: {
          project: true,
          salary: true,
          activities: true,
          education: true,
          address: true,
          leaveApplications: true,
        }
      });

    // check if employee exists
    if (!employee)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    delete employee.hash;

    return employee;
  }

  async getEmployees(offset?: {skip? : number, take? : number}) {
      const employees = await this.prisma.employee.findMany(offset)
      return employees.map(employee => { 
        delete employee.hash
        return employee
      })
    
  }

  async updateEmployeeById(
    employeeId: number,
    dto: EditEmployeeDto,
  ) {

    // get the employee by id
    const employee =
      await this.prisma.employee.findUnique({
        where: {
          id: employeeId,
        },
      });

    // check if request is from an admin
    if (!employee)
      throw new ForbiddenException(
        'Access to resources denied',
      );

      const address = dto.address || {country: '', city: '', street: ''}
      const education = dto.education || []
      const workExperiences = dto.workExperiences || []

    const updatedEmployee = await this.prisma.employee.update({
      where: {
        id: employeeId,
      },
      data: { 
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        middleName: dto.middleName,
        gender: dto.gender,
        dob: dto.dob,
        dateOfJoining: dto.dateOfJoining,
        terminateDate: dto.terminateDate,
        photo: dto.photo,
        phone: dto.phone,
        address: {
          create: {
            ...address
          }
        },
        workExperiences: {
          create: [...workExperiences]
        },
        education: {
          create: [...education]
        }
      },
    });

    delete updatedEmployee.hash;

    return updatedEmployee;
  }

  async deleteEmployeeById(
    isAdmin: boolean,
    employeeId: number,
  ) {

    // get the employee by id
    const employee =
      await this.prisma.employee.findUnique({
        where: {
          id: employeeId,
        },
      });

    // check if employee exists and if request is from an admin
    if (!employee || !isAdmin)
      throw new ForbiddenException(
        'Access to resources denied',
      );

      await this.prisma.employee.delete({
        where: {
          id: employeeId,
        },
      });
  }
}