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

  async obtenerDatosPorCampania(dto: ObtenerDatosAdicionalesCltDto): Promise<any> {
    const { campania, dni, num_cta } = dto;
    try {
    const resultados = await this.datosAdicionalesRepository.query(
      `EXEC SP_CR_ObtenerDatosPorCampaña_VRC @campania = @0, @dni = @1, @cta = @2`,
      [campania, dni, num_cta || null],
    );

    return resultados[0];
    } catch (error) {
      // Manejo de errores con logs detallados
      console.error('Error al ejecutar el procedimiento almacenado:', error.message);
      throw new Error('No se pudieron obtener los datos. Verifique los parámetros ingresados.');
    }
  }
}
