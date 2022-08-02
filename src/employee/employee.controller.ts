import {
  Body,
  Controller,
  Get,
  Param,
  DefaultValuePipe,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
  HttpCode,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { Employee } from '@prisma/client';
import { GetEmployee } from './decorator';
import { JwtGuard, AdminGuard } from '../guards';
import { EditEmployeeDto } from './dto';
import { EmployeeService } from './employee.service';

@UseGuards(JwtGuard)
@Controller('employees')
export class EmployeeController { 
  constructor(private employeeService: EmployeeService) {}
  
  @Get('/me')
  getMe(@GetEmployee() employee: Employee) {
    return employee
  }

  @Get('/:id')
  getEmployeeById( 
    @GetEmployee('admin') isAdmin: boolean, 
    @Param('id', ParseIntPipe) employeeId: number, 
    ) {
    return this.employeeService.getEmployeeById(isAdmin, employeeId)
  }


  @UseGuards(AdminGuard)
  @Get()
  getEmployees( 
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number, 
    @Query('take', new DefaultValuePipe(0), ParseIntPipe) take?: number
    ) {
      skip = skip || undefined
      take = take || undefined
    return this.employeeService.getEmployees({skip, take})
  }

  // * Should be able to get employees by Id and that should have the admin guard
  // * Should be able to delete the employees by ID and that should have the admin guard

  @UseGuards(AdminGuard)
  @Patch('/:id')
  updateEmployeeById(
    @Param('id', ParseIntPipe) employeeId: number, 
    @Body() dto: EditEmployeeDto
    ) {
    return this.employeeService.updateEmployeeById(employeeId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  deleteEmployeeById(
    @GetEmployee('admin') isAdmin: boolean,
    @Param('id', ParseIntPipe) employeeId: number,
  ) {
    return this.employeeService.deleteEmployeeById(
      isAdmin,
      employeeId,
    );
  }
}