// src/services/gestion.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { FotogestionesEntity } from '../entities/vrc-fotogestion.entity';
import { ObtenerGestionDto } from 'src/dtos/vrc-obtenergestioncliente.dto';

@Injectable()
export class GestionService {
constructor(private readonly connection: Connection) {}

async obtenerGestion(dto: ObtenerGestionDto): Promise<FotogestionesEntity[]> {
    const { dni, num_cta, campania } = dto;

    const query = `
      EXEC [dbo].[SP_CR_ObtenerGestionClt_VRC]
      @dni = '${dni}',
      @cta = ${num_cta ? `'${num_cta}'` : 'NULL'},
      @campania = '${campania}'
    `;
    
    const result = await this.connection.query(query);

    // Convertir las fechas y horas al formato deseado
    return result.map((row) => ({
      ...row,
      FEC_GESTION: row.FEC_GESTION ? new Date(row.FEC_GESTION).toISOString().split('T')[0] : null, // Extrae la fecha en formato YYYY-MM-DD
      HOR_GESTION: row.HOR_GESTION ? new Date(row.HOR_GESTION).toTimeString().split(' ')[0] : null, // Extrae la hora en formato HH:mm:ss
    }));
  }
}