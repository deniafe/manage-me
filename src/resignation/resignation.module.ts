import { Module } from '@nestjs/common';
import { ResignationController } from './resignation.controller';
import { ResignationService } from './resignation.service';

@Module({
  controllers: [ResignationController],
  providers: [ResignationService]
})
export class ResignationModule {}
