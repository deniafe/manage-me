import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSalaryDto, EditSalaryDto } from './dto';

@Injectable()
export class SalaryService {
  constructor(private prisma: PrismaService) { }

  async getSalaryById(
    salaryId: number,
  ) {
    // get the employee by id
    const salary =
      await this.prisma.salary.findUnique({
        where: {
          id: salaryId,
        }
      });

    if (!salary)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return salary;
  }

  async createSalary(dto: CreateSalaryDto) {

      const employee = await this.prisma.employee.update({
        where: {
          id: dto.employeeId,
        },
        data: { 
          salary: {
            create: {
              basicSalary: dto.basicSalary,
              bankName: dto.bankName,
              accountNumber: dto.accountNumber,
              accountName: dto.accountName,
            }
          },
         },
         select: {
          salary: true
         }
      });

      return employee.salary
  }

  async getSalaries(offset?: {skip? : number, take? : number}) {
      return this.prisma.salary.findMany(offset)
  }

  async updateSalaryById(
    salaryId: number,
    dto: EditSalaryDto,
  ) {

    // get the salary by id
    const salary =
      await this.prisma.salary.findUnique({
        where: {
          id: salaryId,
        },
      });

    // check if salary exists
    if (!salary)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return this.prisma.salary.update({
      where: {
        id: salaryId,
      },
      data: { 
        ...dto,
      },
    });

  }

  async deleteSalaryById(
    salaryId: number,
  ) {

    // get the salary by id
    const salary =
      await this.prisma.salary.findUnique({
        where: {
          id: salaryId,
        },
      });

    // check if salary exists
    if (!salary)
      throw new ForbiddenException(
        'Access to resources denied',
      );

      await this.prisma.salary.delete({
        where: {
          id: salaryId,
        },
      });
  }
}
