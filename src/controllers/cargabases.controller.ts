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
import { UploadExcelDto } from 'src/dtos/uploadExece.dto';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

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
}
