// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import config, { validation } from './config/config';
import * as Joi from 'joi';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Campaign } from './entities/campania.entity';
import { MainClientes } from './entities/vrc-principal-cliente.entity';
import { DatosAdicionalesCltEntity } from './entities/vrc-adicional-cliente.entity';
import { PagosEntity } from './entities/vrc-pagos.entity'; 
import { FotogestionesEntity } from 'src/entities/vrc-fotogestion.entity';
import { ObtenerWspmasivoClt } from './entities/vrc-wspmasivo.entity';
import { ObtenerSmsMasivoClt } from './entities/vrc-smsmasivo.entity';
import { DetalleDeudaCltEntity } from './entities/vrc-detalledeuda.entity';
import { ObtenerIvrMasivoClt } from './entities/vrc-ivrmasivo.entity';
import { ColumnaMask } from './entities/vrc-masksupervisor.entity';
import { UpdateColumnMask } from 'src/entities/vrc-updatemasksupervisor.entity';
import { MascaraFormato } from './entities/vrc-mascaraformato.entity';

import { CampaignService } from './services/campania.service';
import { MainClientService } from './services/vrc-principal-cliente.service';
import { DatosAdicionalCltService } from './services/vrc-adicional-cliente.service';
import { PagosService } from './services/vrc-pagos.service';
import { GestionService } from './services/vrc-fotogestion.service';
import { ObtenerWspmasivoCltService } from './services/vrc-wspmasivo.service';
import { ObtenerSmsMasivoCltService } from './services/vrc-smsmasivo.service';
import { DetalleDeudaCltService } from './services/vrc-detalledeuda.service';
import { ObtenerIvrMasivoCltService } from './services/vrc-ivrmasivo.service';
import { FrPagosService } from './services/pagos.service';
import { MascaraService } from './services/frmascara.service';
import { ColumnaMaskService } from './services/vrc-masksupervisor.service';
import { UpdateColumnMaskService } from 'src/services/vrc-updatemasksupervisor.service';
import {ColumnasMask2} from './entities/columnas-mask.entity';
import {ColumnasMaskService2} from './services/columnas-mask.service';

import { VrcResultMaskService } from './services/vrc-resultmask.service';
import { clearMascaraService } from './services/vrc-clearmasksupervisor.service';
import { MascaraFormatoService } from './services/vrc-mascaraformato.service';

import { MaestraController } from './controllers/maestra.controller';

import { ExcelService } from './services/cargasignacion.service';
import {ExcelController} from './controllers/cargabases.controller';

import { BqCourier } from 'src/entities/BqCourier.entity';
import { BQCourierService } from './services/BQCourrier.service';


import { EncryptionService } from './services/pass.service';

import {AsteriskdService} from 'src/services/asterisk.service';

import { HttpModule } from '@nestjs/axios';
import {UserLogService} from './services/user-log.service'; 
import {UserLog} from './entities/user-log.entity'; // Asegúrate de que la ruta sea correcta


import { vrcDatosClienteEntity } from './entities/vrc-datos-cliente.entity';
import { vrcResultadoClienteService } from './services/vrc-resultadocliente.service';
import { HoraGestionService } from './services/horaposicion.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Campaign,MainClientes,PagosEntity,FotogestionesEntity,ObtenerWspmasivoClt,ObtenerSmsMasivoClt,DatosAdicionalesCltEntity,DetalleDeudaCltEntity,ObtenerIvrMasivoClt,BqCourier,ColumnaMask,UpdateColumnMask,ColumnasMask2,MascaraFormato,UserLog,vrcDatosClienteEntity]), // Especificamos la conexión 'primary'
    ConfigModule.forRoot({
      // * Definimos que es global
      isGlobal: true,
      // * Definimos el archivo de configuracion
      envFilePath: '.env',
      // * Definimos el esquema y la validacion
      load: [config],
      validationSchema: Joi.object(validation),
    }),
    DatabaseModule,
 
    
  ],
  providers: [CampaignService,MainClientService,PagosService,GestionService,ExcelService,ObtenerWspmasivoCltService,ObtenerSmsMasivoCltService,DatosAdicionalCltService,ObtenerIvrMasivoCltService,DetalleDeudaCltService,FrPagosService,MascaraService,BQCourierService,ColumnaMaskService,UpdateColumnMaskService,ColumnasMaskService2,VrcResultMaskService,clearMascaraService,MascaraFormatoService,EncryptionService,AsteriskdService,UserLogService,vrcResultadoClienteService,HoraGestionService],
  controllers: [AppController, MaestraController,ExcelController],
})
export class AppModule {}