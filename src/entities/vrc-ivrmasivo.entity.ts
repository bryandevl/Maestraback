import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ObtenerIvrMasivoClt')
export class ObtenerIvrMasivoClt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    documento: string;

    @Column()
    cuenta: string;

    @Column()
    campaign_id: string;

    @Column({type: 'date'})
    fec_gestion: Date;

    @Column({ type: 'time' })
    hor_gestion: string;

    @Column()
    status: string;
    
}