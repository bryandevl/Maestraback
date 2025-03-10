// src/entities/vrc-mascaraformato.entity.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('T_Mascaraformato')
export class MascaraFormato {
    @PrimaryColumn()
    campaign_id: string;

    @Column()
    celda: string;

    @Column()
    bgColor: string;

    @Column()
    txtColor: string;
}