// Service
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObtenerWspmasivoClt } from 'src/entities/vrc-wspmasivo.entity';
import { ObtenerWspmasivoCltDto } from 'src/dtos/vrc-obtenerwspmasivo.dto';

@Injectable()
export class ObtenerWspmasivoCltService {
  constructor(
    @InjectRepository(ObtenerWspmasivoClt)
    private readonly wspmasivoCltRepository: Repository<ObtenerWspmasivoClt>,
  ) {}

  async obtenerDatos(dto: ObtenerWspmasivoCltDto): Promise<ObtenerWspmasivoClt[]> {
    const { dni, num_cta } = dto;
    return await this.wspmasivoCltRepository.query(
      `EXEC [dbo].[SP_CR_ObtenerWspmasivoClt_VRC] @dni = '${dni}', @cta = ${num_cta ? `'${num_cta}'` : 'NULL'}`,
      [dni, num_cta || null],
    );
  }
}