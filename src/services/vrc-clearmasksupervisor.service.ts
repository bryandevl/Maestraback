// src/services/mask.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColumnasMask2 } from '../entities/columnas-mask.entity';
import { ObtenerColumnaMaskDto } from '../dtos/vrc-obtenermasksupervisor.dto'

@Injectable()
export class clearMascaraService {
  constructor(
    @InjectRepository(ColumnasMask2)
    private readonly maskRepository: Repository<ColumnasMask2>,
  ) {}

  async clearMaskByCampaign(dto: ObtenerColumnaMaskDto): Promise<{ success: boolean; affected: number }> {
    const result = await this.maskRepository
          .createQueryBuilder()
          .update(ColumnasMask2)
          .set({ celda: null, valor: null, estado: null })
          .where('campaign_id = :campaign_id', { campaign_id: dto.campania })
          .execute();

      return { success: true, affected: result.affected };
  }
}