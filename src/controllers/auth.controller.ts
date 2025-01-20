import { Body, Controller, Post, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/services/auth.service';
import { LoginDto } from 'src/dtos/login.dto';
import {UserListDto} from 'src/dtos/mantuser.dto';
import { UserService } from 'src/services/mantuser.service'; 


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly userService: UserService



  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login de usuario' })
  async login(@Body() loginDto: LoginDto) {
    const { login3, password, cEmpresa } = loginDto;

    // Validar formato de las credenciales recibidas
    if (!login3 || !password) {
      throw new BadRequestException('Faltan campos requeridos: login3 y/o password');
    }

    if (typeof login3 !== 'string' || typeof password !== 'string') {
      throw new BadRequestException('Credenciales deben ser cadenas de texto');
    }

    try {
      // Llamar al servicio de autenticación, pasando el valor de cEmpresa o usando '01' por defecto
      return await this.authService.login(login3, password, cEmpresa || '01');
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        // Si el servicio lanza UnauthorizedException, reenviarlo directamente
        throw error;
      }

      // Capturar errores específicos u otros fallos
      console.error('Error en la autenticación:', error.message);

      // Lanzar una respuesta genérica en caso de error inesperado
      throw new UnauthorizedException('Error durante el proceso de autenticación');
    }
  }



  @Post('list-users') // Nueva ruta
  @ApiOperation({ summary: 'Listar usuarios mediante procedimiento almacenado' })
  async listUsers(@Body() userListDto: UserListDto) {
    const { codusuario } = userListDto;

    if (!codusuario) {
      throw new BadRequestException('El campo codusuario es obligatorio');
    }

    try {
      // Llama al método del servicio para ejecutar el procedimiento almacenado
      return await this.userService.executeStoredProcedure(codusuario);
    } catch (error) {
      console.error('Error al listar usuarios:', error.message);
      throw new BadRequestException(
        'No se pudo ejecutar el procedimiento almacenado',
      );
    }
  }
}