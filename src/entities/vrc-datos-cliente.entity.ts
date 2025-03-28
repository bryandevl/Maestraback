// src/entities/vrc-datos-cliente.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'SP_VRC_DatosCliente' })
export class vrcDatosClienteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dni: string; 

    @Column()
    campania: string;
}