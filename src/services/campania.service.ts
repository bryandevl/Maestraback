// campaign.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from 'src/entities/campania.entity';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
  ) {}

  // Método que ejecuta el SELECT y devuelve los resultados
  async getCampaigns(): Promise<Campaign[]> {
    return this.campaignRepository.query(
      'SELECT campaign_id, campaign_name FROM DA_V_vicidial_campaings',
    );
  }
}