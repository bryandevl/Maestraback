import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioOmnicanal } from 'src/entities/userOmni.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        name: 'OMNICANAL3',
        type: 'mssql',
        host: '192.168.21.15',
        port: 1433,
        username: 'PowerBi',
        password: 'Aa123456',
        database: 'BD_OMNICANAL3',
        options: {
          encrypt: false,
          trustServerCertificate: true,
        },
        autoLoadEntities: true, //  Cambiar a true
        synchronize: false,
        logging: false,
      }), // Conexión a la base de datos
    TypeOrmModule.forFeature([UsuarioOmnicanal], 'OMNICANAL3'), // Registra la entidad
  ],
  exports: [TypeOrmModule], // Exportamos para que otros módulos lo usen
})
export class OmnicanalDatabaseModule3 {}
