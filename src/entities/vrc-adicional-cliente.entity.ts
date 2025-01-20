import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'SP_CR_ObtenerDatosPorCampaña_VRC' })
export class DatosAdicionalesCltEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dni: string; 
    
    @Column()
    num_cta?: string;

    @Column()
    campania: string;
}
