// src/services/ivr-clt.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,DataSource } from 'typeorm';
import { ObtenerIvrMasivoDto } from 'src/dtos/vrc-obtenerivrmasivo.dto';
import { ObtenerIvrMasivoClt } from 'src/entities/vrc-ivrmasivo.entity';

@Injectable()
export class ObtenerIvrMasivoCltService {
  constructor(
    @InjectRepository(ObtenerIvrMasivoClt)
    private readonly ivrmasivoCltRepository: Repository<ObtenerIvrMasivoClt>,
  ) {}


  async obtenerDatosIvr(dto: ObtenerIvrMasivoDto): Promise<any[]> {
    const { dni, num_cta } = dto;
  
    // Realizar la consulta a la base de datos
    const resultados = await this.ivrmasivoCltRepository.query(
      `EXEC [dbo].[SP_CR_ObtenerIVRClt_VRC] @dni = '${dni}'`,
      [dni],
    );
  
    // Formatear los resultados para ajustar FEC_GESTION y HOR_GESTION
    return resultados.map((resultado: any) => {
      return {
        ...resultado,
        FEC_GESTION: resultado.FEC_GESTION
          ? new Date(resultado.FEC_GESTION).toISOString().split('T')[0] // Solo la fecha
          : null,
        HOR_GESTION: resultado.HOR_GESTION
          ? new Date(resultado.HOR_GESTION).toTimeString().split(' ')[0] // Solo la hora
          : null,
      };
    });
  }
}
