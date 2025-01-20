import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import config from 'src/config/config';

@Global()
@Module({
  imports: [
    // Conexión a la primera base de datos
    TypeOrmModule.forRootAsync({
      // Identificador de esta conexión
      useFactory: (configService: ConfigType<typeof config>) => ({
        type: 'mssql',
        host: configService.host,
        port: parseInt(configService.port_db),
        username: configService.user_name,
        password: configService.password,
        database: configService.database,
        options: {
          encrypt: true,
          trustServerCertificate: true,
        },
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [config.KEY],
    }),

    
  ],
})
export class DatabaseModule {}
