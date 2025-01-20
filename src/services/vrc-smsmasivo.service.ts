// Service
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObtenerSmsMasivoClt } from 'src/entities/vrc-smsmasivo.entity';
import { ObtenerSmsMasivoCltDto } from 'src/dtos/vrc-obtenersmsmasivo.dto';

@Injectable()
export class ObtenerSmsMasivoCltService {
  constructor(
    @InjectRepository(ObtenerSmsMasivoClt)
    private readonly smsmasivoCltRepository: Repository<ObtenerSmsMasivoClt>,
  ) {}

  async obtenerDatosSms(dto: ObtenerSmsMasivoCltDto): Promise<ObtenerSmsMasivoClt[]> {
    const { dni, num_cta } = dto;
    return await this.smsmasivoCltRepository.query(
      `EXEC [dbo].[SP_CR_ObtenerSMSmasivoClt_VRC] @dni = '${dni}', @cta = ${num_cta ? `'${num_cta}'` : 'NULL'}`,
      [dni, num_cta || null],
    );
  }
}