import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { PrismaModule } from './prisma/prisma.module';
import { SalaryModule } from './salary/salary.module';
import { ProjectModule } from './project/project.module';
import { LeaveModule } from './leave/leave.module';
import { ReportModule } from './report/report.module';
import { ResignationModule } from './resignation/resignation.module';
import { GrievanceModule } from './grievance/grievance.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    AuthModule, 
    EmployeeModule, 
    PrismaModule, 
    SalaryModule, 
    ProjectModule, 
    LeaveModule, 
    ReportModule, 
    ResignationModule, 
    GrievanceModule, 
    ActivityModule 
  ],
})
export class AppModule {}
