import {
  IsNotEmpty,
  IsString,
  IsInt
} from 'class-validator';


export class CreateSalaryDto {

  @IsString()
  @IsNotEmpty()
  basicSalary: string;

  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  accountName: string;

  @IsInt()
  @IsNotEmpty()
  employeeId: number;

}