import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  IsDate,
  Length,
  IsDefined,
  IsObject,
  ValidateNested,
  IsNotEmptyObject,
  IsArray, 
  ArrayMinSize, 
  ArrayMaxSize
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}

export class WorkExperiencesDto {
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
  companyName: string;

  @IsString()
  @IsNotEmpty()
  designation: string;
}

export class EducationDto {
  @IsString()
  @IsNotEmpty()
  school: string;

  @IsString()
  @IsNotEmpty()
  degree: string;

  @IsString()
  @IsNotEmpty()
  grade: string;

  @IsString()
  @IsNotEmpty()
  year: string;
}

export class EditEmployeeDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  @IsOptional()
  gender?: string;

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

  @IsInt()
  @IsOptional()
  projectId?: number;

  @IsOptional()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(1)
  @Type(() => WorkExperiencesDto)
  @IsOptional()
  workExperiences?: WorkExperiencesDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(1)
  @Type(() => EducationDto)
  @IsOptional()
  education?: EducationDto[]
}