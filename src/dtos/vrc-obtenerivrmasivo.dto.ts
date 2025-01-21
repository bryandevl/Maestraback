// src/dto/vrc-obtenerivrmasivo.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class ObtenerIvrMasivoDto {
  @IsString()
  dni: string;

  @IsOptional()
  @IsString()
  num_cta?: string;
}