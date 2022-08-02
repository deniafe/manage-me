import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}))
  await app.listen(3333);
}
bootstrap();


// * Daily activity report 

// Accounting for all progress of a project or a task, or for all activities accomplished and done within the day, a daily report is prepared by employees for submission to their supervisors. Usually daily report template contains space for details on how they spent their work day including their achievements and the challenges they encountered. Sometimes it also outlines the plans they have for the following day.

// Daily report enables the team manager to have an overview how the team’s project is progressing in terms of each team member’s individual tasks without having to talk to each one on a daily basis. Daily reports are much more cost-efficient than to have a daily conversation which may not be consistent.

// Daily status reports look into the day-to-day development of a project and to monitor whether is it complete according to plan or there is a delay for some reason. It is a useful tool to monitor if something implements smoothly or if there are certain factors which might affect performance.

// Lastly, daily reports may also serve as a basis for the employee’s performance evaluation at the end of each term. Using these reports, managers may be able to see how the employee manages his tasks and his time, his decision-making skills, and his leadership abilities. Aside from that, it may also serve as a reference for the employee’s training and development interventions.


// * Project report 
// The Project report is a simple report that displays the main details of the project and the employees involved in the project


// * Leave Report  
// Annual Leave balances are added in Leave Allowances page.

// Annual Leave Report shows each employee’s current leave balances as of date chosen.

// The formula for the Current Balance is as follows: Number of Worked Days( Leave allowance days/365 ) – Taken Days.

// Number of worked days will be calculated depending on Effective start date and Effective end dates. Effective start date can be employee’s hire date or opening balance date. If employee’s Hire Date is earlier than Opening Balance date, then the Opening Balance Date is going to be the Effective start date. If employee was hired after Opening balance date, then his Hire date will be taken as Effective start date.

// Effective end date is the date chosen from the date-picker on top of the report or Employee’s resignation date.