import {
  Body,
  Controller,
  Get,
  Post,
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
import { GetEmployee } from '../employee/decorator';
import { AdminGuard, JwtGuard } from '../guards';
import { CreateLeaveDto, EditLeaveDto, ApproveLeaveDto } from './dto';
import { LeaveService } from './leave.service';

@UseGuards(JwtGuard)
@Controller('leaves')
export class LeaveController {
  constructor(private leaveService: LeaveService) {}
  
  @Get('/:id')
  getLeaveById( 
    @GetEmployee('admin') isAdmin: boolean, 
    @GetEmployee('id') employeeId: number, 
    @Param('id', ParseIntPipe) leaveId: number, 
    ) {
    return this.leaveService.getLeaveById(isAdmin, employeeId, leaveId)
  }

  @Post('/')
  createLeave( 
    @GetEmployee('id') employeeId: number, 
    @Body() dto: CreateLeaveDto,
   ) { 
    return this.leaveService.createLeave(employeeId, dto)
  }

  @UseGuards(AdminGuard)
  @Get('/')
  getLeaves(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number, 
    @Query('take', new DefaultValuePipe(0), ParseIntPipe) take?: number
  ) {
    skip = skip || undefined
    take = take || undefined
    return this.leaveService.getLeaves({skip, take})
  }

  @UseGuards(AdminGuard)
  @Patch('/manage/:id')
  manageLeaveById(
    @Param('id', ParseIntPipe) leaveId: number, 
    @Body() dto: ApproveLeaveDto
    ) {
    return this.leaveService.manageLeaveById(leaveId, dto);
  }

  @Patch('/:id')
  updateLeaveById(
    @GetEmployee('admin') isAdmin: boolean, 
    @GetEmployee('id') employeeId: number, 
    @Param('id', ParseIntPipe) leaveId: number, 
    @Body() dto: EditLeaveDto
    ) {
    return this.leaveService.updateLeaveById(isAdmin, employeeId, leaveId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  deleteLeaveById(
    @GetEmployee('admin') isAdmin: boolean, 
    @GetEmployee('id') employeeId: number, 
    @Param('id', ParseIntPipe) leaveId: number,
  ) {
    return this.leaveService.deleteLeaveById(isAdmin, employeeId, leaveId);
  }
}
