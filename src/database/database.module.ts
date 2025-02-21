import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import config from 'src/config/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
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
        logging: true, // Desactiva logs en producción para mejorar rendimiento
        extra: {
          max: 1000, // Aumenta el número máximo de conexiones concurrentes
          connectionTimeoutMillis: 60000,
          idleTimeoutMillis: 30000,
        },
      }),
      inject: [config.KEY],
    }),
  ],
})
export class DatabaseModule {}
