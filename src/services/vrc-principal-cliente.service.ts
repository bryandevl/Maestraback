// src/client/services/client.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObtenerDatosCltDto } from '../dtos/vrc-obtenercliente.dto';
import { MainClientes } from '../entities/vrc-principal-cliente.entity';
import { Connection } from 'typeorm';

@Injectable()
export class MainClientService {
constructor(private readonly connection: Connection) {}

async obtenerDatosClt(dto: ObtenerDatosCltDto): Promise<MainClientes[]> {
    const { dni, num_cta, campania } = dto;

    const query = `
    EXEC [SP_CR_ObtenerDatosClt_VRC] @dni = '${dni}', @cta = ${num_cta ? `'${num_cta}'` : 'NULL'}, @campania = '${campania}'
    `;
    
    const result = await this.connection.query(query);

    return result[0]; // Aquí puedes mapear el resultado si es necesario
    }
}
