import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ObtenerValoresDto {
  @IsString()
  campaign_id: string;

  @IsNotEmpty()
  periodo: string;

  @IsNotEmpty()
  dni: string;

  @IsOptional()
  num_cta?: string;
}