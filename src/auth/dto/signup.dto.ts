import {
  IsEmail,
  IsDate,
  IsNotEmpty,
  IsString,
  IsOptional,
  Length
} from 'class-validator';
import { Type } from 'class-transformer';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dob?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dateOfJoining?: Date;

  @IsOptional()
  @IsDate()
  terminateDate?: Date; 

  @IsString()
  @IsOptional()
  @Length(10, 13)
  phone?: string;

  @IsString()
  @IsOptional()
  photo?: string;

}