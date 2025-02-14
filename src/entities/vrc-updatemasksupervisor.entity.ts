//src/entities/vrc-updatemasksupervisor.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'SP_CR_ActualizarColumnaMask_VRC'})
export class UpdateColumnMask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  campaign_id: string;

  @Column()
  columna_etiqueta: string;

  @Column()
  celda: string;

  @Column()
  valor: string;

  @Column()
  estado: string;
}
