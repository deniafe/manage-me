import {
  IsOptional,
  IsString
} from 'class-validator';

export class EditGrievanceDto {

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  details?: string;
}