import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class InfocallService {
  constructor(private readonly httpService: HttpService) {}

  async updatePassword(email: string, newPassword: string): Promise<any> {
    const url = 'http://192.168.1.6:5000/users/update';
    const body = { email, newPassword };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body)
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error en la actualización');
    }
  }
}
