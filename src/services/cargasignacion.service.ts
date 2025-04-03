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
      return column?.columnName === 'nEstado' ? 1 : null;
    }

    switch (column?.dataType) {
      case 'datetime':
        return this.isValidDate(value) ? new Date(value).toISOString().slice(0, 19).replace('T', ' ') : null;

      case 'int':
        const intValue = Number(value);
        return Number.isInteger(intValue) ? intValue : (column?.columnName === 'nEstado' ? 1 : 0);

      case 'numeric':
      case 'decimal':
      case 'float':
        const floatValue = parseFloat(value);
        return isNaN(floatValue) ? 0.0 : floatValue;

      case 'varchar':
      case 'nvarchar':
        let stringValue = String(value).trim();
        return column.maxLength ? stringValue.slice(0, column.maxLength) : stringValue;

      default:
        return value;
    }
  }

  async processExcel(file: Express.Multer.File, campaign_id: string, list_id: string): Promise<string> {
    const BATCH_SIZE = 200; // Aumentamos el tamaño del batch para reducir rondas de inserción
    const MAX_ROWS_PER_TRANSACTION = 20000 // Procesamos en transacciones más pequeñas

    console.time('ExcelProcessing'); // Iniciamos medición de tiempo
    console.log(`Archivo recibido: ${file.originalname} (${file.size} bytes)`);
    
    // Leer el archivo en modo streaming para reducir memoria
    const workbook = XLSX.read(file.buffer, { type: 'buffer', sheetRows: 0 });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    if (data.length < 2) {
      throw new InternalServerErrorException('El archivo Excel está vacío o mal formateado');
    }

    const headers = data[0];
    const rows = data.slice(1);

    // Obtener el mapeo de columnas (cachear esta consulta si es posible)
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

    // Obtener metadatos de columnas (cachear esta consulta si es posible)
    const columnInfoQuery = `SELECT COLUMN_NAME AS columnName, DATA_TYPE AS dataType, CHARACTER_MAXIMUM_LENGTH AS maxLength FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'FR_ASIGNACION'`;
    const columnInfo = await this.dataSource.query(columnInfoQuery);
    
    const columnDetails = columnInfo.reduce((acc, curr) => ({ ...acc, [curr.columnName]: { dataType: curr.dataType, maxLength: curr.maxLength } }), {});

    // Definir las columnas a insertar
    const mappedColumns = [...filteredHeaders.map((header) => columnMapping[header]), 'campaign_id', 'list_id', 'dFecha_CARGA_CSV'];

    const errors: any[] = [];
    let totalInsertedRecords = 0;
    let currentTransactionSize = 0;
    let batchQueue = [];

    // Usamos transacción para mejor rendimiento
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Procesar las filas en bloques para evitar memory heap
      for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        const row = rows[rowIndex];
        
        try {
          const filteredRow = filteredHeaders.map((header, colIndex) => {
            const columnName = columnMapping[header];
            const column = columnDetails[columnName];
            const colValue = row[headers.indexOf(header)];
            
            const convertedValue = this.validateAndConvert(colValue, column);

            if (typeof convertedValue === 'number' && isNaN(convertedValue)) {
              console.error(`⚠️ Error en fila ${rowIndex + 2}, columna '${header}' → Valor inválido: ${colValue}`);
              errors.push({ row: rowIndex + 2, column: header, error: `Valor inválido: ${colValue}` });
            }

            return convertedValue;
          });

          filteredRow.push(campaign_id, list_id, this.getLocalDateTime());
          batchQueue.push(filteredRow);
          currentTransactionSize++;

          // Insertar cuando alcanzamos el tamaño del batch o el límite de transacción
          if (batchQueue.length >= BATCH_SIZE || currentTransactionSize >= MAX_ROWS_PER_TRANSACTION) {
            await this.insertBatch(queryRunner, mappedColumns, batchQueue);
            totalInsertedRecords += batchQueue.length;
            batchQueue = [];
            
            // Si alcanzamos el límite de transacción, hacemos commit y empezamos nueva
            if (currentTransactionSize >= MAX_ROWS_PER_TRANSACTION) {
              await queryRunner.commitTransaction();
              await queryRunner.startTransaction();
              currentTransactionSize = 0;
            }
          }
        } catch (error) {
          errors.push({ row: rowIndex + 2, error: error.message });
        }
      }

      // Insertar cualquier batch restante
      if (batchQueue.length > 0) {
        await this.insertBatch(queryRunner, mappedColumns, batchQueue);
        totalInsertedRecords += batchQueue.length;
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(`Error durante la transacción: ${error.message}`);
    } finally {
      await queryRunner.release();
    }

    console.timeEnd('ExcelProcessing'); // Finalizamos medición de tiempo
    console.log(`Memoria usada: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`);

    return errors.length > 0
      ? `Datos insertados parcialmente (${totalInsertedRecords} registros). Revisa el log.`
      : `Datos insertados correctamente (${totalInsertedRecords} registros).`;
  }

  private async insertBatch(queryRunner: any, mappedColumns: string[], batch: any[][]) {
    if (batch.length === 0) return;

    const insertColumns = mappedColumns.join(', ');
    const valuesStatements = batch
      .map(
        (row) =>
          `(${row.map((value) => (value === null ? 'DEFAULT' : typeof value === 'string' ? `'${value.replace(/'/g, "''")}'` : value)).join(', ')})`
      )
      .join(', ');

    const sqlQuery = `INSERT INTO [BD_CR_MAESTRA].[dbo].[FR_ASIGNACION] (${insertColumns}) VALUES ${valuesStatements};`;

    try {
      await queryRunner.query(sqlQuery);
    } catch (error) {
      console.error(`Error en batch: ${error.message}`);
      throw error; // Propagamos el error para manejar el rollback
    }
  }
}