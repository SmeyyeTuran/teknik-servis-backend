import { IsString, IsOptional } from 'class-validator';

export class UpdateRequestDto {
  @IsString()
  @IsOptional()
  deviceType?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  problemDescription?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  additionalNotes?: string;
}