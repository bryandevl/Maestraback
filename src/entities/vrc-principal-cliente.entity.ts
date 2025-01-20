// src/entity/vrc-principal-cliente.entity.ts
import { Column, Entity, JoinColumn,  PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'SP_CR_ObtenerDatosClt_VRC' })
export class MainClientes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dni: string;

    @Column()
    nombre_cliente: string;

    @Column()
    email: string;

    @Column()
    edad: number;

    @Column()
    direccion_cliente: string;

    @Column()
    departamento_cliente: string;

    @Column()
    provincia_cliente: string;

    @Column()
    distrito_cliente: string;

    @Column()
    campania: string;
}