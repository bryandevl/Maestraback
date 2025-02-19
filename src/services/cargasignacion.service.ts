import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as XLSX from 'xlsx';

@Injectable()
export class ExcelService {
  constructor(private readonly dataSource: DataSource) {}

  private getLocalDateTime(): string {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  private isValidDate(value: any): boolean {
    return !isNaN(Date.parse(value));
  }

  private validateAndConvert(value: any, column: any): any {
    if (value === null || value === undefined || value === '') {
      return column?.columnName === 'nEstado' ? 1 : null; // 🔥 Si es nEstado, usa 1 en lugar de null
    }
  
    switch (column?.dataType) {
      case 'datetime':
        return this.isValidDate(value) ? new Date(value).toISOString().slice(0, 19).replace('T', ' ') : null;

      case 'int':
        return Number.isInteger(Number(value)) ? parseInt(value, 10) : (column?.columnName === 'nEstado' ? 1 : 0); // 🔥 Si es nEstado, usa 1 en lugar de 0
      case 'numeric':
      case 'decimal':
      case 'float':

        return !isNaN(parseFloat(value)) ? parseFloat(value) : 0.0;

      case 'varchar':

      case 'nvarchar':

        let stringValue = String(value).trim();
        return column.maxLength ? stringValue.slice(0, column.maxLength) : stringValue;

      default:
        return value;
    }
  }

  async processExcel(file: Express.Multer.File, campaign_id: string, list_id: string): Promise<string> {
    const BATCH_SIZE = 200;

    console.log(`Archivo recibido: ${file.originalname} (${file.size} bytes)`);
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    if (data.length < 2) {
      throw new InternalServerErrorException('El archivo Excel está vacío o mal formateado');
    }

    const headers = data[0];
    const rows = data.slice(1);

    // Obtener el mapeo de columnas
    const mappingQuery = `SELECT columna AS cabecera_asignacion, columna_etiqueta FROM [BD_CR_MAESTRA].[dbo].[T_Columnas2] WHERE campaign_id = @0`;
    const mapping = await this.dataSource.query(mappingQuery, [campaign_id]);

    if (!mapping.length) {
      throw new InternalServerErrorException('No se encontraron columnas mapeadas para la campaña.');
    }

    const columnMapping = mapping.reduce((acc, curr) => ({ ...acc, [curr.columna_etiqueta]: curr.cabecera_asignacion }), {});
    const filteredHeaders = headers.filter((header) => columnMapping[header]);

    if (!filteredHeaders.length) {
      throw new InternalServerErrorException('No hay cabeceras válidas para insertar.');
    }

    // Obtener metadatos de columnas en la tabla
    const columnInfoQuery = `SELECT COLUMN_NAME AS columnName, DATA_TYPE AS dataType, CHARACTER_MAXIMUM_LENGTH AS maxLength FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'FR_ASIGNACION'`;
    const columnInfo = await this.dataSource.query(columnInfoQuery);
    
    const columnDetails = columnInfo.reduce((acc, curr) => ({ ...acc, [curr.columnName]: { dataType: curr.dataType, maxLength: curr.maxLength } }), {});

    // Definir las columnas a insertar (sin nEstado)
    const mappedColumns = [...filteredHeaders.map((header) => columnMapping[header]), 'campaign_id', 'list_id', 'dFecha_CARGA_CSV'];

    const validRows = [];
    const errors: any[] = [];
    let totalInsertedRecords = 0;

    // Procesar las filas
    rows.forEach((row, rowIndex) => {
      try {
        const filteredRow = filteredHeaders.map((header) => {
          const columnName = columnMapping[header];
          const column = columnDetails[columnName];
          const colIndex = headers.indexOf(header);
          return this.validateAndConvert(row[colIndex], column);
        });
    
        filteredRow.push(campaign_id, list_id, this.getLocalDateTime());
    
        console.log(`Fila ${rowIndex + 2}:`, filteredRow); // 🔍 Revisa los valores antes de insertarlos
    
        validRows.push(filteredRow);
      } catch (error) {
        errors.push({ row: rowIndex + 2, error: error.message });
      }
    });
    

    // Agrupar en lotes de inserción
    const batches = [];
    for (let i = 0; i < validRows.length; i += BATCH_SIZE) {
      batches.push(validRows.slice(i, i + BATCH_SIZE));
    }

    // Insertar en la base de datos
    for (const batch of batches) {
      if (batch.some(row => row.length !== mappedColumns.length)) {
        console.error('Error: Desajuste entre columnas y valores en el batch.');
       // console.log(`Columnas esperadas: ${mappedColumns.length}, Valores en fila: ${batch[0]?.length}`);
        throw new InternalServerErrorException('Error en la estructura de datos. Verifica el mapeo de columnas.');
      }
    
      const insertColumns = mappedColumns.join(', ');
      const valuesStatements = batch
      .map(
        (row) =>
          `(${row.map((value) => (value === null ? 'DEFAULT' : typeof value === 'string' ? `'${value.replace(/'/g, "''")}'` : value)).join(', ')})`
      )
      .join(', ');
    
    
      const sqlQuery = `INSERT INTO [BD_CR_MAESTRA].[dbo].[FR_ASIGNACION] (${insertColumns}) VALUES ${valuesStatements};`;
    
      try {
        await this.dataSource.query(sqlQuery);
        totalInsertedRecords += batch.length;
      } catch (error) {
        console.error(`Error en batch: ${error.message}`);
        errors.push({ row: 'N/A', error: error.message });
      }
    }

    return errors.length > 0
      ? `Datos insertados parcialmente (${totalInsertedRecords} registros). Revisa el log.`
      : `Datos insertados correctamente (${totalInsertedRecords} registros).`;
  }
}
