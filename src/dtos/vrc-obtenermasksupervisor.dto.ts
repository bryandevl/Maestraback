// DTO (Data Transfer Object)
import { IsOptional, IsString } from 'class-validator';

export class ObtenerColumnaMaskDto {
    @IsString()
    campania: string;
}