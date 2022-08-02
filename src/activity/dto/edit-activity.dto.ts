import {
  IsDate,
  IsOptional,
  IsArray, 
} from 'class-validator';
import { Type } from 'class-transformer';

export class EditActivityDto {

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  in?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  out?: Date;

  @IsArray()
  @IsOptional()
  tasksForToday?: string[]

  @IsArray()
  @IsOptional()
  accomplishments?: string[]

  @IsArray()
  @IsOptional()
  challenges?: string[]

  @IsArray()
  @IsOptional()
  tasksForTomorrow?: string[]

}