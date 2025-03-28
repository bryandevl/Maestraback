import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('BQ_UserLog') // Asegúrate de que el nombre de la tabla sea correcto
export class UserLog {
  @PrimaryColumn({ type: 'varchar', length: 50 }) // Define "correo" como clave primaria
  correo: string;

  @Column({ type: 'varchar', length: 350 })
  pass: string;

  @Column({ type: 'int', nullable: true })
  caducida: number;

  @Column({ type: 'datetime', nullable: true })
  fecha_registra: Date;

  @Column({ type: 'datetime', nullable: true })
  fecha_caduce: Date;
}
