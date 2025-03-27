import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'SEG_Usuario' }) // Asegúrate de que el nombre coincida con la tabla en la BD
export class UsuarioOmnicanal {
  @PrimaryGeneratedColumn()
  n_codi_usua: number;

  @Column()
  login: string;

  @Column()
  password: string;
}
