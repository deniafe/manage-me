import {
  IsDate,
  IsNotEmpty,
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

export enum Status {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class EmployeeParam {
  @IsInt()
  @IsNotEmpty()
  id: number
}

export class CreateProjectDto {

  @IsString()
  @IsNotEmpty()
  title: string;

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

  @IsEnum(Status)
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