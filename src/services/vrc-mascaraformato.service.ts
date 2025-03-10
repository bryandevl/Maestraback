import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
    async upsertMascaraFormato(dto: MascaraFormatoDto): Promise<{ message: string; data: MascaraFormatoDto }> {
        try {
            const { campaign_id, celda, bgColor, txtColor } = dto;
            const existingRecord = await this.mascaraFormatoRepo
                .createQueryBuilder("mascara")
                .where("mascara.campaign_id = :campaign_id", { campaign_id })
                .andWhere("mascara.celda = :celda", { celda })
                .getOne();
            if (existingRecord) {
                // Si existe, actualiza
                await this.mascaraFormatoRepo
                    .createQueryBuilder()
                    .update(MascaraFormato)
                    .set({ bgColor, txtColor })
                    .where("campaign_id = :campaign_id", { campaign_id })
                    .andWhere("celda = :celda", { celda })
                    .execute();
                return {
                    message: "Registro actualizado correctamente.",
                    data: dto,
                };
            } else {
                // Si no existe, inserta
                await this.mascaraFormatoRepo
                    .createQueryBuilder()
                    .insert()
                    .into(MascaraFormato)
                    .values({ campaign_id, celda, bgColor, txtColor })
                    .execute();
                return {
                    message: "Registro insertado correctamente.",
                    data: dto,
                };
            }
        } catch (error) {
            throw new HttpException("Error al procesar la solicitud.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async selectMascaraFormato(campaign_id: string): Promise<{ celdas: MascaraFormato[] }> {
        try {
            const registros = await this.mascaraFormatoRepo
                .createQueryBuilder("mascara")
                .select(["mascara.celda", "mascara.bgColor", "mascara.txtColor"])
                .where("mascara.campaign_id = :campaign_id", { campaign_id })
                .getRawMany();
                console.log("Registros encontrados:", JSON.stringify(registros, null, 2));
            if (!registros.length) {
                throw new HttpException("No se encontraron registros para la campaña.", HttpStatus.NOT_FOUND);
            }
            return { celdas: registros };
        } catch (error) {
            console.error("Error en selectMascaraFormato:", error);
            throw new HttpException("Error al obtener los datos.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async clearMascaraFormato(campaign_id: string): Promise<{ message: string }> {
        try {
            await this.mascaraFormatoRepo.query(
                `UPDATE T_Mascaraformato SET bgColor = NULL, txtColor = NULL WHERE campaign_id = '${campaign_id}'`,
                [campaign_id]
            );
            return { message: `Colores limpiados para la campaña ${campaign_id}.` };
        } catch (error) {
            console.error("Error en resetColors:", error);
            throw new HttpException("Error al limpiar los colores de la campaña.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }    
}