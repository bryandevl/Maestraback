import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AsteriskdService {
  private readonly endpoints = [
    'http://192.168.1.6:3000/users/password',
    'http://192.168.1.6:3001/users/password',
    'http://192.168.1.6:3002/users/password',
    'http://192.168.1.6:3003/users/password',
  ];

  async actualizarPassword(user: string, newPassword: string) {
    const body = { user, newPassword };
    const errores: string[] = [];

    await Promise.allSettled(
      this.endpoints.map((url) =>
        axios.post(url, body).catch(() => errores.push(url))
      )
    );

    if (errores.length > 0) {
      throw new InternalServerErrorException(`Error en los siguientes servicios: ${errores.join(', ')}`);
    }

    return { message: 'Contraseña actualizada correctamente en todos los servicios' };
  }
}
