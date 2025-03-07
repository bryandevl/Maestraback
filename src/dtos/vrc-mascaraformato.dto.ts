// src/dtos/vrc-mascaraformato.dto.ts
import { IsString } from 'class-validator';

export class MascaraFormatoDto {
    @IsString()
    campaign_id: string;

    @IsString()
    celda: string;

    @IsString()
    bgColor: string;

    @IsString()
    txtColor: string;
}
