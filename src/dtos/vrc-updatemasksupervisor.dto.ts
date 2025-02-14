// src/dtos/vrc-updatemasksupervisor.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateColumnMaskDto {
  @IsNotEmpty()
  @IsString()
  campania: string;

  @IsNotEmpty()
  @IsString()
  etiqueta: string;

  @IsString()
  celda: string;

  @IsString()
  valor: string;

  @IsString()
  estado: string;
}
