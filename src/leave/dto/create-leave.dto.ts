import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum LeaveStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export enum LeaveType {
  SICK = 'SICK',
  CASUAL = 'CASUAL',
  MATERNITY = 'MATERNITY',
  PATERNITY = 'PATERNITY',
  BEREAVEMENT = 'BEREAVEMENT',
  COMPENSATORY = 'COMPENSATORY',
  SABBATICAL = 'SABBATICAL',
  UNPAID = 'UNPAID',
}

export class CreateLeaveDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  fromDate: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  toDate: Date;

  @IsString()
  @IsNotEmpty()
  reasonForLeave: string;

  @IsEnum(LeaveType)
  @IsOptional()
  type?: LeaveType
}