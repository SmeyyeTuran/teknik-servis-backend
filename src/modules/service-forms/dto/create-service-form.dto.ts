import { IsString, IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PartDto {
  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  total: number;
}

export class CreateServiceFormDto {
  @IsString()
  requestId: string;

  @IsString()
  diagnosis: string;

  @IsString()
  actionsTaken: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartDto)
  parts: PartDto[];

  @IsNumber()
  laborCost: number;

  @IsNumber()
  partsCost: number;

  @IsNumber()
  total: number;

  @IsOptional()
  @IsString()
  notes?: string;
}