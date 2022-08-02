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
import { CreateActivityDto, EditActivityDto } from './dto';
import { ActivityService } from './activity.service';

@UseGuards(JwtGuard)
@Controller('activities')
export class ActivityController {
  constructor(private activityService: ActivityService) {}
  
  @Get('/:id')
  getActivityById( 
    @GetEmployee('admin') isAdmin: boolean, 
    @GetEmployee('id') employeeId: number, 
    @Param('id', ParseIntPipe) activityId: number, 
    ) {
    return this.activityService.getActivityById(isAdmin, employeeId, activityId)
  }

  @Post('/')
  createActivity( 
    @GetEmployee('id') employeeId: number, 
    @Body() dto: CreateActivityDto,
   ) { 
    return this.activityService.createActivity(employeeId, dto)
  }

  @UseGuards(AdminGuard)
  @Get('/')
  getActivities(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number, 
    @Query('take', new DefaultValuePipe(0), ParseIntPipe) take?: number
  ) {
    skip = skip || undefined
    take = take || undefined
    return this.activityService.getActivities({skip, take})
  }

  @Patch('/:id')
  updateActivityById(
    @GetEmployee('admin') isAdmin: boolean, 
    @GetEmployee('id') employeeId: number, 
    @Param('id', ParseIntPipe) activityId: number, 
    @Body() dto: EditActivityDto
    ) {
    return this.activityService.updateActivityById(isAdmin, employeeId, activityId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  deleteActivityById(
    @GetEmployee('admin') isAdmin: boolean, 
    @GetEmployee('id') employeeId: number, 
    @Param('id', ParseIntPipe) activityId: number,
  ) {
    return this.activityService.deleteActivityById(isAdmin, employeeId, activityId);
  }
}
