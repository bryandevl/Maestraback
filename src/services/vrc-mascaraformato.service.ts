import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MascaraFormato } from 'src/entities/vrc-mascaraformato.entity';
import { MascaraFormatoDto } from 'src/dtos/vrc-mascaraformato.dto';

@Injectable()
export class MascaraFormatoService {
    constructor(
        @InjectRepository(MascaraFormato)
        private readonly mascaraFormatoRepo: Repository<MascaraFormato>,
    ) {}
    async upsertMascaraFormato(dto: MascaraFormatoDto): Promise<MascaraFormato> {
        const { campaign_id, celda, bgColor, txtColor } = dto;
        let record = await this.mascaraFormatoRepo.findOne({ where: { campaign_id, celda } });
        if (record) {
            // Si existe, actualiza los colores
            record.bgColor = bgColor;
            record.txtColor = txtColor;
        } else {
            // Si no existe, crea un nuevo registro
            record = this.mascaraFormatoRepo.create(dto);
        }
        return this.mascaraFormatoRepo.save(record);
    }
}