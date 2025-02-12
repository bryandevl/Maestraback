// Entity (Opcional, ya que es un SP, pero útil si necesitas mapear la tabla)
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'SP_CR_ObtenerColumnaMask_VRC' })
export class ColumnaMask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  campania: string;

  @Column()
  columna: string;

  @Column()
  etiqueta: string;

  @Column()
  celda: string;

  @Column()
  valor: string;

  @Column()
  estado: string;
}