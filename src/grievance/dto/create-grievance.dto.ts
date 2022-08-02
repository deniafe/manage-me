import {
  IsNotEmpty,
  IsString
} from 'class-validator';

export class CreateGrievanceDto {

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  details: string;
}