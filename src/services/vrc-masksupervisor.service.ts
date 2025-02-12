// Service
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObtenerColumnaMaskDto } from 'src/dtos/vrc-obtenermasksupervisor.dto';
import { ColumnaMask } from 'src/entities/vrc-masksupervisor.entity';

@Injectable()
export class ColumnaMaskService {
  constructor(
    @InjectRepository(ColumnaMask)
    private readonly columnaMaskRepository: Repository<ColumnaMask>,
  ) {}

  async obtenerColumnasMask(dto: ObtenerColumnaMaskDto): Promise<any> {
    const { campania } = dto;
      try {
        const resultados = await this.columnaMaskRepository.query( 
          `EXEC SP_CR_ObtenerColumnaMask_VRC @campania = '${campania}'`,
          [campania],
        );

        return resultados;
      } catch (error) {
        // Manejo de errores con logs detallados
        console.error('Error al ejecutar el procedimiento almacenado:', error.message);
        throw new Error('No se pudieron obtener los datos. Verifique los parámetros ingresados.');
    }
  }
}