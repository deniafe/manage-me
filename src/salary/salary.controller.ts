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
import { AdminGuard, JwtGuard } from '../guards';
import { CreateSalaryDto, EditSalaryDto } from './dto';
import { SalaryService } from './salary.service';


@UseGuards(JwtGuard)
@Controller('salaries')
export class SalaryController {
  constructor(private salaryService: SalaryService) {}
  
  @Get('/:id')
  getSalaryById( 
    @Param('id', ParseIntPipe) salaryId: number, 
    ) {
    return this.salaryService.getSalaryById(salaryId)
  }

  @UseGuards(AdminGuard)
  @Post('/')
  createSalary( @Body() dto: CreateSalaryDto ) { 
    return this.salaryService.createSalary(dto)
  }

  @UseGuards(AdminGuard)
  @Get('/')
  getSalaries(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number, 
    @Query('take', new DefaultValuePipe(0), ParseIntPipe) take?: number
  ) {
    skip = skip || undefined
    take = take || undefined
    return this.salaryService.getSalaries({skip, take})
  }

  @UseGuards(AdminGuard)
  @Patch('/:id')
  updateSalaryById(
    @Param('id', ParseIntPipe) salaryId: number, 
    @Body() dto: EditSalaryDto
    ) {
    return this.salaryService.updateSalaryById(salaryId, dto);
  }

  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  deleteSalaryById(
    @Param('id', ParseIntPipe) salaryId: number,
  ) {
    return this.salaryService.deleteSalaryById(
      salaryId,
    );
  }
}
