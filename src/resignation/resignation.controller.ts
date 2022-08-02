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
import { CreateResignationDto, EditResignationDto } from './dto';
import { ResignationService } from './resignation.service';

@UseGuards(JwtGuard)
@Controller('resignations')
export class ResignationController {
  constructor(private resignationService: ResignationService) {}
  
  @Get('/:id')
  getResignationById( 
    @GetEmployee('admin') isAdmin: boolean, 
    @GetEmployee('id') employeeId: number, 
    @Param('id', ParseIntPipe) resignationId: number, 
    ) {
    return this.resignationService.getResignationById(isAdmin, employeeId, resignationId)
  }

  @Post('/')
  createResignation( 
    @GetEmployee('id') employeeId: number, 
    @Body() dto: CreateResignationDto,
   ) { 
    return this.resignationService.createResignation(employeeId, dto)
  }

  @UseGuards(AdminGuard)
  @Get('/')
  getResignations(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number, 
    @Query('take', new DefaultValuePipe(0), ParseIntPipe) take?: number
  ) {
    skip = skip || undefined
    take = take || undefined
    return this.resignationService.getResignations({skip, take})
  }

  @Patch('/:id')
  updateResignationById(
    @GetEmployee('id') employeeId: number, 
    @Param('id', ParseIntPipe) resignationId: number, 
    @Body() dto: EditResignationDto
    ) {
    return this.resignationService.updateResignationById(employeeId, resignationId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  deleteResignationById(
    @GetEmployee('admin') isAdmin: boolean, 
    @GetEmployee('id') employeeId: number, 
    @Param('id', ParseIntPipe) resignationId: number,
  ) {
    return this.resignationService.deleteResignationById(isAdmin, employeeId, resignationId);
  }
}
