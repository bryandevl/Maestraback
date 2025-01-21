// campaign.controller.ts
import { Controller, Post , Get , Body ,Query} from '@nestjs/common';
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
              private readonly ivrmasivoCltService: ObtenerIvrMasivoCltService
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

}