import {
  IsOptional,
  IsString,
} from 'class-validator';


export class EditSalaryDto {

  @IsString()
  @IsOptional()
  basicSalary?: string;

  @IsString()
  @IsOptional()
  bankName?: string;

  @IsString()
  @IsOptional()
  accountNumber?: string;

  @IsString()
  @IsOptional()
  accountName?: string;
}