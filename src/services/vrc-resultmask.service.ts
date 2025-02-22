import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ColumnasMask2 } from 'src/entities/columnas-mask.entity';

@Injectable()
export class VrcResultMaskService {
  constructor(
    @InjectRepository(ColumnasMask2)
    private readonly resultMaskRepository: Repository<ColumnasMask2>,
    private readonly dataSource: DataSource,
  ) {}

  // Obtiene las columnas configuradas en T_Columnas_mask para una campaña específica.
  async obtenerResultadoMascara(campaign_id: string): Promise<any[]> {
     // 1️⃣ OBTENER COLUMNAS DE T_Columnas_mask
      const columnas = await this.resultMaskRepository
      .createQueryBuilder('columnas')
      .select(['columnas.celda', 'columnas.columna_etiqueta', 'columnas.valor', 'columnas.columna']) // Incluir columna para hacer el match
      .where('columnas.campaign_id = :campaign_id', { campaign_id })
      .andWhere('columnas.estado = :estado', { estado: 'S' })
      .getRawMany();

    if (!columnas.length) {
      console.warn(`No se encontraron datos para la campaña: ${campaign_id}`);
      return [];
    }

    // 2️⃣ CREAR QUERY DINÁMICA PARA FR_MASCARA
    const columnasSelect = columnas.map(col => `[${col.columnas_columna}]`).join(', ');
    const query = `SELECT ${columnasSelect} FROM FR_MASCARA WHERE campaign_id = @0`;
    const rawData = await this.dataSource.query(query, [campaign_id]);

    // Si no hay datos en FR_MASCARA, devolver valores null
    const rowData = rawData.length ? rawData[0] : {};

    // 3️⃣ FORMATEAR RESPUESTA
    const resultados = columnas.map(col => ({
      campaign_id,
      columna_cabecera: col.columnas_columna_etiqueta,
      celda: col.columnas_celda,
      valor: col.columnas_valor,
      resultado: rowData[col.columnas_columna] ?? null, // Si no hay dato, será null
    }));

    return resultados;
  }
}