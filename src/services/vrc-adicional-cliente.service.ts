import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { DatosAdicionalesCltEntity } from 'src/entities/vrc-adicional-cliente.entity';
import { ObtenerDatosAdicionalesCltDto } from 'src/dtos/vrc-obteneradicionaldatos.dto';

@Injectable()
export class DatosAdicionalCltService {
  constructor(
    @InjectRepository(DatosAdicionalesCltEntity)
    private readonly datosAdicionalesRepository: Repository<DatosAdicionalesCltEntity>,
  ) {}

  async obtenerDatosPorCampania(dto: ObtenerDatosAdicionalesCltDto): Promise<DatosAdicionalesCltEntity[]> {
    const { campania, dni, num_cta } = dto;

    return this.datosAdicionalesRepository.query(
      `EXEC SP_CR_ObtenerDatosPorCampaña_VRC @campania = ?, @dni = ?, @cta = ?`,
      [campania, dni, num_cta || null],
    );
  }
}