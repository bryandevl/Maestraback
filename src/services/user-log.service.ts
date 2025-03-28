import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLog } from '../entities/user-log.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserLogService {
  constructor(
    @InjectRepository(UserLog)
    private readonly userLogRepository: Repository<UserLog>,
  ) {}

  async createUser(correo: string, pass: string, caducida: number): Promise<UserLog> {
    try {
      const fecha_registra = new Date();
      const fecha_caduce = new Date();
      fecha_caduce.setDate(fecha_registra.getDate() + caducida);

      // Generar el hash de la contraseña con bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(pass, saltRounds);

      const user = this.userLogRepository.create({
        correo,
        pass: hashedPassword, // Guardamos la contraseña encriptada
        caducida,
        fecha_registra,
        fecha_caduce,
      });

      return await this.userLogRepository.save(user);
    } catch (error) {
      console.error('Error al insertar usuario:', error);
      throw new Error('No se pudo insertar el usuario.');
    }
  }
}
