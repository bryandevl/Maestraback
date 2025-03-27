import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsuarioOmnicanal } from 'src/entities/userOmni.entity';

@Injectable()
export class Pass3Service {
    constructor(
        @InjectRepository(UsuarioOmnicanal, 'OMNICANAL3') 
        private readonly usuarioRepo: Repository<UsuarioOmnicanal>,
    ) {}

    async actualizarPasswordPorLogin3(login: string, newPassword: string): Promise<void> {
        if (!newPassword || typeof newPassword !== 'string' || newPassword.trim() === '') {
            throw new Error('La nueva contraseña no puede estar vacía.');
        }

        const usuarios = await this.usuarioRepo
            .createQueryBuilder('usuario')
            .where('usuario.login = :login', { login }) // Se usa "=" en lugar de "LIKE"
            .getMany();

        if (usuarios.length === 0) {
            throw new Error('No se encontraron usuarios con ese login en OMNICANAL3');
        }

        // Generar salt correctamente antes de hashear
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        // Si necesitas compatibilidad con otro sistema, cambiar $2b$ por $2a$
        const hashCompat = hash.replace('$2b$', '$2a$');

        // Actualizar las contraseñas en paralelo
        await Promise.all(
            usuarios.map(async (usuario) => {
                usuario.password = hashCompat; // Usar hashCompat si el otro sistema requiere $2a$
                await this.usuarioRepo.save(usuario);
            })
        );
    }
}
