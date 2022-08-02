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
import { CreateGrievanceDto, EditGrievanceDto } from './dto';
import { GrievanceService } from './grievance.service';

@UseGuards(JwtGuard)
@Controller('grievances')
export class GrievanceController {
  constructor(private grievanceService: GrievanceService) {}
  
  @Get('/:id')
  getGrievanceById( 
    @GetEmployee('admin') isAdmin: boolean, 
    @GetEmployee('id') employeeId: number, 
    @Param('id', ParseIntPipe) grievanceId: number, 
    ) {
    return this.grievanceService.getGrievanceById(isAdmin, employeeId, grievanceId)
  }

  @Post('/')
  createGrievance( 
    @GetEmployee('id') employeeId: number, 
    @Body() dto: CreateGrievanceDto,
   ) { 
    return this.grievanceService.createGrievance(employeeId, dto)
  }

  @UseGuards(AdminGuard)
  @Get('/')
  getGrievances(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number, 
    @Query('take', new DefaultValuePipe(0), ParseIntPipe) take?: number
  ) {
    skip = skip || undefined
    take = take || undefined
    return this.grievanceService.getGrievances({skip, take})
  }

  @Patch('/:id')
  updateGrievanceById(
    @GetEmployee('id') employeeId: number, 
    @Param('id', ParseIntPipe) grievanceId: number, 
    @Body() dto: EditGrievanceDto
    ) {
    return this.grievanceService.updateGrievanceById(employeeId, grievanceId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  deleteGrievanceById(
    @GetEmployee('admin') isAdmin: boolean, 
    @GetEmployee('id') employeeId: number, 
    @Param('id', ParseIntPipe) grievanceId: number,
  ) {
    return this.grievanceService.deleteGrievanceById(isAdmin, employeeId, grievanceId);
  }
}
