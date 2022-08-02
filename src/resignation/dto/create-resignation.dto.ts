import {
  IsNotEmpty,
  IsString,
  IsDate
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateResignationDto {

  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsNotEmpty()
  @IsString()
  details: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  notice: Date;
}