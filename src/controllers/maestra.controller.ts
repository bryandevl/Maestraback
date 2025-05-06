// campaign.controller.ts
import { Controller, Post , Get , Body ,Query ,HttpException, HttpStatus, Res, Header} from '@nestjs/common';

import { Response } from 'express';

// Removed duplicate import of iconv-lite


import { CampaignService } from 'src/services/campania.service';

import { MainClientes } from 'src/entities/vrc-principal-cliente.entity';
import { ObtenerDatosCltDto } from 'src/dtos/vrc-obtenercliente.dto';
import { MainClientService } from 'src/services/vrc-principal-cliente.service';

import { DatosAdicionalesCltEntity } from 'src/entities/vrc-adicional-cliente.entity';
import { ObtenerDatosAdicionalesCltDto } from 'src/dtos/vrc-obteneradicionaldatos.dto';
import { DatosAdicionalCltService } from 'src/services/vrc-adicional-cliente.service';

import { PagosEntity } from 'src/entities/vrc-pagos.entity';
import { PagosClienteDto } from 'src/dtos/vrc-pagoscliente.dto';
import { PagosService } from 'src/services/vrc-pagos.service';

import { FotogestionesEntity } from 'src/entities/vrc-fotogestion.entity';
import { GestionService } from '../services/vrc-fotogestion.service';
import { ObtenerDetalleGestionDto } from 'src/dtos/vrc-obtenergestioncliente.dto';

import { ObtenerWspmasivoClt } from 'src/entities/vrc-wspmasivo.entity';
import { ObtenerWspmasivoCltDto } from 'src/dtos/vrc-obtenerwspmasivo.dto';
import { ObtenerWspmasivoCltService } from 'src/services/vrc-wspmasivo.service';

import { ObtenerSmsMasivoCltDto } from 'src/dtos/vrc-obtenersmsmasivo.dto';
import { ObtenerSmsMasivoClt } from 'src/entities/vrc-smsmasivo.entity';
import { ObtenerSmsMasivoCltService } from 'src/services/vrc-smsmasivo.service';

import { ObtenerDetalleDeudaDto } from 'src/dtos/vrc-obtenerdetalledeuda.dto';
import { DetalleDeudaCltService } from 'src/services/vrc-detalledeuda.service';
import { DetalleDeudaCltEntity } from 'src/entities/vrc-detalledeuda.entity';

import { ObtenerIvrMasivoClt } from 'src/entities/vrc-ivrmasivo.entity';
import { ObtenerIvrMasivoCltService } from 'src/services/vrc-ivrmasivo.service';
import { ObtenerIvrMasivoDto } from 'src/dtos/vrc-obtenerivrmasivo.dto';

import { ObtenerColumnaMaskDto } from 'src/dtos/vrc-obtenermasksupervisor.dto';
import { ColumnaMask } from 'src/entities/vrc-masksupervisor.entity';
import { ColumnaMaskService } from 'src/services/vrc-masksupervisor.service';

import { UpdateColumnMask } from 'src/entities/vrc-updatemasksupervisor.entity';
import { UpdateColumnMaskDto } from 'src/dtos/vrc-updatemasksupervisor.dto';
import { UpdateColumnMaskService } from 'src/services/vrc-updatemasksupervisor.service';

import { ColumnasMaskService2 } from '../services/columnas-mask.service';
import { VrcResultMaskService } from '../services/vrc-resultmask.service';
import { ObtenerValoresDto } from 'src/dtos/vrc-resultmask.dto';

import { clearMascaraService } from 'src/services/vrc-clearmasksupervisor.service';

import { MascaraFormatoService } from 'src/services/vrc-mascaraformato.service';
import { MascaraFormatoDto } from 'src/dtos/vrc-mascaraformato.dto';
import { BusquedaClienteDto } from 'src/dtos/vrc-busquedacliente.dto';
import { vrcDatosClienteEntity } from 'src/entities/vrc-datos-cliente.entity';
import { vrcResultadoClienteService } from 'src/services/vrc-resultadocliente.service';
import { HoraGestionService } from 'src/services/horaposicion.service';
import JSZip from 'jszip';
import * as iconv from 'iconv-lite';
import { HoraPosicionDto } from 'src/dtos/horarios.dto';
import { ApiOperation } from '@nestjs/swagger';



@Controller('maestra')
export class MaestraController {
  constructor(private readonly campaignService: CampaignService,
              private readonly clientMainService: MainClientService,
              private readonly pagosService: PagosService,
              private readonly gestionService: GestionService,
              private readonly wspmasivoCltService: ObtenerWspmasivoCltService,
              private readonly smsmasivoCltService: ObtenerSmsMasivoCltService,
              private readonly DatosAdicionalesService: DatosAdicionalCltService,
              private readonly detalleDeudaService: DetalleDeudaCltService,
              private readonly ivrmasivoCltService: ObtenerIvrMasivoCltService,
              private readonly columnaMaskService: ColumnaMaskService,
              private readonly updateColumnaMaskService: UpdateColumnMaskService,
              private readonly columnasMaskService: ColumnasMaskService2,
              private readonly resultMaskService: VrcResultMaskService,
              private readonly clearMaskService: clearMascaraService,
              private readonly mascaraFormatoService: MascaraFormatoService,
              private readonly datosClienteService: vrcResultadoClienteService,
              private readonly horaGestionService: HoraGestionService,
  ) {}

  @Post('campaings')
  async getCampaigns() {
    try {
      return await this.campaignService.getCampaigns();
    } catch (error) {
      throw new Error('Error al obtener las campañas: ' + error.message);
    }
  }

  @Post('dataprivate')
  async obtenerDatos(@Body() obtenerDatosCltDto: ObtenerDatosCltDto): Promise<MainClientes[]> {
    return this.clientMainService.obtenerDatosClt(obtenerDatosCltDto);
  }

  @Post('pagos')
  async getPagos(@Body() dto: PagosClienteDto) {
    return this.pagosService.getPagos(dto);
  }

  @Post('gestiones')
  async obtenerGestion(@Body() obtenerGestionDto: ObtenerDetalleGestionDto): Promise<FotogestionesEntity[]> {
    return this.gestionService.obtenerGestion(obtenerGestionDto);
  }

  @Post('wspmasivo')
  async obtenerDatosWSP(@Body() dto: ObtenerWspmasivoCltDto) {
    return await this.wspmasivoCltService.obtenerDatosWsp(dto);
  }

  @Post('smsmasivo')
  async obtenerDatosSMS(@Body() dto: ObtenerSmsMasivoCltDto) {
    return await this.smsmasivoCltService.obtenerDatosSms(dto);
  }

  @Post('dataaditional')
  async obtenerDatosAdicional(@Body() dto: ObtenerDatosAdicionalesCltDto): Promise<DatosAdicionalesCltEntity[]> {
    return this.DatosAdicionalesService.obtenerDatosPorCampania(dto);
  }

  @Post('detalledeuda')
  async obtenerDetalleDeuda(@Body() dto: ObtenerDetalleDeudaDto) : Promise<DetalleDeudaCltEntity[]> {
    return this.detalleDeudaService.obtenerDetalleDeuda(dto);
  }

  @Post('ivrmasivo')
  async obtenerDatosIvr(@Body() dto: ObtenerIvrMasivoDto) {
    return await this.ivrmasivoCltService.obtenerDatosIvr(dto);
  }

  @Post('columnamask')
  async obtenerColumnaMask(@Body() dto: ObtenerColumnaMaskDto) {
    return await this.columnaMaskService.obtenerColumnasMask(dto);
  }

  @Post('updatecolumnamask')
  async updateColumnMask(@Body() dto: UpdateColumnMaskDto) {
    return await this.updateColumnaMaskService.updateColumnMask(dto);
  }
  

  @Post('mascara')
  async getColumnas(@Body('campaign_id') campaign_id: string) {
    console.log('Solicitud recibida con campaign_id:', campaign_id);
    if (!campaign_id) {
      return { success: false, message: 'El campaign_id es requerido' };
    }
    
    const response = await this.columnasMaskService.getColumnasByCampaign(campaign_id);
    console.log('Respuesta enviada:', JSON.stringify(response, null, 2));
    
    return response;
  }
  

  @Post('resultmascara')
  async obtenerValores(@Body() dto: ObtenerValoresDto) {
    return await this.resultMaskService.obtenerResultadoMascara(dto);
  }


  @Post('clearmask')
  async clearMask(@Body() dto: ObtenerColumnaMaskDto) {
    const result = await this.clearMaskService.clearMaskByCampaign(dto);
    return result;
  }

  @Post('upsertmascaraformato')
  async upsertMascaraformato(@Body() dto: MascaraFormatoDto) {
    return this.mascaraFormatoService.upsertMascaraFormato(dto);
  }

  @Post('selectmascaraformato')
  async selectMascaraformato(@Body() body: { campaign_id: string }) {
    const { campaign_id } = body;
        if (!campaign_id) {
            throw new HttpException("El campaign_id es requerido.", HttpStatus.BAD_REQUEST);
        }
        return this.mascaraFormatoService.selectMascaraFormato(campaign_id);
    }

    @Post('clearmascaraformato')
    async clearMascaraformato(@Body() body: { campaign_id: string }) {
      const { campaign_id } = body;
        if (!campaign_id) {
            throw new HttpException("El campaign_id es requerido.", HttpStatus.BAD_REQUEST);
        }
        return this.mascaraFormatoService.clearMascaraFormato(campaign_id);
    }
    @Post('datoscliente')
    async obtenerDatosCliente(@Body() dto: BusquedaClienteDto) : Promise<vrcDatosClienteEntity[]> {
        return this.datosClienteService.obtenerDatosCliente(dto);
    }


/**
 * Script para generar archivo de texto con cabeceras HoraPosicion
 * Fecha: 05/05/2025
 */
@Post('HoraPosicion')
@ApiOperation({ summary: 'Obtener el reporte de Hora/Posición' })
async getHoraPosicion(@Body() data: HoraPosicionDto, @Res() res: Response) {
  try {
    // Log para verificar los parámetros recibidos
    console.log('Received data:', data);
    
    const { fechaInicio, fechaFin, campania } = data;

    // Llamar al servicio para obtener el reporte
    const resultado = await this.horaGestionService.consultarHoraPosicion(
      fechaInicio,
      fechaFin,      
      campania.join(','),
    );
    
    // Log para verificar el resultado del servicio
    console.log('Datos obtenidos:', resultado?.length || 0);
    
    // Log para verificar la estructura del primer registro
    if (resultado && resultado.length > 0) {
     // console.log('Estructura del primer registro:', JSON.stringify(resultado[0], null, 2));
    }
    
    // Verificar si hay datos para generar el archivo
    if (resultado && resultado.length > 0) {
      try {
        // Definir cabeceras para el archivo
        const cabeceras = [
          "CAMPAÑA",
          "USER",
          "PERIODO",
          "AGENCIA",
          "SERVICIO",
          "AGENTE",
          "DNI AGENT",
          "FECHA",
          "INGRESO",
          "SALIDA"
        ];
        
        // Crear contenido del archivo TXT con cabeceras
        let txtContent = cabeceras.join('\t') + '\r\n';
        
        // Procesar cada registro obtenido
        for (const entry of resultado) {
          // Log específico para el campo CAMPAÑA
        //  console.log('Valor CAMPAÑA (original):', entry["CAMPAÑA"]);
          
          // Crear una línea para este registro
          let line = '';
          
          // Procesar cada campo según las cabeceras
          for (let i = 0; i < cabeceras.length; i++) {
            const cabecera = cabeceras[i];
            let valor = entry[cabecera];
            
            // Log específico para depurar
            if (cabecera === "CAMPAÑA") {
             // console.log('Procesando CAMPAÑA:', valor);
            }
            
            // Formatear el valor
            if (valor === undefined || valor === null) {
              valor = '';
            } else if (valor instanceof Date) {
              valor = `${valor.getFullYear()}-${String(valor.getMonth() + 1).padStart(2, '0')}-${String(valor.getDate()).padStart(2, '0')}`;
            } else if (typeof valor === 'string' && valor.includes('T')) {
              // Si es un string de fecha en formato ISO
              if (cabecera === "FECHA") {
                valor = valor.split('T')[0];
              }
            }
            
            // Convertir a string de forma segura
            valor = String(valor);
            
            // Para el campo CAMPAÑA, asegurarnos de que se use el valor completo
            if (cabecera === "CAMPAÑA") {
            //  console.log('Valor final CAMPAÑA:', valor);
            }
            
            // Agregar a la línea
            line += valor;
            
            // Agregar tabulador si no es el último campo
            if (i < cabeceras.length - 1) {
              line += '\t';
            }
          }
          
          // Agregar salto de línea
          line += '\r\n';
          
          // Agregar la línea al contenido del archivo
          txtContent += line;
        }
        
        // Log de comprobación
        //console.log('Primeras 300 caracteres del contenido TXT:', txtContent.substring(0, 300));
        
        // Importar iconv para codificación
        const iconv = require('iconv-lite');
        
        // Usar REQUIRE directamente para JSZip
        const jszip = require('jszip');
        const zip = new jszip();
        
        // Agregar archivo TXT al ZIP 
        // Importante: usar codificación UTF-8 en lugar de Windows-1252 para evitar problemas de caracteres
        const txtBuffer = iconv.encode(txtContent, 'utf8');
        zip.file('HoraPosicion.txt', txtBuffer);
        
        // Generar el archivo ZIP en memoria con compresión
        const zipBuffer = await zip.generateAsync({ 
          type: 'nodebuffer', 
          compression: 'DEFLATE',
          compressionOptions: { level: 9 }
        });
        
        // Configurar los encabezados de respuesta
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', `attachment; filename="HoraPosicion.zip"`);
        res.setHeader('Content-Length', zipBuffer.length.toString());
        
        // Evitar serialización automática y problemas con removeListener
        res.send(zipBuffer); // Usar send en lugar de end
        return; // No devolver nada después
      } catch (zipError) {
        console.error('Error específico al generar ZIP:', zipError);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: 'Error al generar el archivo ZIP',
          error: zipError.message
        });
      }
    } else {
      // Si no hay datos, devolver un mensaje de error
      return res.status(HttpStatus.NOT_FOUND).json({ 
        success: false, 
        message: 'No se encontraron datos' 
      });
    }
  } catch (error) {
    // Capturar cualquier error durante la ejecución
    console.error('Error obteniendo el reporte de Hora/Posición:', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error obteniendo los datos',
      error: error.message
    });
  }
}

@Post('HoraPosicion2')
@ApiOperation({ summary: 'Obtener el reporte de Hora/Posición' })
async getHoraPosicion2(@Body() data: HoraPosicionDto) {
  try {
    // Log para verificar los parámetros recibidos
    console.log('Received data:', data);
    
    const { fechaInicio, fechaFin, campania } = data;

    // Llamar al servicio para obtener el reporte
    const resultado = await this.horaGestionService.consultarHoraPosicion(
      fechaInicio,
      fechaFin,      
      campania.join(','),
    );
    
    // Retornar directamente el resultado
    return {     
      resultado
    }
    
    
  } catch (error) {
    // Capturar cualquier error durante la ejecución
    console.error('Error obteniendo el reporte de Hora/Posición:', error);
    throw new HttpException({
      success: false,
      message: 'Error obteniendo los datos',
      error: error.message
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

}