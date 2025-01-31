import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBQCourierDto {
  @IsNotEmpty()
  @IsString()
  CAMPANIA: string;

  @IsNotEmpty()
  @IsString()
  USUARIO: string;
}