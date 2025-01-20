import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { LoginResultDto } from './dto/login-result.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User,'primary')
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Ejecuta el procedimiento almacenado `SEG_Login_sp_UsuarioLogin`.
   *
   * @param login3 - Login del usuario.
   * @param password - Contraseña del usuario.
   * @param cEmpresa - Código de la empresa (por defecto "01").
   * @returns Resultado del procedimiento almacenado.
   */
  async login(
    login3: string,
    password: string,
    cEmpresa: string = '01', // Valor por defecto para cEmpresa
  ): Promise<User[]> {
    try {
      const result = await this.userRepository.query(
        `EXEC SEG_Login_sp_UsuarioLogin @CODUSUARIO = @0, @PASSWORD = @1, @CEMPRESA = @2`,
        [login3, password, cEmpresa],
      );

      if (!result || result.length === 0) {
        throw new UnauthorizedException('Usuario o contraseña incorrectos');
      }

      // Mapear los resultados al DTO
      return result.map((row: any) => ({
        codidenest: row.codidenest,
        sistema: row.sistema,
        idUsuario: row.idusuario,
        codUsuario: row.codusuario,
        bloqueado: row.Sbloqueado,
        fechaLogeo: row.FECHA_LOGEO,
        nombresUsuario: row.NombresUsuario,
        cEmpresa: row.CEmpresa,
        perfil: row.Perfil,
        intentos: row.nIntentos,
        nDiasRestantes: row.nDiasRestantes,
        solicitaCambio: !!row.lSolicitaCambio,
      }));
    } catch (error) {
      console.error('Error al ejecutar el procedimiento almacenado:', error.message);
      throw new UnauthorizedException('Error al autenticar al usuario.');
    }
  }
}
