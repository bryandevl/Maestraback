// src/dto/vrc-obtenergestioncliente.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class ObtenerDetalleGestionDto {
  @IsString()
  dni: string;

  @IsOptional()
  @IsString()
  num_cta?: string;

  @IsString()
  campania: string;
}