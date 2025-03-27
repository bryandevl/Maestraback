import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioOmnicanal } from 'src/entities/userOmni.entity';
import { randomBytes, pbkdf2Sync } from 'crypto';

@Injectable()
export class BlasterService {
    constructor(
        @InjectRepository(UsuarioOmnicanal, 'BLASTER') 
        private readonly usuarioRepo: Repository<UsuarioOmnicanal>,
    ) {}

    async BlasterPasswordPorLogin(login: string, newPassword: string): Promise<void> {
        if (!newPassword || typeof newPassword !== 'string' || newPassword.trim() === '') {
            throw new Error('La nueva contraseña no puede estar vacía.');
        }

        const usuarios = await this.usuarioRepo
            .createQueryBuilder('usuario')
            .where('usuario.login = :login', { login }) 
            .getMany();

        if (usuarios.length === 0) {
            throw new Error('No se encontraron usuarios con ese login en BLASTER');
        }

        // Generar salt aleatorio
        const salt = randomBytes(16).toString('base64');
        const iterations = 120000; // Cantidad de iteraciones
        const keyLength = 32; // Tamaño de la clave en bytes
        const digest = 'sha256';

        // Cifrar la contraseña usando PBKDF2
        const hash = pbkdf2Sync(newPassword, salt, iterations, keyLength, digest).toString('base64');

        // Formato esperado: pbkdf2_sha256$120000$salt$hash
        const hashedPassword = `pbkdf2_sha256$${iterations}$${salt}$${hash}`;

        // Actualizar las contraseñas en paralelo
        await Promise.all(
            usuarios.map(async (usuario) => {
                usuario.password = hashedPassword;
                await this.usuarioRepo.save(usuario);
            })
        );
    }
}
