// src/services/pagos.service.ts
import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { PagosEntity } from '../entities/vrc-pagos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PagosClienteDto } from 'src/dtos/vrc-pagoscliente.dto';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(PagosEntity)
    private readonly pagosRepository: Repository<PagosEntity>,
  ) {}

  async getPagos(dto: PagosClienteDto): Promise<PagosEntity[]> {
    const { dni, num_cta, campania, periodo } = dto;

    // Asignar NULL si cta o periodo están vacíos
    const ctaValue = num_cta && num_cta !== '' ? num_cta : null;
    const periodoValue = periodo && periodo !== '' ? periodo : null;

    // Ejecutar la consulta con los parámetros
    return this.pagosRepository.query(
      `EXEC SP_CR_ObtenerPagosClt_VRC @dni = @0, @cta = @1, @campania = @2, @periodo = @3`,
      [dni, ctaValue, campania, periodoValue],
    );
  }
}