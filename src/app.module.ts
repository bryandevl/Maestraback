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
import { PagosEntity } from './entities/vrc-pagos.entity'; 
import { FotogestionesEntity } from 'src/entities/vrc-fotogestion.entity';

import { CampaignService } from './services/campania.service';
import { MainClientService } from './services/vrc-principal-cliente.service';
import { PagosService } from './services/vrc-pagos.service';
import { GestionService } from './services/vrc-fotogestion.service';

import { MaestraController } from './controllers/maestra.controller';

import { ExcelService } from './services/cargasignacion.service';
import {ExcelController} from './controllers/cargabases.controller';




@Module({
  imports: [
    TypeOrmModule.forFeature([Campaign,MainClientes,PagosEntity,FotogestionesEntity]), // Especificamos la conexión 'primary'
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
  providers: [CampaignService,MainClientService,PagosService,GestionService,ExcelService],
  controllers: [AppController, MaestraController,ExcelController],
})
export class AppModule {}
