import { IsOptional, IsString } from 'class-validator';

export class ObtenerDetalleDeudaDto {
  @IsString()
  dni: string;

  @IsOptional()
  @IsString()
  num_cta?: string;

  @IsString()
  campania: string;
}
