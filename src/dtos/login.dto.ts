import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiPropertyOptional({ description: 'El login o nombre de usuario', example: 'administrador' })
  login3: string;

  @IsString()
  @ApiPropertyOptional({ description: 'La contraseña del usuario', example: 'admin123' })
  password: string;

  @IsString()
  @IsOptional() // Marca cEmpresa como opcional
  @MinLength(1) // Si se proporciona, debe tener al menos 1 carácter
  @ApiPropertyOptional({ description: 'El código de la empresa, por defecto será "01"', example: '01' })
  cEmpresa?: string; // Opcional, con soporte para valores por defecto
}
