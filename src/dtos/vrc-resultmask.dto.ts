import { IsString } from 'class-validator';

export class ObtenerValoresDto {
  @IsString()
  campania_id: string;
}
