import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { DetalleDeudaCltEntity } from 'src/entities/vrc-detalledeuda.entity';
import { ObtenerDetalleDeudaDto } from 'src/dtos/vrc-obtenerdetalledeuda.dto';

@Injectable()
export class DetalleDeudaCltService {
    constructor(
        @InjectRepository(DetalleDeudaCltEntity)
        private readonly detalleDeudaRepository: Repository<DetalleDeudaCltEntity>,
    ){}

    async obtenerDetalleDeuda(dto: ObtenerDetalleDeudaDto): Promise<any> {
        const { campania, dni, num_cta } = dto;
        try {
            const resultados = await this.detalleDeudaRepository.query(
                `EXEC SP_CR_ObtenerDetalleDeudaClt_VRC @campania = @0, @dni = @1, @cta = @2`,
                [campania, dni, num_cta || null],
            );

            return resultados;
        } catch (error) {
            // Manejo de errores con logs detallados
            console.error('Error al ejecutar el procedimiento almacenado:', error.message);
            throw new Error('No se pudieron obtener los datos. Verifique los parámetros ingresados.');
        }
    }

}