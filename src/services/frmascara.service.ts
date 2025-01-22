import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class MascaraService {
  constructor(private readonly dataSource: DataSource) {}

  private getLocalDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  private isValidDate(value: any): boolean {
    const date = new Date(value);
    return !isNaN(date.getTime()) && date.getFullYear() >= 1900 && date.getFullYear() <= 2100;
  }

  private validateAndConvert(value: any, column: any, columnName: string, rowIndex: number): any {
    try {
      if (!column) return value;

      switch (column.dataType) {
        case 'datetime':
          if (value && typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
            const date = new Date(value);
            if (!this.isValidDate(date)) {
              console.warn(`Fila ${rowIndex + 1}: Fecha inválida en columna ${columnName}`);
              return null;
            }
            return `${value.split(' ')[0]} 00:00:00`; // Forzar formato
          }
          console.warn(`Fila ${rowIndex + 1}: Fecha inválida '${value}' en columna ${columnName}`);
          return null;

        case 'numeric':
        case 'decimal':
        case 'float':
          const parsedFloat = parseFloat(value);
          if (isNaN(parsedFloat)) {
            console.warn(`Fila ${rowIndex + 1}: Valor no numérico '${value}' en columna ${columnName}`);
            return 0.0;
          }
          return parsedFloat;

        case 'int':
          const parsedInt = parseInt(value, 10);
          if (isNaN(parsedInt)) {
            console.warn(`Fila ${rowIndex + 1}: Valor no entero '${value}' en columna ${columnName}`);
            return 0;
          }
          return parsedInt;

        case 'varchar':
        case 'nvarchar':
          if (typeof value !== 'string') value = value ? String(value) : '';
          if (column.maxLength && value.length > column.maxLength) {
            console.warn(`Fila ${rowIndex + 1}: Cadena truncada en columna ${columnName}`);
            value = value.substring(0, column.maxLength);
          }
          return value.replace(/'/g, "''");

        default:
          return value;
      }
    } catch (error) {
      console.error(`Error al validar valor en fila ${rowIndex + 1}, columna ${columnName}: ${error.message}`);
      return null;
    }
  }
  
  
  async processExcel(
    file: Express.Multer.File,
    campaign_id: string,
    list_id: string,
  ): Promise<string> {
    const BATCH_SIZE = 500;
  
    console.log(`Archivo recibido: Nombre=${file.originalname}, Tamaño=${file.size}`);
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
    console.log(`Total de filas leídas (incluyendo encabezados): ${data.length}`);
  
    if (data.length < 2) {
      throw new InternalServerErrorException('El archivo Excel está vacío o mal formateado');
    }
  
    const headers = data[0]; // Cabeceras del Excel
    const rows = data.slice(1); // Filas del Excel (sin cabecera)
  
    console.log(`Encabezados detectados: ${headers}`);
    console.log(`Total de filas de datos: ${rows.length}`);
  
    // Obtener el mapeo de columnas desde la base de datos
    const mappingQuery = `
      SELECT columna AS cabecera_asignacion, columna_etiqueta
      FROM [BD_CR_MAESTRA].[dbo].[T_Columnas_mask]
      WHERE campaign_id = @0
    `;
    const mapping = await this.dataSource.query(mappingQuery, [campaign_id]);
  
    console.log(`Columnas mapeadas desde la base de datos: ${JSON.stringify(mapping)}`);
  
    if (!mapping || mapping.length === 0) {
      throw new InternalServerErrorException(
        'No se encontraron columnas mapeadas para la campaña proporcionada',
      );
    }
  
    // Crear un mapeo entre las cabeceras del archivo y las columnas de la base de datos
    const columnMapping = mapping.reduce((acc, curr) => {
      acc[curr.columna_etiqueta] = curr.cabecera_asignacion;
      return acc;
    }, {});
  
    // Filtrar cabeceras presentes en el archivo y mapeadas en la base de datos
    const filteredHeaders = headers.filter((header) => columnMapping[header]);
  
    if (filteredHeaders.length === 0) {
      throw new InternalServerErrorException(
        'No hay cabeceras válidas para insertar en la base de datos.',
      );
    }
  
    // Reordenar las columnas finales para la inserción
    const mappedColumns = filteredHeaders.map((header) => columnMapping[header]);
    const additionalColumns = ['campaign_id', 'list_id', 'dFecha_CARGA_CSV'];
    mappedColumns.push(...additionalColumns);
  
    console.log(`Columnas finales para inserción: ${mappedColumns}`);
  
    // Obtener información de las columnas de la tabla de destino
    const columnInfoQuery = `
      SELECT COLUMN_NAME AS columnName, DATA_TYPE AS dataType, CHARACTER_MAXIMUM_LENGTH AS maxLength
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = 'FR_MASCARA'
    `;
    const columnInfo = await this.dataSource.query(columnInfoQuery);
  
    const columnDetails = columnInfo.reduce((acc, curr) => {
      acc[curr.columnName] = {
        maxLength: curr.maxLength,
        dataType: curr.dataType,
      };
      return acc;
    }, {});
  
    const errors: any[] = [];
    const validRows = [];
    let totalInsertedRecords = 0;
  
    // Validar y mapear filas
    for (const [rowIndex, row] of rows.entries()) {
      try {
        const filteredRow = filteredHeaders.map((header) => {
          const columnName = columnMapping[header];
          const column = columnDetails[columnName];
          const colIndex = headers.indexOf(header); // Índice de la cabecera en el archivo Excel
          return this.validateAndConvert(row[colIndex] || null, column, columnName, rowIndex);
        });
  
        // Agregar valores adicionales requeridos
        filteredRow.push(campaign_id, list_id, this.getLocalDateTime());
        validRows.push(filteredRow);
      } catch (error) {
        errors.push({ row: rowIndex + 2, error: error.message });
      }
    }
  
    console.log(`Total de filas válidas: ${validRows.length}`);
    console.log(`Errores durante la validación: ${JSON.stringify(errors)}`);
  
    // Insertar filas en lotes (batches)
    const batches = [];
    for (let i = 0; i < validRows.length; i += BATCH_SIZE) {
      batches.push(validRows.slice(i, i + BATCH_SIZE));
    }
  
    for (const batch of batches) {
      const insertColumns = mappedColumns.join(', ');
      const valuesStatements = batch
        .map(
          (row) =>
            `(${row
              .map((value) => {
                if (value === null || value === undefined || Number.isNaN(value)) return 'NULL';
                if (typeof value === 'string') {
                  return `'${value.replace(/'/g, "''")}'`;
                }
                return value;
              })
              .join(', ')})`,
        )
        .join(', ');
  
      const sqlQuery = `
        INSERT INTO [BD_CR_MAESTRA].[dbo].[FR_MASCARA]
        (${insertColumns})
        VALUES ${valuesStatements};
      `;
  
      try {
        console.log(`Ejecutando batch con ${batch.length} registros.`);
        await this.dataSource.query(sqlQuery);
        totalInsertedRecords += batch.length;
      } catch (error) {
        console.error(`Error en batch: ${error.message}`);
        errors.push({ row: 'N/A', error: error.message });
      }
    }
  
    console.log(`Total de registros insertados: ${totalInsertedRecords}`);
    return errors.length > 0
      ? `Datos insertados parcialmente (${totalInsertedRecords} registros insertados). Revisa el log para más detalles.`
      : `Datos insertados correctamente. Total de registros insertados: ${totalInsertedRecords}.`;
  }
}
