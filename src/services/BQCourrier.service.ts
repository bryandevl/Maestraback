
// src/services/upload.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as csv from 'csv-parser';
import * as xlsx from 'xlsx';
import { BqCourier } from 'src/entities/BqCourier.entity'; // Ensure consistent casing

import { CreateBQCourierDto } from '../dtos/BQCourrier.dto';
import { Readable } from 'stream';

@Injectable()
export class BQCourierService {
  constructor(
    @InjectRepository(BqCourier)
    private readonly bqCourierRepo: Repository<BqCourier>,
  ) {}

  async processFile(file: Express.Multer.File, dto: CreateBQCourierDto): Promise<string> {
    let records: Partial<BqCourier>[] = [];

    if (file.mimetype === 'text/csv') {
      records = await this.parseCSV(file.buffer);
    } else if (
      file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
      file.mimetype === 'application/vnd.ms-excel'
    ) {
      records = await this.parseExcel(file.buffer);
    } else {
      throw new Error('Formato de archivo no soportado');
    }

    for (const record of records) {
      record.campania = dto.CAMPANIA;
      record.usuario = dto.USUARIO;
      record.fecarga = new Date(); 
      record.periodo = new Date().getFullYear().toString() + 
                   ('0' + (new Date().getMonth() + 1)).slice(-2); // Genera YYYYMM
    }

    await this.bqCourierRepo.insert(records);
    return `Se insertaron ${records.length} registros.`;
  }
  private parseCSV(buffer: Buffer): Promise<Partial<BqCourier>[]> {
    return new Promise((resolve, reject) => {
      const results: Partial<BqCourier>[] = [];
      const stream = Readable.from(buffer.toString());
  
      stream.pipe(csv({ separator: ';' })) // ⚠️ Usa el delimitador correcto
        .on('data', (data) => {
          if (data.DOCUMENTO && data.CLIENTE && data.DIRECCION) {
            results.push({
              documento: data.DOCUMENTO.trim(),
              cliente: data.CLIENTE.trim(),
              direccion: data.DIRECCION.trim(),
              departamento: data.DEPARTAMENTO?.trim() || '',
              provincia: data.PROVINCIA?.trim() || '',
              distrito: data.DISTRITO?.trim() || '',
              deuda: parseFloat(data.DEUDA.replace(',', '.')) || 0, // Soporte para decimales con coma
              cancelacion: parseFloat(data.CANCELACION.replace(',', '.')) || 0,
              campania: '',
              usuario: '',
            });
          } else {
            console.warn(`⚠️ Fila inválida ignorada: ${JSON.stringify(data)}`);
          }
        })
        .on('end', () => resolve(results))
        .on('error', (err) => reject(err));
    });
  }

  private parseExcel(buffer: Buffer): Partial<BqCourier>[] {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return xlsx.utils.sheet_to_json(sheet);
  }
}