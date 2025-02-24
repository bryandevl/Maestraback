import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ColumnasMask2 } from 'src/entities/columnas-mask.entity';
import { ObtenerValoresDto } from 'src/dtos/vrc-resultmask.dto';

@Injectable()
export class VrcResultMaskService {
  constructor(
    @InjectRepository(ColumnasMask2)
    private readonly resultMaskRepository: Repository<ColumnasMask2>,
    private readonly dataSource: DataSource,
  ) {}

  // Obtiene las columnas configuradas en T_Columnas_mask para una campaña específica.
  async obtenerResultadoMascara(dto: ObtenerValoresDto) {
    let { campaign_id, periodo, dni, num_cta } = dto;

    // Si no se envía el periodo, se asigna el mes actual en formato YYYYMM
    if (!periodo) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Mes en formato 01, 02...
      periodo = `${year}${month}`;
    } 

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

    let query = `SELECT ${columnas.map(col => col.columnas_columna).join(', ')}
                FROM FR_MASCARA 
                WHERE campaign_id = '${campaign_id}' 
                AND periodo = '${periodo}' 
                AND cnum_documento = '${dni}'`;

    const parameters: any = { campaign_id, periodo, dni };

    if (num_cta) {
      query += ` AND cnum_cuenta = '${num_cta}' `;
      parameters.num_cta = num_cta;
    }

    const frMascaraData = await this.dataSource.query(query, parameters);

    if (!frMascaraData.length) {
      console.warn('No se encontraron datos en FR_MASCARA');
      return [];
    }

    return frMascaraData.map((registro, index) => {
      return columnas.map(col => {
        let valor = col.columnas_valor;

        if (index > 0) {
          const letra = valor.charAt(0);
          const numero = parseInt(valor.substring(1), 10);
          valor = `${letra}${numero + index}`;
        }

        return {
          campaign_id,
          columna_cabecera: col.columnas_columna_etiqueta,
          celda: col.columnas_celda,
          valor,
          resultado: registro[col.columnas_columna] ?? null,
          };
        });
      });
  }
}