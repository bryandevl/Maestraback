import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnasMask2 } from '../entities/columnas-mask.entity';

@Injectable()
export class ColumnasMaskService2 {
  constructor(
    @InjectRepository(ColumnasMask2)
    private columnasMaskRepository: Repository<ColumnasMask2>,
  ) {}

  async getColumnasByCampaign(campaign_id: string): Promise<Record<string, { celda: string; valor: string }>> {
    // Usar QueryBuilder para tener más control sobre la consulta
    const columnas = await this.columnasMaskRepository
      .createQueryBuilder('columnas')
      .select(['columnas.celda', 'columnas.columna_etiqueta', 'columnas.valor']) // Incluir el campo "valor"
      .where('columnas.campaign_id = :campaign_id', { campaign_id })
      .andWhere('columnas.estado = :estado', { estado: 'S' })
      .getRawMany(); // Usar getRawMany para obtener los datos crudos

    console.log('Cantidad de filas recuperadas:', columnas.length);
    console.log('Datos recuperados:', columnas);

    // Verificar si hay datos
    if (!columnas || columnas.length === 0) {
      console.warn('No se encontraron datos para el campaign_id:', campaign_id);
      return {}; // Retornar un objeto vacío si no hay datos
    }

    // Crear un objeto para almacenar la combinación de columna_etiqueta, celda y valor
    const response: Record<string, { celda: string; valor: string }> = {};

    columnas.forEach((columna) => {
      const celda = columna.columnas_celda; // Acceder al campo usando el alias de QueryBuilder
      const columnaEtiqueta = columna.columnas_columna_etiqueta;
      const valor = columna.columnas_valor; // Acceder al campo "valor"

      if (celda && columnaEtiqueta && valor) {
        response[columnaEtiqueta] = { celda, valor };
      } else {
        console.warn(`Fila con datos incompletos: ${JSON.stringify(columna)}`);
      }
    });

    console.log('Respuesta formateada:', response); // Verifica la estructura antes de devolver
    return response;
  }
}