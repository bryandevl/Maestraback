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


   async obtenerDatosIvr(dto: ObtenerIvrMasivoDto): Promise<ObtenerIvrMasivoClt[]> {
      const { dni, num_cta } = dto;
      return await this.ivrmasivoCltRepository.query(
        `EXEC [dbo].[SP_CR_ObtenerIVRClt_VRC] @dni = '${dni}', @cta = ${num_cta ? `'${num_cta}'` : 'NULL'}`,
        [dni, num_cta || null],
      );
    }
}
