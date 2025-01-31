import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('BQ_COURIER')
export class BqCourier {
    @PrimaryColumn()
    documento: string;

    @Column()
    cliente: string;

    @Column()
    direccion: string;

    @Column()
    departamento: string;

    @Column()
    provincia: string;

    @Column()
    distrito: string;

    @Column('decimal')
    deuda: number;

    @Column('decimal')
    cancelacion: number;

    @Column()
    campania: string;

    @Column()
    periodo: string;

    @Column('date')
    fecarga: Date;

    @Column()
    usuario: string;

    @Column('date')
    fecha_envio: Date;
}