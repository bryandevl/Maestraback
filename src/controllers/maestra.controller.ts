// campaign.controller.ts
import { Controller, Post , Get , Body ,Query} from '@nestjs/common';
import { CampaignService } from 'src/services/campania.service';

import { MainClientes } from 'src/entities/vrc-principal-cliente.entity';
import { ObtenerDatosCltDto } from 'src/dtos/vrc-obtenercliente.dto';
import { MainClientService } from 'src/services/vrc-principal-cliente.service';

import { PagosEntity } from 'src/entities/vrc-pagos.entity';
import { PagosClienteDto } from 'src/dtos/vrc-pagoscliente.dto';
import { PagosService } from 'src/services/vrc-pagos.service';

import { FotogestionesEntity } from 'src/entities/vrc-fotogestion.entity';
import { GestionService } from '../services/vrc-fotogestion.service';
import { ObtenerGestionDto } from 'src/dtos/vrc-obtenergestioncliente.dto';

<<<<<<< HEAD
=======
import { ObtenerWspmasivoClt } from 'src/entities/vrc-wspmasivo.entity';
import { ObtenerWspmasivoCltDto } from 'src/dtos/vrc-obtenerwspmasivo.dto';
import { ObtenerWspmasivoCltService } from 'src/services/vrc-wspmasivo.service';

import { ObtenerSmsMasivoCltDto } from 'src/dtos/vrc-obtenersmsmasivo.dto';
import { ObtenerSmsMasivoClt } from 'src/entities/vrc-smsmasivo.entity';
import { ObtenerSmsMasivoCltService } from 'src/services/vrc-smsmasivo.service';
>>>>>>> 9186b8a851e63817374324f46d3527511554b1b2

@Controller('maestra')
export class MaestraController {
  constructor(private readonly campaignService: CampaignService,
              private readonly clientMainService: MainClientService,
              private readonly pagosService: PagosService,
              private readonly gestionService: GestionService,
<<<<<<< HEAD
=======
              private readonly wspmasivoCltService: ObtenerWspmasivoCltService,
              private readonly smsmasivoCltService: ObtenerSmsMasivoCltService
>>>>>>> 9186b8a851e63817374324f46d3527511554b1b2
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
  async obtenerGestion(@Body() obtenerGestionDto: ObtenerGestionDto): Promise<FotogestionesEntity[]> {
    return this.gestionService.obtenerGestion(obtenerGestionDto);
  }

<<<<<<< HEAD
=======
  @Post('wspmasivo')
  async obtenerDatosWSP(@Body() dto: ObtenerWspmasivoCltDto) {
    return await this.wspmasivoCltService.obtenerDatos(dto);
  }

  @Post('smsmasivo')
  async obtenerDatosSMS(@Body() dto: ObtenerSmsMasivoCltDto) {
    return await this.smsmasivoCltService.obtenerDatos(dto);
  }
>>>>>>> 9186b8a851e63817374324f46d3527511554b1b2
}
