import { IsOptional, IsString } from 'class-validator';

export class ObtenerSmsMasivoCltDto {
  @IsString()
  dni: string;

  @IsOptional()
  @IsString()
  num_cta?: string;
}
