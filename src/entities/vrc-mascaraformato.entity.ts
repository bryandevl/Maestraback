// src/entities/vrc-mascaraformato.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('T_Mascaraformato')
export class MascaraFormato {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    campaign_id: string;

    @Column()
    celda: string;

    @Column()
    bgColor: string;

    @Column()
    txtColor: string;
}