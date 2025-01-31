import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExcelService } from 'src/services/cargasignacion.service';
import { FrPagosService } from 'src/services/pagos.service';
import { MascaraService } from 'src/services/frmascara.service';
import { UploadExcelDto } from 'src/dtos/uploadExece.dto';
import { UploadDto } from 'src/dtos/pagos.dto';

import { BQCourierService } from 'src/services/BQCourrier.service';
import { CreateBQCourierDto } from 'src/dtos/BQCourrier.dto';
import { Express } from 'express';
import { Readable } from 'stream';
import * as csv from 'csv-parser';




import * as XLSX from 'xlsx';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService,
    private readonly pagosService: FrPagosService,
    private readonly mascaraService: MascaraService,
    private readonly bqCourierService: BQCourierService
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcel(
    @Body() uploadExcelDto: UploadExcelDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No se subió ningún archivo');
    }

    const { campaign_id, list_id } = uploadExcelDto;

    // Llamar al servicio para procesar el archivo
    return this.excelService.processExcel(file, campaign_id, list_id);
  }


  @Post('Pagos')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadDto,
  ) {
    const { list_id, cCAMPAIGN_ID } = body;
    return this.pagosService.uploadFile(file, list_id, cCAMPAIGN_ID);
  }



  @Post('Mascara')
  @UseInterceptors(FileInterceptor('file'))
  async MascaraExcel(
    @Body() uploadExcelDto: UploadExcelDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No se subió ningún archivo');
    }

    const { campaign_id, list_id } = uploadExcelDto;

    // Llamar al servicio para procesar el archivo
    return this.mascaraService.processExcel(file, campaign_id, list_id);
  }



  @Post('courrier')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileS(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateBQCourierDto) {
    return this.bqCourierService.processFile(file, dto);
  }


}