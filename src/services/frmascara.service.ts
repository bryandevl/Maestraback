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
              console.warn(`⚠️ Fila ${rowIndex + 2}, Columna '${columnName}': Fecha inválida -> ${value}`);
              return null;
            }
            return `${value.split(' ')[0]} 00:00:00`;
          }
          console.warn(`⚠️ Fila ${rowIndex + 2}, Columna '${columnName}': Fecha inválida -> ${value}`);
          return null;
  
        case 'numeric':
        case 'decimal':
        case 'float':
          const parsedFloat = parseFloat(value);
          if (isNaN(parsedFloat)) {
            console.warn(`⚠️ Fila ${rowIndex + 2}, Columna '${columnName}': Valor no numérico -> ${value}`);
            return 0.0;
          }
          return parsedFloat;
  
        case 'int':
          const parsedInt = parseInt(value, 10);
          if (isNaN(parsedInt)) {
            console.warn(`⚠️ Fila ${rowIndex + 2}, Columna '${columnName}': Valor no entero -> ${value}`);
            return 0;
          }
          return parsedInt;
  
        case 'varchar':
        case 'nvarchar':
          if (typeof value !== 'string') value = value ? String(value) : '';
          if (column.maxLength && value.length > column.maxLength) {
            console.warn(`⚠️ Fila ${rowIndex + 2}, Columna '${columnName}': Cadena truncada, Longitud máxima ${column.maxLength}`);
            value = value.substring(0, column.maxLength);
          }
          return value.replace(/'/g, "''");
  
        default:
          return value;
      }
    } catch (error) {
      console.error(`❌ Error en Fila ${rowIndex + 2}, Columna '${columnName}': ${error.message}`);
      return null;
    }
  }
  
  async processExcel(
    file: Express.Multer.File,
    campaign_id: string,
    list_id: string,
  ): Promise<string> {
    const BATCH_SIZE = 500;
    let updatedCount = 0;
    let insertedCount = 0;
    console.log(`Archivo recibido: ${file.originalname}, Tamaño=${file.size}`);
  
    // Leer el archivo Excel
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
    if (data.length < 2) {
      throw new InternalServerErrorException('El archivo Excel está vacío o mal formateado');
    }
  
    const headers = data[0];
    const rows = data.slice(1);
  
    // Obtener el mapeo de columnas desde la base de datos
    const mappingQuery = `
      SELECT columna AS columna, columna_etiqueta, DATA_TYPE AS dataType, CHARACTER_MAXIMUM_LENGTH AS maxLength
      FROM [BD_CR_MAESTRA].[dbo].[T_Columnas_mask]
      JOIN INFORMATION_SCHEMA.COLUMNS ON columna = COLUMN_NAME
      WHERE campaign_id = '${campaign_id}' AND TABLE_NAME = 'FR_MASCARA'
    `;
    const mapping = await this.dataSource.query(mappingQuery);
  
    // Crear un mapeo de columnas
    const columnMapping = mapping.reduce((acc, curr) => {
      acc[curr.columna_etiqueta] = {
        column: curr.columna,
        type: curr.dataType || 'varchar',
        maxLength: curr.maxLength || null,
      };
      return acc;
    }, {});
  
    // Filtrar las columnas que están en el mapeo
    const filteredHeaders = headers.filter((header) => columnMapping[header]);
    const mappedColumns = filteredHeaders.map((header) => columnMapping[header].column);
    mappedColumns.push('campaign_id', 'list_id', 'dFecha_CARGA_CSV');
  
    // Procesar las filas válidas
    const validRows = [];
    for (const rowIndex in rows) {
      const row = rows[rowIndex];
      const filteredRow = filteredHeaders.map((header) => {
        const columnInfo = columnMapping[header];
        return this.validateAndConvert(row[headers.indexOf(header)] || null, columnInfo, columnInfo.column, parseInt(rowIndex));
      });
      filteredRow.push(campaign_id, list_id, this.getLocalDateTime());
      validRows.push(filteredRow);
    }
  
    // Procesar en lotes
    const batches = [];
    for (let i = 0; i < validRows.length; i += BATCH_SIZE) {
      batches.push(validRows.slice(i, i + BATCH_SIZE));
    }
  
    for (const batch of batches) {
      for (const row of batch) {
        // Depuración: Verificar los valores de cnum_cuenta y cnum_documento
        const cnum_cuenta = row[mappedColumns.indexOf('cnum_cuenta')];
        const cnum_documento = row[mappedColumns.indexOf('cnum_documento')];
        console.log(`Valores de búsqueda: cnum_cuenta=${cnum_cuenta}, cnum_documento=${cnum_documento}`);
  
        // Consulta de verificación mejorada
        const checkQuery = `
          SELECT COUNT(*) AS count FROM [BD_CR_MAESTRA].[dbo].[FR_MASCARA]
          WHERE (cnum_cuenta = '${cnum_cuenta}' OR (cnum_cuenta IS NULL AND '${cnum_cuenta}' IS NULL))
            AND cnum_documento = '${cnum_documento}'
            AND campaign_id = '${campaign_id}'
            AND list_id = '${list_id}'
        `;
        console.log(`Consulta de verificación: ${checkQuery}`);
  
        const checkResult = await this.dataSource.query(checkQuery);
        console.log(`Resultado de verificación: ${checkResult[0].count}`);
  
        if (checkResult[0].count > 0) {
          // Actualización
          const updateColumns = mappedColumns
            .filter((col, index) => !['campaign_id', 'list_id', 'dFecha_CARGA_CSV'].includes(col)) // Excluir columnas que no deben actualizarse
            .map((col, index) => {
              const value = row[index];
              return `${col} = ${value === null ? 'NULL' : (typeof value === 'number' ? value : `'${value}'`)}`;
            })
            .join(', ');
  
          const updateQuery = `
            UPDATE [BD_CR_MAESTRA].[dbo].[FR_MASCARA]
            SET dFecha_MODIFICACION = GETDATE(), ${updateColumns}
            WHERE cnum_cuenta = '${cnum_cuenta}' AND cnum_documento = '${cnum_documento}' AND campaign_id = '${campaign_id}' AND list_id = '${list_id}'
          `;
          console.log(`Consulta de actualización: ${updateQuery}`);
          await this.dataSource.query(updateQuery);
          updatedCount++;
        } else {
          // Inserción
          const valuesStatements = `(${row.map((value) => (value === null ? 'NULL' : (typeof value === 'number' ? value : `'${value}'`))).join(', ')})`;
  
          const insertQuery = `
            INSERT INTO [BD_CR_MAESTRA].[dbo].[FR_MASCARA]
            (${mappedColumns.join(', ')})
            VALUES ${valuesStatements}
          `;
          console.log(`Consulta de inserción: ${insertQuery}`);
          await this.dataSource.query(insertQuery);
          insertedCount++;
        }
      }
    }
  
    return `Proceso completado correctamente. Registros actualizados: ${updatedCount}, Registros insertados: ${insertedCount}`;
  }

}