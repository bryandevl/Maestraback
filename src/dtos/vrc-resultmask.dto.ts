import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ObtenerValoresDto {
  @IsString()
  campania_id: string;

  @IsNotEmpty()
  @IsString()
  periodo: string;

  @IsNotEmpty()
  @IsString()
  dni: string;

  @IsOptional()
  @IsString()
  num_cta?: string;
}