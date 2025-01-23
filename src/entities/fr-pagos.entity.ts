// file: src/pagos/entities/fr-pagos.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('FR_PAGOS')
export class FrPagos {
    
    @PrimaryColumn()
    cNUM_CUENTA: string;
  
    @Column({ nullable: true })
    cCAMPAIGN_ID: string;
  
    @Column({ nullable: true })
    cNUM_DOCUMENTO: string;
  
    @Column({ nullable: true })
    cOBSERVACION: string;
  
    @Column({ nullable: true })
    cPERIODO: string;
  
    @Column({ nullable: true })
    cCUOTA: string;
  
    @Column({ type: 'datetime', nullable: true })
    dFECHA_PAGO: Date;
  
    @Column({ type: 'int', nullable: true })
    nMONEDA: number;
  
    @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
    nMONTO: number;
  
    @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
    nMONTO_CONSIDERADO: number;
  
    @Column({ type: 'int', nullable: true })
    nSTATUS: number;
  
    @Column({ type: 'datetime', nullable: true })
    dFECHA_REGISTRO: Date;
  
    @Column({ type: 'datetime', nullable: true })
    dFECHA_MODIFICACION: Date;
  
    @Column({ nullable: true })
    list_id: string;
  
    @Column({ type: 'datetime', nullable: true })
    dFECHA_CARGA_CSV: Date;
      }
    