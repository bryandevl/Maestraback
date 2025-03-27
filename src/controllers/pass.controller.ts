import { Controller, Get } from '@nestjs/common';
import { EncryptionService } from 'src/services/pass.service';

@Controller('encryption')
export class EncryptionController {
  constructor(private readonly encryptionService: EncryptionService) {}

  @Get('encrypt')
  encryptPayload() {
    return this.encryptionService.getEncryptedPayload();
  }
}
