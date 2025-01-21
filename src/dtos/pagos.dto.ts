// src/fr-pagos/dto/upload.dto.ts
import { IsNotEmpty } from 'class-validator';

export class UploadDto {
  @IsNotEmpty()
  list_id: string;

  @IsNotEmpty()
  cCAMPAIGN_ID: string;
}
