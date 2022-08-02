import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum'; 
import { AppModule } from '../src/app.module'; 
import { PrismaService } from '../src/prisma/prisma.service';
import { Report, Auth, Employee, Project, Salary, Activity, Leave, Grievance, Resignation } from './test-files'

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService; 
 
  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333); 

    prisma = app.get(PrismaService);  
    await prisma.cleanDb();
    prisma.createAdmin();  
    pactum.request.setBaseUrl(
      'http://localhost:3333', 
    );
  }); 

  afterAll(() => { 
    app.close();
  });

  describe('Auth', () => Auth(pactum));  

  describe('Employee', () => Employee(pactum)); 
  
  describe('Project', () => Project(pactum));

  describe('Salary', () => Salary(pactum));

  describe('Activity', () => Activity(pactum));
  
  describe('Leave', () => Leave(pactum));

  describe('Grievance', () => Grievance(pactum));

  describe('Resignation', () => Resignation(pactum))

  describe('Report', () => Report(pactum))
 
});