import { IsNotEmpty, IsString } from 'class-validator';

export class UserListDto {
  @IsNotEmpty({ message: 'El campo codusuario no puede estar vacío' })
  @IsString({ message: 'El campo codusuario debe ser una cadena de texto' })
  codusuario: string;
}
