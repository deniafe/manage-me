import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsArray, 
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateActivityDto {

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date?: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  in: Date;

  @IsArray()
  @IsOptional()
  tasksForToday?: string[]

}