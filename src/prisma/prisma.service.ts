import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        }
      }
    })
  }

  cleanDb() {
    return this.$transaction([
      this.salary.deleteMany(),
      this.resignation.deleteMany(),
      this.project.deleteMany(),
      this.activity.deleteMany(),
      this.grievance.deleteMany(),
      this.leaveApplication.deleteMany(),
      this.education.deleteMany(),
      this.address.deleteMany(),
      this.workExperience.deleteMany(),
      this.employee.deleteMany(),
    ]);
  }

  createAdmin() {
    return this.$transaction([
      this.employee.create({
        data: {
          email: 'admin@tonote.com',
          firstName: 'Admin',
          lastName: 'Tonote',
          middleName: 'Gettonote',
          gender: 'female',
          dob: new Date(1657521635030),
          dateOfJoining: new Date(1657521635030),
          terminateDate: null,
          phone: '08199243562',
          photo: 'https://www.youtube.com/',
          admin: true,
          hash: '$argon2id$v=19$m=4096,t=3,p=1$5MDhkoDaS/taHir3qKfSnw$/XuxqJ51jLVnkvJ+uhy0FTjycQUH/XI0PdqGXJcFLsU',
        }
      })
    ]);
  }
}
