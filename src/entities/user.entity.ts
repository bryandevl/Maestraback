import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'codidenest' })
  codidenest: number;

  @Column()
  sistema: string;

  @Column({ name: 'idusuario' })
  idUsuario: number;

  @Column({ name: 'codusuario' })
  codUsuario: string;

  @Column({ name: 'SbLoqueado' })
  bloqueado: string;

  @Column({ name: 'FECHA_LOGEO', type: 'datetime' })
  fechaLogeo: Date;

  @Column({ name: 'NombresUsuario' })
  nombresUsuario: string;

  @Column({ name: 'CEmpresa' })
  cEmpresa: string;

  @Column({ name: 'Perfil' })
  perfil: string;

  @Column({ name: 'nIntentos' })
  intentos: number;

  @Column({ name: 'nDiasRestantes' })
  nDiasRestantes: number;

  @Column({ name: 'lSolicitaCambio' })
  solicitaCambio: number;
}