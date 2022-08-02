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
import { Employee } from '@prisma/client';
import { GetEmployee } from '../employee/decorator';
import { AdminGuard, JwtGuard } from '../guards';
import { CreateProjectDto, EditProjectDto } from './dto';
import { ProjectService } from './project.service';

@UseGuards(JwtGuard)
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}
  
  @Get('/:id')
  getProjectById( 
    @GetEmployee() employee: Employee, 
    @Param('id', ParseIntPipe) projectId: number, 
    ) {
    return this.projectService.getProjectById(employee, projectId)
  }

  @UseGuards(AdminGuard)
  @Post('/')
  createProject( @Body() dto: CreateProjectDto ) { 
    return this.projectService.createProject(dto)
  }

  @UseGuards(AdminGuard)
  @Get('/')
  getProjects(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number, 
    @Query('take', new DefaultValuePipe(0), ParseIntPipe) take?: number
  ) {
    skip = skip || undefined
    take = take || undefined
    return this.projectService.getProjects({skip, take})
  }

  @UseGuards(AdminGuard)
  @Patch('/:id')
  updateProjectById(
    @Param('id', ParseIntPipe) projectId: number, 
    @Body() dto: EditProjectDto
    ) {
    return this.projectService.updateProjectById(projectId, dto);
  }

  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  deleteProjectById(
    @Param('id', ParseIntPipe) projectId: number,
  ) {
    return this.projectService.deleteProjectById(
      projectId,
    );
  }
}
