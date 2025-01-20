// src/entities/fotogestion.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'SP_CR_ObtenerGestionClt_VRC'})
export class FotogestionesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  FEC_GESTION: Date;

  @Column({ type: 'time' })
  HOR_GESTION: string;

  @Column()
  MARCACION: string;

  @Column()
  ESTADO: string;

  @Column()
  COD_GESTOR: string;

  @Column()
  NUM_CTA: string;

  @Column()
  TELEFONO: string;

  @Column()
  ORIGEN: string;

  @Column()
  FECHA_PDP: string;

  @Column()
  MONTO_PDP: string;

  @Column()
  COMENTARIO: string;
}