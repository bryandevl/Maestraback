import { Controller, Post, Body, InternalServerErrorException } from '@nestjs/common';
import { Pass1Service } from 'src/services/Omni1.service';
import { Pass2Service } from 'src/services/Omni2.service';
import { Pass3Service } from 'src/services/Omni3.service';
import { BlasterService } from 'src/services/blaster.service';
import { ZimbraService } from 'src/services/zimbra.service';
import { AsteriskdService } from 'src/services/asterisk.service';
import {InfocallService} from 'src/services/infocall.service';


import { UserLogService   } from 'src/services/user-log.service';
import { UserLog  } from 'src/entities/user-log.entity'; // Asegúrate de que la ruta sea correcta


@Controller('usuarios')
export class PassController {
  constructor(
    private readonly pass1Service: Pass1Service,
    private readonly pass2Service: Pass2Service,
    private readonly pass3Service: Pass3Service,
    private readonly blasterService: BlasterService,
    private readonly zimbraService: ZimbraService,
    private readonly asteriskdService: AsteriskdService,
    private readonly infocallService: InfocallService,
    private readonly userLogService: UserLogService,
  ) {}

  @Post('uppassword')
  async actualizarPassword(@Body() body: { login: string; newPassword: string }) {
    const { login, newPassword } = body;
    const errores: string[] = [];
    
    // Extraer solo el usuario sin dominio para los otros servicios
    const username = login.includes('@') ? login.split('@')[0] : login;
    
    const user = login.includes('@') ? login.split('@')[0] : login;

    // Mantener el email tal como se ingresa
    const email = login;

 

    // Ejecutar cada actualización y capturar errores
    await Promise.allSettled([
      this.pass1Service.actualizarPasswordPorLogin(username, newPassword).catch(() => errores.push('OMNICANAL 1')),
      this.pass2Service.actualizarPasswordPorLogin2(username, newPassword).catch(() => errores.push('OMNICANAL 2')),
      this.pass3Service.actualizarPasswordPorLogin3(username, newPassword).catch(() => errores.push('OMNICANAL 3')),
      this.blasterService.BlasterPasswordPorLogin(username, newPassword).catch(() => errores.push('Blaster')),
      this.zimbraService.cambiarClave(email, newPassword).catch(() => errores.push('Zimbra')),
      this.infocallService.updatePassword(email, newPassword).catch(() => errores.push('Infocall')),
      this.asteriskdService.actualizarPassword(user, newPassword).catch(() => errores.push('Asteriskd')),
    ]);

    if (errores.length > 0) {
      throw new InternalServerErrorException(`Usuario no encontrado en: ${errores.join(', ')}`);
    }

    return { message: 'Contraseña actualizada correctamente en todos los servicios' };
  }



  @Post('userlog')
  async createUser(
    @Body('correo') correo: string,
    @Body('pass') pass: string,
    @Body('caducida') caducida: number,
  ): Promise<UserLog> {
    return this.userLogService.createUser(correo, pass, caducida);
  }


}
