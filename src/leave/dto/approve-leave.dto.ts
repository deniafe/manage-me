import {
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import {LeaveStatus} from './'

export class ApproveLeaveDto {

  @IsEnum(LeaveStatus)
  @IsNotEmpty()
  status: LeaveStatus
}