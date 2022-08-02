import {
  IsOptional,
  IsString,
  IsDate
} from 'class-validator';
import { Type } from 'class-transformer';

export class EditResignationDto {

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  details?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  notice?: Date;
}