import { IsOptional, IsString } from 'class-validator';

export class ObtenerDatosAdicionalesCltDto {
  @IsString()
  dni: string;

  @IsOptional()
  @IsString()
  num_cta?: string;

  @IsString()
  campania: string;
}
