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

    const matchedColumns = headers.filter(header => fieldMapping[header]).map(header => fieldMapping[header]);
    matchedColumns.push('list_id', 'cCAMPAIGN_ID', 'dFECHA_CARGA_CSV');

    const validRows = [];
    const errors = [];

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
    
        // Filtrar solo filas con NUM_DOCUMENTO válido
        if (!mappedRow['cNUM_DOCUMENTO']) {
          continue;
        }
    
        mappedRow['list_id'] = list_id;
        mappedRow['cCAMPAIGN_ID'] = cCAMPAIGN_ID;
        mappedRow['dFECHA_CARGA_CSV'] = this.getLocalDateTime();
    
        validRows.push(mappedRow);
      } catch (error) {
        errors.push({ row: rowIndex + 2, error: error.message });
      }
    }

    if (validRows.length > 0) {
      await this.deleteExistingCampaignData(cCAMPAIGN_ID,list_id , validRows[0].cPERIODO);
      for (const row of validRows) {
        await this.insertPayment(row);
      }
    }

    return errors.length > 0
      ? `Datos procesados parcialmente. Verifica el log.`
      : `Datos procesados correctamente.`;
  }

  private async deleteExistingCampaignData(cCAMPAIGN_ID: string, list_id: string, cPERIODO: string) {
    const checkQuery = `
      SELECT COUNT(*) as count FROM FR_PAGOS 
      WHERE cCAMPAIGN_ID = '${cCAMPAIGN_ID}' 
      AND cPERIODO = '${cPERIODO}' 
      AND list_id = '${list_id}'
    `;
    const [result] = await this.dataSource.query(checkQuery);
    this.logger.log(`Registros a eliminar: ${result.count}`);
  
    if (result.count > 0) {
      const deleteQuery = `
        DELETE FROM FR_PAGOS 
        WHERE cCAMPAIGN_ID = '${cCAMPAIGN_ID}' 
        AND cPERIODO = '${cPERIODO}' 
        AND list_id = '${list_id}'
      `;
      await this.dataSource.query(deleteQuery);
      this.logger.log(`Registros eliminados correctamente.`);
    } else {
      this.logger.warn(`No se encontraron registros para eliminar.`);
    }
  }
  

  private async insertPayment(row: any) {
    const columns = Object.keys(row).join(', ');
    const values = Object.values(row).map(value => (value === null ? 'NULL' : `'${value}'`)).join(', ');

    await this.dataSource.query(
      `INSERT INTO FR_PAGOS (${columns}) VALUES (${values})`
    );
  }

  private parseExcel(buffer: Buffer): { headers: string[]; rows: any[] } {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    if (!data || data.length === 0) {
      throw new Error('El archivo Excel está vacío o no es válido.');
    }

    return { headers: data[0] as string[], rows: data.slice(1) };
  }

  private getColumnType(columnName: string) {
    return {
      cCAMPAIGN_ID: { dataType: 'varchar', maxLength: 50 },
      cNUM_CUENTA: { dataType: 'varchar', maxLength: 50 },
      cNUM_DOCUMENTO: { dataType: 'varchar', maxLength: 50 },
      cOBSERVACION: { dataType: 'varchar', maxLength: 50 },
      cPERIODO: { dataType: 'varchar', maxLength: 7 },
      cCUOTA: { dataType: 'varchar', maxLength: 20 },
      dFECHA_PAGO: { dataType: 'datetime' },
      nMONEDA: { dataType: 'int' },
      nMONTO: { dataType: 'decimal' },
      nMONTO_CONSIDERADO: { dataType: 'decimal' },
      nSTATUS: { dataType: 'int' },
      dFECHA_CARGA_CSV: { dataType: 'datetime' },
    }[columnName];
  }

  private convertExcelDate(value: any): string | null {
    if (!value) return null;

    if (!isNaN(value)) {
        // Si es un número, es un serial de Excel -> Convertir a fecha
        const excelStartDate = new Date(1899, 11, 30); // Base de fecha de Excel
        const jsDate = new Date(excelStartDate.getTime() + value * 86400000);
        return jsDate.toISOString().split('T')[0] + ' 00:00:00';
    }

    try {
        // Si es una cadena, intenta convertirla a una fecha válida
        const parsedDate = new Date(value);
        if (!isNaN(parsedDate.getTime())) {
            return parsedDate.toISOString().split('T')[0] + ' 00:00:00';
        }
    } catch (error) {
        console.warn(`Fecha inválida en fila: ${value}`);
    }

    return null; // Si no es una fecha válida, retorna NULL
}



  private validateAndConvert(value: any, column: { maxLength?: number; dataType: string }, columnName: string, rowIndex: number) {
    if (value === null || value === undefined) return null;

    switch (column.dataType) {
      case 'varchar':
        return value.toString().slice(0, column.maxLength);
      case 'decimal':
        return isNaN(value) ? null : parseFloat(value);
      case 'int':
        return isNaN(value) ? null : parseInt(value, 10);
        case 'datetime':
          return this.convertExcelDate(value); // Usa la nueva función para fechas
      default:
        return value;
    }
  }

  private getLocalDateTime(): string {
    return new Date().toISOString().split('T')[0] + ' 00:00:00';
  }
}
