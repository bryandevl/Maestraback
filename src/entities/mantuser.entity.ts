import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'SEG_Usuario_Result' }) // Nombre arbitrario para esta clase
export class UserResult {
  @PrimaryGeneratedColumn()
  codusuario: number;

  @Column()
  login3: string;

  @Column()
  nombreusuario: string;

  @Column()
  bloqueado: string;

  @Column()
  sanulad: string;
}
