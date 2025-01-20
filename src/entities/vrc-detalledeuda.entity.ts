import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'SP_CR_ObtenerDetalleDeudaClt_VRC' })
export class DetalleDeudaCltEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dni: string; 
    
    @Column()
    num_cta?: string;

    @Column()
    campania: string;
}