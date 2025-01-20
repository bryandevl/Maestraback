// src/entity/vrc-pagos.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'SP_CR_ObtenerPagosClt_VRC' })
export class PagosEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  num_cta: string;

  @Column()
  dni: string;

  @Column()
  tip_producto: string;

  @Column()
  campania: string;

  @Column('date')
  fec_pago: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column()
  periodo: string;
}