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

import { CampaignService } from './services/campania.service';
import { MainClientService } from './services/vrc-principal-cliente.service';
import { DatosAdicionalCltService } from './services/vrc-adicional-cliente.service';
import { PagosService } from './services/vrc-pagos.service';
import { GestionService } from './services/vrc-fotogestion.service';
import { ObtenerWspmasivoCltService } from './services/vrc-wspmasivo.service';
import { ObtenerSmsMasivoCltService } from './services/vrc-smsmasivo.service';

import { MaestraController } from './controllers/maestra.controller';

import { ExcelService } from './services/cargasignacion.service';
import {ExcelController} from './controllers/cargabases.controller';


import { FrPagosService } from './services/pagos.service';
import { FrPagos } from './entities/fr-pagos.entity';



@Module({
  imports: [
    TypeOrmModule.forFeature([Campaign,MainClientes,PagosEntity,FotogestionesEntity,ObtenerWspmasivoClt,ObtenerSmsMasivoClt,DatosAdicionalesCltEntity,FrPagos]), // Especificamos la conexión 'primary'
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
  providers: [CampaignService,MainClientService,PagosService,GestionService,ExcelService,ObtenerWspmasivoCltService,ObtenerSmsMasivoCltService,DatosAdicionalCltService,FrPagosService],
  controllers: [AppController, MaestraController,ExcelController],
})
export class AppModule {}