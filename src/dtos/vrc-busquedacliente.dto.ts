import { IsOptional, IsString } from 'class-validator';

export class BusquedaClienteDto {
  @IsString()
  dni: string;

  @IsString()
  campania: string;
}
