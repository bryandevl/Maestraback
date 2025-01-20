import { IsOptional, IsString } from 'class-validator';

export class ObtenerWspmasivoCltDto {
  @IsString()
  dni: string;

  @IsOptional()
  @IsString()
  num_cta?: string;
}
