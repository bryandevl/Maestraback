import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { vrcDatosClienteEntity } from 'src/entities/vrc-datos-cliente.entity';
import { BusquedaClienteDto } from 'src/dtos/vrc-busquedacliente.dto';

@Injectable()
export class vrcResultadoClienteService {
    constructor(
        @InjectRepository(vrcDatosClienteEntity)
        private readonly datosClienteRepository: Repository<vrcDatosClienteEntity>,
    ) {}
    async obtenerDatosCliente(dto: BusquedaClienteDto): Promise<any> {
        const { dni, campania } = dto;
        try {
            const resultados = await this.datosClienteRepository.query(
                `EXEC SP_VRC_DatosCliente @dni = @0, @campania = @1`,
                [dni, campania],
            );
            return resultados[0];
        } catch (error) {
            console.error('Error al ejecutar el procedimiento almacenado:', error.message);
            throw new Error('No se pudieron obtener los datos. Verifique los parámetros ingresados.');
        }
    }
}