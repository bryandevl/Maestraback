import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly key = Buffer.from('b14ca5898a4e4133bbce2ea2315a1916', 'utf-8');
  private readonly iv = Buffer.alloc(16, 0); // IV de 16 bytes en cero

  encrypt(text: string): string {
    const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
    let encrypted = cipher.update(text, 'utf-8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  }

  decrypt(encryptedText: string): string {
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, this.iv);
    let decrypted = decipher.update(encryptedText, 'base64', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
  }

  getEncryptedPayload(): { data: string } {
    const payload = {
      TaxId: '20155945860',
      User: '20185555',
      Password: 'daniel1706',
      Phone: '932490643',
      IP: '192.168.1.100',
      DateTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };

    const encryptedPayload = this.encrypt(JSON.stringify(payload));
    return { data: encryptedPayload };
  }
}