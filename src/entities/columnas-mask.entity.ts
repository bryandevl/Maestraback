// src/entities/columnas-mask.entity.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('T_Columnas_mask')
export class ColumnasMask2 {
  @PrimaryColumn()
  campaign_id: string;

  @Column()
  columna: string;

  @Column()
  columna_etiqueta: string;


  @Column()
  celda: string;

  @Column()
  valor: string;

  @Column()
  estado: string;
}
