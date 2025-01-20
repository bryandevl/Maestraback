import { Column, Entity, JoinColumn,  PrimaryGeneratedColumn } from 'typeorm';
//import { User } from './user.entity';
//import { Pedido } from './pedido.entity';

@Entity({ name: 'DA_V_vicidial_campaings' })
export class Campaign {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    campaign_id: string;

    @Column()
    campaign_name: string;

}
