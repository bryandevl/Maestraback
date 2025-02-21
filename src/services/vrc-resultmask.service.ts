import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ColumnasMask2 } from 'src/entities/columnas-mask.entity';

@Injectable()
export class VrcResultMaskService {
constructor(
    @InjectRepository(ColumnasMask2)
    private readonly resultmaskRepository: Repository<ColumnasMask2>,
    private readonly dataSource: DataSource,
) {}

async obtenerResultadoMascara(campaign_id: string) {
    // 1. Obtener las asignaciones de la campaña 
    const asignaciones = await this.resultmaskRepository.find({ where: { campaign_id, estado: 'S' } });
    if (!asignaciones.length) return [];

    if (!asignaciones.length) {
        return [];
    }
    // 2. Obtener todas las columnas de `FR_MASCARA` dinámicamente
    const columnasFrMascara = await this.dataSource.query(`SELECT COLUMN_NAME as columnName FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'FR_MASCARA'`);

    const columnasDisponibles = columnasFrMascara.map((columna) => columna.columnName);

    // 3. Obtener datos dinámicamente
    const resultados = await Promise.all(
        asignaciones.map(async ({ columna, celda, columna_etiqueta }) => {
        let resultado = null;
        if (columnasDisponibles.includes(columna)) {
            const queryResult = await this.dataSource.query(
            `SELECT ${columna} AS valor FROM FR_MASCARA WHERE campaign_id = ${campaign_id}`,
            [campaign_id]
            );
            resultado = queryResult.length ? queryResult[0].valor : null;
        }

            return {
                campaign_id,
                columna_cabecera: columna_etiqueta,
                celda,
                valor: celda,
                resultado,
            };
        })
    );
        return resultados;
    }
}