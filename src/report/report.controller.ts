import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard, JwtGuard } from '../guards';
import { ReportService } from './report.service';

@UseGuards(JwtGuard)
@Controller('reports')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @UseGuards(AdminGuard)
  @Get('/leave')
  leaveReport() {
    return this.reportService.leaveReport()
  }

  @Get('/project')
  projectReport() {
    return this.reportService.projectReport()
  }

  @Get('/activity')
  activityReport() {
    return this.reportService.activityReport()
  }

}
