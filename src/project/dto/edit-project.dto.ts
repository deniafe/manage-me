import {
  IsDate,
  IsString,
  IsInt,
  IsOptional,
  IsEnum,
  IsArray, 
  ValidateNested, 
  ArrayMinSize, 
  ArrayMaxSize
} from 'class-validator';
import { Type } from 'class-transformer';
import { Status, EmployeeParam } from './'

export class EditProjectDto {

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsInt()
  @IsOptional()
  estimatedCost?: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  estimatedTime?: Date;


  @IsString()
  @IsOptional()
  remark?: string;

  @IsEnum(Status,  { each: true })
  @IsOptional()
  status?: Status

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(1)
  @Type(() => EmployeeParam)
  @IsOptional()
  employees?: EmployeeParam[]

}