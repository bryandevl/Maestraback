import { IsOptional, IsString } from 'class-validator';

export class ObtenerDatosCltDto {
  @IsString()
  dni: string;

  @IsOptional()
  @IsString()
  num_cta?: string;

  @IsString()
  campania: string;
}
