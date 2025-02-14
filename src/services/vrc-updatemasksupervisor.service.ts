//src/services/vrc-updatemasksupervisor.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateColumnMaskDto } from 'src/dtos/vrc-updatemasksupervisor.dto';
import { UpdateColumnMask } from 'src/entities/vrc-updatemasksupervisor.entity';

@Injectable()
export class UpdateColumnMaskService {
  constructor(
    @InjectRepository(UpdateColumnMask)
    private readonly columnMaskRepository: Repository<UpdateColumnMask>,
  ) {}

  async updateColumnMask(dto: UpdateColumnMaskDto): Promise<string> {
    const { campania, etiqueta, celda, valor, estado } = dto;

    try {
      await this.columnMaskRepository.query(
        `EXEC SP_CR_ActualizarColumnaMask_VRC 
        @campania = '${campania}', @etiqueta = '${etiqueta}', @celda = '${celda}', @valor = '${valor}', @estado = '${estado}'`,
        [campania, etiqueta, celda, valor, estado],
      );

      return 'Datos actualizados correctamente';
    } catch (error) {
      console.error('Error en el procedimiento almacenado:', error);
      throw new Error('No se pudo actualizar la columna en la base de datos');
    }
  }
}
