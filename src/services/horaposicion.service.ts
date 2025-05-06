// src/services/hora-gestion.service.ts
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class HoraGestionService {
  constructor(private readonly connection: Connection) {}

  async consultarHoraPosicion(fechaInicio: string, fechaFin: string, campania: string) {
    try {
      // Usar el método query para ejecutar procedimientos almacenados
      const result = await this.connection.query(
        `EXEC [dbo].[SP_HORA_POSICION_BFB] @FechaInicio = @0, @FechaFin = @1, @campania = @2`,
        [fechaInicio, fechaFin, campania]
      );
      
      // Formatear las fechas en los resultados para que solo muestren YYYY-MM-DD
      const formattedResult = result.map(record => {
        if (record.fecha) {
          // Convertir la fecha a formato YYYY-MM-DD
          const fecha = new Date(record.fecha);
          const year = fecha.getFullYear();
          const month = String(fecha.getMonth() + 1).padStart(2, '0');
          const day = String(fecha.getDate()).padStart(2, '0');
          record.fecha = `${year}-${month}-${day}`;
        }
        return record;
      });
      
      // Devolver los resultados formateados
      return formattedResult;
    } catch (error) {
      console.error('Error al ejecutar el procedimiento almacenado:', error);
      throw new Error(`Error en la consulta: ${error.message}`);
    }
  }
}