import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLog } from '../entities/user-log.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';


//Cargar variables de entorno
dotenv.config();

const SECRET_KEY = (process.env.SECRET_KEY || 'defaultSecretKey').padEnd(32, '0'); // Asegura 32 bytes
const IV_LENGTH = 16; // Longitud estándar del IV para AES



@Injectable()
export class UserLogService {
  constructor(
    @InjectRepository(UserLog)
    private readonly userLogRepository: Repository<UserLog>,
  ) {}

 // 🔹 Cifrar contraseña con AES-256-CBC
 private encryptPassword(password: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SECRET_KEY), iv);
    let encrypted = cipher.update(password, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted; // Guardamos el IV junto con el cifrado
  }

  // 🔹 Descifrar contraseña con AES-256-CBC
  private decryptPassword(encryptedPassword: string): string {
    const iv = Buffer.from(encryptedPassword.slice(0, 32), 'hex');
    const encryptedText = encryptedPassword.slice(32);
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(SECRET_KEY), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
  }

  // 🔹 Crear o actualizar usuario con contraseña cifrada
  async createOrUpdateUser(correo: string, pass: string, caducida: number): Promise<UserLog> {
    try {
      const fecha_registra = new Date();
      const fecha_caduce = new Date();
      fecha_caduce.setDate(fecha_registra.getDate() + caducida);

      let user = await this.userLogRepository.findOne({ where: { correo } });

      const encryptedPassword = this.encryptPassword(pass);

      if (user) {
        user.pass = encryptedPassword;
        user.caducida = caducida;
        user.fecha_registra = fecha_registra;
        user.fecha_caduce = fecha_caduce;
      } else {
        user = this.userLogRepository.create({
          correo,
          pass: encryptedPassword,
          caducida,
          fecha_registra,
          fecha_caduce,
        });
      }

      return await this.userLogRepository.save(user);
    } catch (error) {
      console.error('Error al insertar o actualizar usuario:', error);
      throw new Error('No se pudo insertar o actualizar el usuario.');
    }
  }

  // 🔹 Nueva función para obtener todos los usuarios
  async getAllUsers(): Promise<UserLog[]> {
    try {
      return await this.userLogRepository.find();
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      throw new Error('No se pudieron obtener los usuarios.');
    }
  }

  // 🔹 Función para obtener la contraseña desencriptada por correo
  async getPasswordByEmail(correo: string): Promise<string> {
    try {
      const user = await this.userLogRepository.findOne({ where: { correo } });
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      return this.decryptPassword(user.pass);
    } catch (error) {
      console.error('Error al obtener la contraseña:', error);
      throw new Error('No se pudo obtener la contraseña.');
    }
  }











}
