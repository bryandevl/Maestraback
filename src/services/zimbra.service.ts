import { Injectable } from '@nestjs/common';
import { Client } from 'ssh2';

@Injectable()
export class ZimbraService {
  private servidor = '192.168.1.18';
  private usuario = 'root';
  private password = 'S4turn0$$22';

  async cambiarClave(email: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const conn = new Client();
      const comando = `/root/cambiar_clave.sh ${email} ${password}`;

      conn
        .on('ready', () => {
          conn.exec(comando, (err, stream) => {
            if (err) return reject(`Error ejecutando el comando: ${err.message}`);

            let salida = '';
            stream
              .on('data', (data) => (salida += data.toString()))
              .on('close', () => {
                conn.end();
                resolve(`✅ ${salida.trim()}`);
              });
          });
        })
        .on('error', (err) => reject(`Error de conexión SSH: ${err.message}`))
        .connect({
          host: this.servidor,
          port: 22,
          username: this.usuario,
          password: this.password,
        });
    });
  }
}
