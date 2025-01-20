import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ObtenerWspmasivoClt')
export class ObtenerWspmasivoClt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  documento: string;

  @Column()
  cuenta: string;

  @Column({type: 'date'})
  fecha: Date;

  @Column()
  telefono: string;

  @Column()
  mensaje: string;
}