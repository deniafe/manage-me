import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import {LeaveType} from './'

export class EditLeaveDto {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  fromDate?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  toDate?: Date;

  @IsString()
  @IsOptional()
  reasonForLeave?: string;

  @IsEnum(LeaveType)
  @IsOptional()
  type?: LeaveType
}