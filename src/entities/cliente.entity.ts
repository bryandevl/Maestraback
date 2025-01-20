import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
//import { Pedido } from './pedido.entity';

@Entity({ name: 'clientes' })
export class Cliente {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	correlativo: string;

	//@ManyToOne(() => User, user => user.clientes)
	@JoinColumn({ name: 'user_id' })
	user: User;

	//@OneToMany(() => Pedido, pedido => pedido.cliente)
//	pedidos: Pedido[];

	@Column()
	user_identificador: string;

	//@OneToMany(() => User, user => user.clave_pedidos)
	asesor: User[];

	@Column()
	nombre: string;

	@Column()
	icelular: string;

	@Column()
	celular: number;

	@Column()
	tipo: number;

	@Column()
	provincia: string;

	@Column()
	distrito: string;

	@Column()
	estado_chat: string;

	@Column()
	motivo_exclusion: string;

	@Column()
	direccion: string;

	@Column()
	referencia: string;

	@Column()
	dni: string;

	@Column()
	saldo: number;

	@Column()
	deuda: number;

	@Column()
	pidio: number;

	@Column()
	estado: number;

	@Column()
	created_at: Date;

	@Column()
	updated_at: Date;

	@Column()
	crea_temporal: number;

	@Column()
	activado_tiempo: number;

	@Column()
	activado_pedido: number;

	@Column()
	temporal_update: Date;

	@Column()
	situacion: string;

	@Column()
	congelado: number;

	@Column()
	bloqueado: number;

	@Column()
	sust_bloqueado: string;

	@Column()
	sust_otro_bloqueado: string;

	@Column()
	sust_congelado: string;

	@Column()
	sust_otro_congelado: string;

	@Column()
	user_congelacion_id: number;

	@Column()
	responsable_congelacion: string;

	@Column()
	motivo_anulacion: string;

	@Column()
	responsable_anulacion: string;

	@Column()
	user_anulacion_id: number;

	@Column()
	fecha_anulacion: Date;

	@Column()
	path_adjunto_anular: string;

	@Column()
	path_adjunto_anular_disk: string;

	@Column()
	agenda: string;

	@Column()
	fecha_ultimopedido: Date;

	@Column()
	codigo_ultimopedido: string;

	@Column()
	pago_ultimopedido: number;

	@Column()
	pagado_ultimopedido: number;

	@Column()
	fsb_porcentaje: number;

	@Column()
	fcb_porcentaje: number;

	@Column()
	esb_porcentaje: number;

	@Column()
	ecb_porcentaje: number;

	@Column()
	user_bloqueado_id: number;

	@Column()
	responsable_bloqueo: string;

	@Column()
	llamado: number;

	@Column()
	asesor_llamado: string;

	@Column()
	user_llamado: number;

	@Column()
	fecha_llamado: Date;

	@Column()
	chateado: number;

	@Column()
	asesor_chateado: string;

	@Column()
	user_chateado: number;

	@Column()
	fecha_chateado: Date;

	@Column()
	total_llamadas: number;

	@Column()
	total_chats: number;

	@Column()
	grupo_publicidad: number;

	@Column()
	ultimo_mensaje: string;
}
