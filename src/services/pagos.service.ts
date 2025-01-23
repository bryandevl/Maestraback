// src/pagos/pagos.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as xlsx from 'xlsx';

@Injectable()
export class FrPagosService {
  private readonly logger = new Logger(FrPagosService.name);

  constructor(private readonly dataSource: DataSource) {}
  async uploadFile(file: Express.Multer.File, list_id: string, cCAMPAIGN_ID: string) {
    // Parsear el archivo Excel
    const { headers, rows } = this.parseExcel(file.buffer);
  
    // Mapeo estático entre cabeceras del Excel y columnas de la tabla
    const fieldMapping = {
      'CAMPAÑA': 'cCAMPAIGN_ID',
      'NUM_CUENTA': 'cNUM_CUENTA',
      'NUM_DOCUMENTO': 'cNUM_DOCUMENTO',
      'OBSERVACION': 'cOBSERVACION',
      'PERIODO': 'cPERIODO',
      'CUOTA': 'cCUOTA',
      'FECHA_PAGO': 'dFECHA_PAGO',
      'MONEDA': 'nMONEDA',
      'MONTO': 'nMONTO',
      'MONTO_CONSIDERADO': 'nMONTO_CONSIDERADO',
      'ACTIVO': 'nSTATUS',
    };
  
    // Obtener las columnas válidas basadas en el Excel
    const matchedColumns = headers
      .filter((header) => fieldMapping[header]) // Solo incluir cabeceras válidas
      .map((header) => fieldMapping[header]);
  
    // Agregar columnas adicionales obligatorias que no están en el Excel
    matchedColumns.push('list_id', 'cCAMPAIGN_ID', 'dFECHA_CARGA_CSV');
  
    // Crear filas válidas para insertar
    const validRows = [];
    const errors = [];
    let totalInsertedRecords = 0;
  
    for (const [rowIndex, row] of rows.entries()) {
      try {
        const mappedRow = headers.map((header, index) => {
          const columnName = fieldMapping[header];
          if (!columnName) return null; // Ignorar cabeceras no válidas
  
          const columnType = this.getColumnType(columnName);
          return this.validateAndConvert(row[index] || null, columnType, columnName, rowIndex);
        });
  
        // Agregar valores adicionales obligatorios
        const currentDateTime = this.getLocalDateTime(); // Fecha y hora actual
        mappedRow.push(list_id, cCAMPAIGN_ID, currentDateTime); // `list_id`, `cCAMPAIGN_ID`, `dFECHA_CARGA_CSV`
        validRows.push(mappedRow);
      } catch (error) {
        errors.push({ row: rowIndex + 2, error: error.message }); // Fila 1 corresponde a las cabeceras
      }
    }
  
    console.log(`Total de filas válidas: ${validRows.length}`);
    console.log(`Errores durante la validación: ${JSON.stringify(errors)}`);
  
    // Insertar datos en lotes
    const BATCH_SIZE = 500;
    const batches = [];
    for (let i = 0; i < validRows.length; i += BATCH_SIZE) {
      batches.push(validRows.slice(i, i + BATCH_SIZE));
    }
  
    for (const batch of batches) {
      const insertColumns = matchedColumns.join(', ');
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
        INSERT INTO FR_PAGOS (${insertColumns})
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
  
  // Método para parsear el archivo Excel
  private parseExcel(buffer: Buffer): { headers: string[]; rows: any[] } {
    try {
      const workbook = xlsx.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  
      if (!data || data.length === 0) {
        throw new Error('El archivo Excel está vacío o no es válido.');
      }
  
      const headers = data[0] as string[];
      const rows = data.slice(1);
  
      return { headers, rows };
    } catch (error) {
      this.logger.error(`Error al procesar el archivo Excel: ${error.message}`);
      throw new Error('Error al procesar el archivo Excel.');
    }
  }
  
  // Obtener tipo de dato de una columna (ajustado para FR_PAGOS)
  private getColumnType(columnName: string): { maxLength: number | null; dataType: string } {
    const columnDetails = {
      cCAMPAIGN_ID: { dataType: 'varchar', maxLength: 50 },
      cNUM_CUENTA: { dataType: 'varchar', maxLength: 50 },
      cNUM_DOCUMENTO: { dataType: 'varchar', maxLength: 50 },
      cOBSERVACION: { dataType: 'varchar', maxLength: 50 },
      cPERIODO: { dataType: 'varchar', maxLength: 7 },
      cCUOTA: { dataType: 'varchar', maxLength: 20 },
      dFECHA_PAGO: { dataType: 'datetime', maxLength: null },
      nMONEDA: { dataType: 'int', maxLength: null },
      nMONTO: { dataType: 'decimal', maxLength: null },
      nMONTO_CONSIDERADO: { dataType: 'decimal', maxLength: null },
      nSTATUS: { dataType: 'int', maxLength: null },
      dFECHA_CARGA_CSV: { dataType: 'datetime', maxLength: null },
    };
  
    return columnDetails[columnName];
  }
  
  // Método para validar y convertir valores
  private validateAndConvert(
    value: any,
    column: { maxLength: number | null; dataType: string },
    columnName: string,
    rowIndex: number,
  ): any {
    if (value === null || value === undefined) {
      return null;
    }
  
    switch (column.dataType) {
      case 'varchar':
        if (column.maxLength && value.length > column.maxLength) {
          throw new Error(
            `El valor '${value}' excede la longitud máxima (${column.maxLength}) para la columna '${columnName}' en la fila ${rowIndex + 2}.`,
          );
        }
        return value.toString();
  
      case 'decimal':
        const numericValue = parseFloat(value);
        if (isNaN(numericValue)) {
          throw new Error(
            `El valor '${value}' no es un número válido para la columna '${columnName}' en la fila ${rowIndex + 2}.`,
          );
        }
        return numericValue;
  
      case 'int':
        const intValue = parseInt(value, 10);
        if (isNaN(intValue)) {
          throw new Error(
            `El valor '${value}' no es un número entero válido para la columna '${columnName}' en la fila ${rowIndex + 2}.`,
          );
        }
        return intValue;
  
      case 'datetime':
        const dateValue = new Date(value);
        if (isNaN(dateValue.getTime())) {
          throw new Error(
            `El valor '${value}' no es una fecha válida para la columna '${columnName}' en la fila ${rowIndex + 2}.`,
          );
        }
        return dateValue.toISOString();
  
      default:
        return value;
    }
  }
  
  // Obtener la fecha y hora local actual
  private getLocalDateTime(): string {
    return new Date().toISOString();
  }

}