import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadExcelDto {
  @ApiProperty({
    description: 'ID de la campaña',
    example: 'IBKPREV',
  })
  @IsNotEmpty()
  @IsString()
  campaign_id: string;

  @ApiProperty({
    description: 'ID de la lista',
    example: 'LIST123',
  })
  @IsNotEmpty()
  @IsString()
  list_id: string;
}
