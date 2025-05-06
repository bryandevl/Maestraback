import { IsNotEmpty, IsOptional, IsString, IsDateString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class HoraPosicionDto {
  @ApiProperty({
    description: 'Fecha de inicio para la consulta en formato YYYY-MM-DD',
    example: '2025-03-01',
    required: true,
  })
  @IsNotEmpty({ message: 'La fecha de inicio es requerida' })
  @IsDateString({}, { message: 'El formato de la fecha de inicio debe ser YYYY-MM-DD' })
  fechaInicio: string;

  @ApiProperty({
    description: 'Fecha de fin para la consulta en formato YYYY-MM-DD',
    example: '2025-03-31',
    required: true,
  })
  @IsNotEmpty({ message: 'La fecha de fin es requerida' })
  @IsDateString({}, { message: 'El formato de la fecha de fin debe ser YYYY-MM-DD' })
  fechaFin: string;

  @ApiProperty({
    description: 'Período para la consulta en formato YYYYMM',
    example: '202503',
    required: true,
  })


  @ApiProperty({
    description: 'IDs de las campañas para la consulta',
    example: ['BFBT0A', 'BFBT1A'],
    required: true,
    isArray: true,
    type: [String],
  })
  @IsNotEmpty({ message: 'Al menos un ID de campaña es requerido' })
  @IsArray({ message: 'Las campañas deben estar en formato de arreglo' })
  campania: string[];

  @ApiProperty({
    description: 'Formato de salida (txt o json)',
    example: 'txt',
    required: false,
    default: 'txt',
  })
  @IsOptional()
  @IsString({ message: 'El formato debe ser un string' })
  formato?: string;
}