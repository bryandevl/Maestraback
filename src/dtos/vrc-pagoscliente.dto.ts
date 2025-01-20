// src/dto/vrc-pagoscliente.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class PagosClienteDto {
  @IsString()
  dni: string;

  @IsOptional()
  @IsString()
  num_cta?: string;

  @IsString()
  campania: string;

  @IsOptional()
  @IsString()
  periodo?: string;
}
