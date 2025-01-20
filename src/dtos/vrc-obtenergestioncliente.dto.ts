// src/dto/vrc-obtenergestioncliente.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class ObtenerGestionDto {
  @IsString()
  dni: string;

  @IsOptional()
  @IsString()
  num_cta?: string;

  @IsString()
  campania: string;
}