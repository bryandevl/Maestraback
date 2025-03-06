import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as xlsx from 'xlsx';

@Injectable()
export class FrPagosService {
  private readonly logger = new Logger(FrPagosService.name);

  constructor(private readonly dataSource: DataSource) {}

  async uploadFile(file: Express.Multer.File, list_id: string, cCAMPAIGN_ID: string) {
    const { headers, rows } = this.parseExcel(file.buffer);

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

    const matchedColumns = headers
      .filter(header => fieldMapping[header])
      .map(header => fieldMapping[header]);

    matchedColumns.push('list_id', 'cCAMPAIGN_ID', 'dFECHA_CARGA_CSV');

    const validRows = [];
    const errors = [];
    let totalProcessedRecords = 0;

    for (const [rowIndex, row] of rows.entries()) {
      try {
        const mappedRow = {};
        headers.forEach((header, index) => {
          const columnName = fieldMapping[header];
          if (columnName) {
            const columnType = this.getColumnType(columnName);
            mappedRow[columnName] = this.validateAndConvert(row[index], columnType, columnName, rowIndex);
          }
        });

        mappedRow['list_id'] = list_id;
        mappedRow['cCAMPAIGN_ID'] = cCAMPAIGN_ID;
        mappedRow['dFECHA_CARGA_CSV'] = this.getLocalDateTime();

        validRows.push(mappedRow);
      } catch (error) {
        errors.push({ row: rowIndex + 2, error: error.message });
      }
    }

    console.log(`Total de filas válidas: ${validRows.length}`);
    console.log(`Errores durante la validación: ${JSON.stringify(errors)}`);

    for (const row of validRows) {
      try {
        await this.upsertPayment(row);
        totalProcessedRecords++;
      } catch (error) {
        console.error(`Error en registro: ${error.message}`);
        errors.push({ row: 'N/A', error: error.message });
      }
    }

    console.log(`Total de registros procesados: ${totalProcessedRecords}`);
    return errors.length > 0
      ? `Datos procesados parcialmente (${totalProcessedRecords} registros actualizados/insertados). Revisa el log para más detalles.`
      : `Datos procesados correctamente. Total de registros actualizados/insertados: ${totalProcessedRecords}.`;
  }

  private async upsertPayment(row: any) {
    const { cNUM_CUENTA, cNUM_DOCUMENTO, cPERIODO,cCAMPAIGN_ID,list_id, ...updateFields } = row;

    const existingRecord = await this.dataSource.query(
        `SELECT TOP 1 1 FROM FR_PAGOS WHERE cNUM_CUENTA = '${cNUM_CUENTA}' AND cNUM_DOCUMENTO = '${cNUM_DOCUMENTO}' AND cPERIODO = '${cPERIODO}' 'AND cCAMPAIGN_ID='${cCAMPAIGN_ID}' 'AND list_id='${list_id}'`
    );

    if (existingRecord.length > 0) {
        // Actualización
        const updateFieldsSql = Object.entries(updateFields)
            .map(([key, value]) => `${key} = '${value}'`)
            .join(', ');

        await this.dataSource.query(
            `UPDATE FR_PAGOS SET ${updateFieldsSql} WHERE cNUM_CUENTA = '${cNUM_CUENTA}' AND cNUM_DOCUMENTO = '${cNUM_DOCUMENTO}' AND cPERIODO = '${cPERIODO}' 'AND cCAMPAIGN_ID='${cCAMPAIGN_ID}' 'AND list_id='${list_id}'`
        );
    } else {
        // Inserción
        const columns = Object.keys(row).join(', ');
        const values = Object.values(row)
            .map(value => (value === null ? 'NULL' : `'${value}'`))
            .join(', ');

        await this.dataSource.query(
            `INSERT INTO FR_PAGOS (${columns}) VALUES (${values})`
        );
    }
}



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

  private getColumnType(columnName: string) {
    return {
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
    }[columnName];
  }

  private validateAndConvert(value: any, column: { maxLength: number | null; dataType: string }, columnName: string, rowIndex: number) {
    if (value === null || value === undefined) return null;

    switch (column.dataType) {
      case 'varchar':
        if (column.maxLength && value.length > column.maxLength) {
          throw new Error(`El valor '${value}' excede la longitud máxima (${column.maxLength}) en la fila ${rowIndex + 2}.`);
        }
        return value.toString();

      case 'decimal':
        return isNaN(value) ? null : parseFloat(value);

      case 'int':
        return isNaN(value) ? null : parseInt(value, 10);

        case 'datetime':
          let parsedDate: Date;
      
          if (typeof value === 'number') {
              // Convertir número de serie de Excel a fecha real
              parsedDate = new Date((value - 25569) * 86400000);
          } else if (typeof value === 'string') {
              // Convertir formato dd/mm/yyyy a yyyy-mm-dd
              const dateParts = value.split('/');
              if (dateParts.length === 3) {
                  const day = parseInt(dateParts[0], 10);
                  const month = parseInt(dateParts[1], 10) - 1; // Meses en JS van de 0 a 11
                  const year = parseInt(dateParts[2], 10);
                  parsedDate = new Date(year, month, day);
              } else {
                  parsedDate = new Date(value);
              }
          } else {
              parsedDate = new Date(value);
          }
      
          if (isNaN(parsedDate.getTime())) {
              console.warn(`⚠️ Fila ${rowIndex + 2}, Columna '${columnName}': Fecha inválida -> ${value}`);
              return null;
          }
      
          return parsedDate.toISOString().split('T')[0] + ' 00:00:00';
      

      default:
        return value;
    }
  }

  private getLocalDateTime(): string {
    return new Date().toISOString().split('T')[0] + ' 00:00:00';
  }



}

