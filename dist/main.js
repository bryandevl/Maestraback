/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateDocumentacion = void 0;
const swagger_1 = __webpack_require__(4);
const app_module_1 = __webpack_require__(5);
function generateDocumentacion(app) {
    const pdfMod = new swagger_1.DocumentBuilder()
        .setTitle('Exports')
        .setDescription('Exports')
        .setVersion(process.env.APP_VERSION)
        .build();
    const pdfDocument = swagger_1.SwaggerModule.createDocument(app, pdfMod, {
        include: [app_module_1.AppModule],
    });
    swagger_1.SwaggerModule.setup('docs/exports', app, pdfDocument);
}
exports.generateDocumentacion = generateDocumentacion;


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(2);
const app_controller_1 = __webpack_require__(6);
const database_module_1 = __webpack_require__(13);
const config_1 = __webpack_require__(16);
const config_2 = __webpack_require__(15);
const Joi = __webpack_require__(17);
const typeorm_1 = __webpack_require__(14);
const campania_entity_1 = __webpack_require__(18);
const vrc_principal_cliente_entity_1 = __webpack_require__(20);
const vrc_adicional_cliente_entity_1 = __webpack_require__(21);
const vrc_pagos_entity_1 = __webpack_require__(22);
const vrc_fotogestion_entity_1 = __webpack_require__(23);
const vrc_wspmasivo_entity_1 = __webpack_require__(24);
const vrc_smsmasivo_entity_1 = __webpack_require__(25);
const vrc_detalledeuda_entity_1 = __webpack_require__(26);
const vrc_ivrmasivo_entity_1 = __webpack_require__(27);
const vrc_masksupervisor_entity_1 = __webpack_require__(28);
const vrc_updatemasksupervisor_entity_1 = __webpack_require__(29);
const campania_service_1 = __webpack_require__(30);
const vrc_principal_cliente_service_1 = __webpack_require__(31);
const vrc_adicional_cliente_service_1 = __webpack_require__(32);
const vrc_pagos_service_1 = __webpack_require__(33);
const vrc_fotogestion_service_1 = __webpack_require__(34);
const vrc_wspmasivo_service_1 = __webpack_require__(35);
const vrc_smsmasivo_service_1 = __webpack_require__(36);
const vrc_detalledeuda_service_1 = __webpack_require__(37);
const vrc_ivrmasivo_service_1 = __webpack_require__(38);
const pagos_service_1 = __webpack_require__(39);
const frmascara_service_1 = __webpack_require__(41);
const vrc_masksupervisor_service_1 = __webpack_require__(42);
const vrc_updatemasksupervisor_service_1 = __webpack_require__(43);
const columnas_mask_entity_1 = __webpack_require__(44);
const columnas_mask_service_1 = __webpack_require__(45);
const maestra_controller_1 = __webpack_require__(46);
const cargasignacion_service_1 = __webpack_require__(57);
const cargabases_controller_1 = __webpack_require__(58);
const BQCourier_entity_1 = __webpack_require__(64);
const BQCourrier_service_1 = __webpack_require__(62);
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([campania_entity_1.Campaign, vrc_principal_cliente_entity_1.MainClientes, vrc_pagos_entity_1.PagosEntity, vrc_fotogestion_entity_1.FotogestionesEntity, vrc_wspmasivo_entity_1.ObtenerWspmasivoClt, vrc_smsmasivo_entity_1.ObtenerSmsMasivoClt, vrc_adicional_cliente_entity_1.DatosAdicionalesCltEntity, vrc_detalledeuda_entity_1.DetalleDeudaCltEntity, vrc_ivrmasivo_entity_1.ObtenerIvrMasivoClt, BQCourier_entity_1.BqCourier, vrc_masksupervisor_entity_1.ColumnaMask, vrc_updatemasksupervisor_entity_1.UpdateColumnMask, columnas_mask_entity_1.ColumnasMask2]),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
                load: [config_2.default],
                validationSchema: Joi.object(config_2.validation),
            }),
            database_module_1.DatabaseModule,
        ],
        providers: [campania_service_1.CampaignService, vrc_principal_cliente_service_1.MainClientService, vrc_pagos_service_1.PagosService, vrc_fotogestion_service_1.GestionService, cargasignacion_service_1.ExcelService, vrc_wspmasivo_service_1.ObtenerWspmasivoCltService, vrc_smsmasivo_service_1.ObtenerSmsMasivoCltService, vrc_adicional_cliente_service_1.DatosAdicionalCltService, vrc_ivrmasivo_service_1.ObtenerIvrMasivoCltService, vrc_detalledeuda_service_1.DetalleDeudaCltService, pagos_service_1.FrPagosService, frmascara_service_1.MascaraService, BQCourrier_service_1.BQCourierService, vrc_masksupervisor_service_1.ColumnaMaskService, vrc_updatemasksupervisor_service_1.UpdateColumnMaskService, columnas_mask_service_1.ColumnasMaskService2],
        controllers: [app_controller_1.AppController, maestra_controller_1.MaestraController, cargabases_controller_1.ExcelController],
    })
], AppModule);


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(4);
const excel_dto_1 = __webpack_require__(7);
const node_1 = __webpack_require__(10);
const response_1 = __webpack_require__(11);
const utils_1 = __webpack_require__(12);
let AppController = exports.AppController = class AppController {
    async getExcel(dto) {
        const schema = (0, utils_1.convertRows)(dto.schema);
        const data = dto.data;
        const buffer = await (0, node_1.default)(data, {
            schema,
            buffer: true,
        });
        return (0, response_1.customResponse)('excel', buffer.toString('base64'));
    }
};
__decorate([
    (0, common_1.Post)('excel'),
    (0, swagger_1.ApiOperation)({ summary: 'Reporte de RUCs' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof excel_dto_1.ExcelDto !== "undefined" && excel_dto_1.ExcelDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getExcel", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)()
], AppController);


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExcelDto = exports.SchemaDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_transformer_1 = __webpack_require__(8);
const class_validator_1 = __webpack_require__(9);
class SchemaDto {
}
exports.SchemaDto = SchemaDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SchemaDto.prototype, "column", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", Object)
], SchemaDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], SchemaDto.prototype, "width", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], SchemaDto.prototype, "format", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SchemaDto.prototype, "value", void 0);
class ExcelDto {
}
exports.ExcelDto = ExcelDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SchemaDto),
    (0, swagger_1.ApiProperty)({ type: [SchemaDto] }),
    __metadata("design:type", Array)
], ExcelDto.prototype, "schema", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => Object),
    (0, swagger_1.ApiProperty)({ type: [Object] }),
    __metadata("design:type", Array)
], ExcelDto.prototype, "data", void 0);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("write-excel-file/node");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.customResponse = void 0;
const customResponse = (message = 'Operacion Exitosa', body = null, statusCode = 200) => {
    return {
        statusCode,
        message,
        body,
    };
};
exports.customResponse = customResponse;


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HeadReniec2018 = exports.HeadSBS = exports.HeadSBSDetalle = exports.HeadEssalud = exports.HeadMovistar = exports.HeadFamiliar = exports.HeadCorreo = exports.convertRows = void 0;
const convertRows = (schema) => {
    const newData = [];
    schema.forEach(e => {
        const dd = {};
        for (const key in e) {
            if (Object.prototype.hasOwnProperty.call(e, key)) {
                if (key === 'value') {
                    dd[key] = d => d[e[key]];
                    continue;
                }
                if (key === 'type') {
                    switch (e[key]) {
                        case 'string':
                            dd[key] = String;
                            break;
                        case 'date':
                            dd[key] = Date;
                            break;
                        case 'number':
                            dd[key] = Number;
                            break;
                        case 'boolean':
                            dd[key] = Boolean;
                            break;
                        default:
                            dd[key] = String;
                            break;
                    }
                }
                else {
                    dd[key] = e[key];
                }
            }
        }
        newData.push(dd);
    });
    return newData;
};
exports.convertRows = convertRows;
exports.HeadCorreo = [
    {
        column: 'DOCUMENTO',
        type: 'string',
        format: '',
        value: 'documento',
        width: 15,
    },
    {
        column: 'CORREO',
        type: 'string',
        format: '',
        value: 'correo',
        width: 50,
    },
    {
        column: 'VALIDADO',
        type: 'string',
        format: '',
        value: 'validado',
        width: 3,
    }
];
exports.HeadFamiliar = [
    {
        column: 'DOCUMENTO',
        type: 'string',
        format: '',
        value: 'documento',
        width: 15,
    },
    {
        column: 'DOCUMENTO PARIENTE',
        type: 'string',
        format: '',
        value: 'doc_parent',
        width: 15,
    },
    {
        column: 'NOMBRE',
        type: 'string',
        format: '',
        value: 'nombre',
        width: 50,
    },
    {
        column: 'TIPO',
        type: 'string',
        format: '',
        value: 'tipo',
        width: 10,
    },
];
exports.HeadMovistar = [
    {
        column: 'Documento',
        type: 'number',
        format: '',
        value: 'documento',
        width: 15,
    },
    {
        column: 'NOMBRE',
        type: 'number',
        format: '',
        value: 'nombre',
        width: 50,
    },
    {
        column: 'NUMERO',
        type: 'number',
        format: '',
        value: 'numero',
        width: 10,
    },
    {
        column: 'ORIGEN DATA',
        type: 'string',
        format: '',
        value: 'origen_data',
        width: 45,
    },
    {
        column: 'FECHA DATA',
        type: 'string',
        format: '',
        value: 'fecha_data',
        width: 15,
    },
    {
        column: 'WSP',
        type: 'number',
        format: '',
        value: 'with_whatsapp',
        width: 5,
    },
];
exports.HeadEssalud = [
    {
        column: 'DOCUMENTO',
        type: 'number',
        format: '',
        value: 'documento',
        width: 10,
    },
    {
        column: 'EMPRESA',
        type: 'string',
        format: '',
        value: 'empresa',
        width: 60,
    },
    {
        column: 'PERIODO',
        type: 'string',
        format: '',
        value: 'periodo',
        width: 7,
    },
    {
        column: 'RUC',
        type: 'string',
        format: '',
        value: 'ruc',
        width: 13,
    },
    {
        column: 'CONDICION',
        type: 'string',
        format: '',
        value: 'condicion',
        width: 3,
    },
    {
        column: 'SUELDO',
        type: 'string',
        format: '',
        value: 'sueldo',
        width: 12,
    },
];
exports.HeadSBSDetalle = [
    {
        column: 'DOCUMENTO',
        type: 'string',
        format: '',
        value: 'documento',
        width: 15,
    },
    {
        column: 'FECHA REPORTE',
        type: 'string',
        format: '',
        value: 'fecha_reporte',
        width: 15,
    },
    {
        column: 'RUC',
        type: 'string',
        format: '',
        value: 'ruc',
        width: 15,
    },
    {
        column: 'CÓDIGO SBS',
        type: 'string',
        format: '',
        value: 'cod_sbs',
        width: 15,
    },
    {
        column: 'ENTIDAD',
        type: 'string',
        format: '',
        value: 'entidad',
        width: 25,
    },
    {
        column: 'TIPO CRÉDITO',
        type: 'string',
        format: '',
        value: 'tipo_credito',
        width: 25,
    },
    {
        column: 'CONDICIÓN',
        type: 'string',
        format: '',
        value: 'condicion',
        width: 15,
    },
    {
        column: 'SALDO',
        type: 'number',
        format: '#,##0.00',
        value: 'saldo',
        width: 15,
    },
    {
        column: 'DÍAS DE ATRASO',
        type: 'number',
        format: '',
        value: 'dias_atraso',
        width: 15,
    },
];
exports.HeadSBS = [
    {
        column: 'DOCUMENTO',
        type: 'string',
        format: '',
        value: 'sbs_documento',
        width: 15,
    },
    {
        column: 'CÓDIGO SBS',
        type: 'string',
        format: '',
        value: 'sbs_cod_sbs',
        width: 15,
    },
    {
        column: 'FECHA REPORTE SBS',
        type: 'string',
        format: '',
        value: 'sbs_fecha_reporte_sbs',
        width: 20,
    },
    {
        column: 'RUC',
        type: 'string',
        format: '',
        value: 'sbs_ruc',
        width: 15,
    },
    {
        column: 'CANTIDAD DE EMPRESAS',
        type: 'number',
        format: '',
        value: 'sbs_cant_empresas',
        width: 20,
    },
    {
        column: 'CALIFICACIÓN NORMAL',
        type: 'number',
        format: '0.00',
        value: 'sbs_calificacion_normal',
        width: 20,
    },
    {
        column: 'CALIFICACIÓN CPP',
        type: 'number',
        format: '0.00',
        value: 'sbs_calificacion_cpp',
        width: 20,
    },
    {
        column: 'CALIFICACIÓN DEFICIENTE',
        type: 'number',
        format: '0.00',
        value: 'sbs_calificacion_deficiente',
        width: 20,
    },
    {
        column: 'CALIFICACIÓN DUDOSO',
        type: 'number',
        format: '0.00',
        value: 'sbs_calificacion_dudoso',
        width: 20,
    },
    {
        column: 'CALIFICACIÓN PÉRDIDA',
        type: 'number',
        format: '0.00',
        value: 'sbs_calificacion_perdida',
        width: 20,
    }
];
exports.HeadReniec2018 = [
    {
        column: 'DOCUMENTO',
        type: 'number',
        format: '',
        value: 'reniec_2018_documento',
        width: 10,
    },
    {
        column: 'APELLIDO PATERNO',
        type: 'string',
        format: '',
        value: 'reniec_2018_apellido_pat',
        width: 20,
    },
    {
        column: 'APELLIDO MATERNO',
        type: 'string',
        format: '',
        value: 'reniec_2018_apellido_mat',
        width: 20,
    },
    {
        column: 'NOMBRE',
        type: 'string',
        format: '',
        value: 'reniec_2018_nombre',
        width: 20,
    },
    {
        column: 'FECHA NACIMIENTO',
        type: 'string',
        format: '',
        value: 'reniec_2018_fec_nac',
        width: 20,
    },
    {
        column: 'UBIGEO',
        type: 'string',
        format: '',
        value: 'reniec_2018_ubigeo',
        width: 10,
    },
    {
        column: 'UBIGEO DIRECCION',
        type: 'string',
        format: '',
        value: 'reniec_2018_ubigeo_dir',
        width: 30,
    },
    {
        column: 'DIRECCION',
        type: 'string',
        format: '',
        value: 'reniec_2018_direccion',
        width: 45,
    },
    {
        column: 'SEXO',
        type: 'number',
        format: '',
        value: 'reniec_2018_sexo',
        width: 3,
    },
    {
        column: 'E.CIVIL',
        type: 'string',
        format: '',
        value: 'reniec_2018_edo_civil',
        width: 8,
    },
    {
        column: 'DIG.RUC',
        type: 'number',
        format: '',
        value: 'reniec_2018_dig_ruc',
        width: 3,
    },
    {
        column: 'NOM.MADRE',
        type: 'string',
        format: '',
        value: 'reniec_2018_nombre_mad',
        width: 15,
    },
    {
        column: 'NOM.PADRE',
        type: 'string',
        format: '',
        value: 'reniec_2018_nombre_pat',
        width: 15,
    },
];


/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(14);
const config_1 = __webpack_require__(15);
let DatabaseModule = exports.DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (configService) => ({
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
                    logging: true,
                    extra: {
                        max: 1000,
                        connectionTimeoutMillis: 60000,
                        idleTimeoutMillis: 30000,
                    },
                }),
                inject: [config_1.default.KEY],
            }),
        ],
    })
], DatabaseModule);


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validation = void 0;
const config_1 = __webpack_require__(16);
const Joi = __webpack_require__(17);
exports["default"] = (0, config_1.registerAs)('config', () => ({
    port: process.env.PORT,
    host: process.env.HOST,
    port_db: process.env.PORT_DB,
    user_name: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
}));
exports.validation = {
    PORT: Joi.number().required(),
    HOST: Joi.string().required(),
    PORT_DB: Joi.number().required(),
    USER_NAME: Joi.string().required(),
    PASSWORD: Joi.string().required(),
    DATABASE: Joi.string().required(),
};


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("joi");

/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Campaign = void 0;
const typeorm_1 = __webpack_require__(19);
let Campaign = exports.Campaign = class Campaign {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Campaign.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Campaign.prototype, "campaign_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Campaign.prototype, "campaign_name", void 0);
exports.Campaign = Campaign = __decorate([
    (0, typeorm_1.Entity)({ name: 'DA_V_vicidial_campaings' })
], Campaign);


/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MainClientes = void 0;
const typeorm_1 = __webpack_require__(19);
let MainClientes = exports.MainClientes = class MainClientes {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MainClientes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MainClientes.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MainClientes.prototype, "nombre_cliente", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MainClientes.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MainClientes.prototype, "edad", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MainClientes.prototype, "direccion_cliente", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MainClientes.prototype, "departamento_cliente", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MainClientes.prototype, "provincia_cliente", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MainClientes.prototype, "distrito_cliente", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MainClientes.prototype, "campania", void 0);
exports.MainClientes = MainClientes = __decorate([
    (0, typeorm_1.Entity)({ name: 'SP_CR_ObtenerDatosClt_VRC' })
], MainClientes);


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatosAdicionalesCltEntity = void 0;
const typeorm_1 = __webpack_require__(19);
let DatosAdicionalesCltEntity = exports.DatosAdicionalesCltEntity = class DatosAdicionalesCltEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DatosAdicionalesCltEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DatosAdicionalesCltEntity.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DatosAdicionalesCltEntity.prototype, "num_cta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DatosAdicionalesCltEntity.prototype, "campania", void 0);
exports.DatosAdicionalesCltEntity = DatosAdicionalesCltEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'SP_CR_ObtenerDatosPorCampaña_VRC' })
], DatosAdicionalesCltEntity);


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PagosEntity = void 0;
const typeorm_1 = __webpack_require__(19);
let PagosEntity = exports.PagosEntity = class PagosEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PagosEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PagosEntity.prototype, "num_cta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PagosEntity.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PagosEntity.prototype, "tip_producto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PagosEntity.prototype, "campania", void 0);
__decorate([
    (0, typeorm_1.Column)('date'),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], PagosEntity.prototype, "fec_pago", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], PagosEntity.prototype, "monto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PagosEntity.prototype, "periodo", void 0);
exports.PagosEntity = PagosEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'SP_CR_ObtenerPagosClt_VRC' })
], PagosEntity);


/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FotogestionesEntity = void 0;
const typeorm_1 = __webpack_require__(19);
let FotogestionesEntity = exports.FotogestionesEntity = class FotogestionesEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FotogestionesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], FotogestionesEntity.prototype, "FEC_GESTION", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], FotogestionesEntity.prototype, "HOR_GESTION", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FotogestionesEntity.prototype, "MARCACION", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FotogestionesEntity.prototype, "ESTADO", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FotogestionesEntity.prototype, "COD_GESTOR", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FotogestionesEntity.prototype, "NUM_CTA", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FotogestionesEntity.prototype, "TELEFONO", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FotogestionesEntity.prototype, "ORIGEN", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FotogestionesEntity.prototype, "FECHA_PDP", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FotogestionesEntity.prototype, "MONTO_PDP", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FotogestionesEntity.prototype, "COMENTARIO", void 0);
exports.FotogestionesEntity = FotogestionesEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'SP_CR_ObtenerGestionClt_VRC' })
], FotogestionesEntity);


/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObtenerWspmasivoClt = void 0;
const typeorm_1 = __webpack_require__(19);
let ObtenerWspmasivoClt = exports.ObtenerWspmasivoClt = class ObtenerWspmasivoClt {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ObtenerWspmasivoClt.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ObtenerWspmasivoClt.prototype, "documento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ObtenerWspmasivoClt.prototype, "cuenta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ObtenerWspmasivoClt.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ObtenerWspmasivoClt.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ObtenerWspmasivoClt.prototype, "mensaje", void 0);
exports.ObtenerWspmasivoClt = ObtenerWspmasivoClt = __decorate([
    (0, typeorm_1.Entity)('ObtenerWspmasivoClt')
], ObtenerWspmasivoClt);


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObtenerSmsMasivoClt = void 0;
const typeorm_1 = __webpack_require__(19);
let ObtenerSmsMasivoClt = exports.ObtenerSmsMasivoClt = class ObtenerSmsMasivoClt {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ObtenerSmsMasivoClt.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ObtenerSmsMasivoClt.prototype, "documento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ObtenerSmsMasivoClt.prototype, "cuenta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ObtenerSmsMasivoClt.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ObtenerSmsMasivoClt.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ObtenerSmsMasivoClt.prototype, "mensaje", void 0);
exports.ObtenerSmsMasivoClt = ObtenerSmsMasivoClt = __decorate([
    (0, typeorm_1.Entity)('ObtenerSmsMasivoClt')
], ObtenerSmsMasivoClt);


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DetalleDeudaCltEntity = void 0;
const typeorm_1 = __webpack_require__(19);
let DetalleDeudaCltEntity = exports.DetalleDeudaCltEntity = class DetalleDeudaCltEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DetalleDeudaCltEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DetalleDeudaCltEntity.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DetalleDeudaCltEntity.prototype, "num_cta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DetalleDeudaCltEntity.prototype, "campania", void 0);
exports.DetalleDeudaCltEntity = DetalleDeudaCltEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'SP_CR_ObtenerDetalleDeudaClt_VRC' })
], DetalleDeudaCltEntity);


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObtenerIvrMasivoClt = void 0;
const typeorm_1 = __webpack_require__(19);
let ObtenerIvrMasivoClt = exports.ObtenerIvrMasivoClt = class ObtenerIvrMasivoClt {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ObtenerIvrMasivoClt.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ObtenerIvrMasivoClt.prototype, "documento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ObtenerIvrMasivoClt.prototype, "cuenta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ObtenerIvrMasivoClt.prototype, "campaign_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ObtenerIvrMasivoClt.prototype, "fec_gestion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], ObtenerIvrMasivoClt.prototype, "hor_gestion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ObtenerIvrMasivoClt.prototype, "status", void 0);
exports.ObtenerIvrMasivoClt = ObtenerIvrMasivoClt = __decorate([
    (0, typeorm_1.Entity)('ObtenerIvrMasivoClt')
], ObtenerIvrMasivoClt);


/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColumnaMask = void 0;
const typeorm_1 = __webpack_require__(19);
let ColumnaMask = exports.ColumnaMask = class ColumnaMask {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ColumnaMask.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ColumnaMask.prototype, "campania", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ColumnaMask.prototype, "columna", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ColumnaMask.prototype, "etiqueta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ColumnaMask.prototype, "celda", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ColumnaMask.prototype, "valor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ColumnaMask.prototype, "estado", void 0);
exports.ColumnaMask = ColumnaMask = __decorate([
    (0, typeorm_1.Entity)({ name: 'SP_CR_ObtenerColumnaMask_VRC' })
], ColumnaMask);


/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateColumnMask = void 0;
const typeorm_1 = __webpack_require__(19);
let UpdateColumnMask = exports.UpdateColumnMask = class UpdateColumnMask {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UpdateColumnMask.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UpdateColumnMask.prototype, "campaign_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UpdateColumnMask.prototype, "columna_etiqueta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UpdateColumnMask.prototype, "celda", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UpdateColumnMask.prototype, "valor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UpdateColumnMask.prototype, "estado", void 0);
exports.UpdateColumnMask = UpdateColumnMask = __decorate([
    (0, typeorm_1.Entity)({ name: 'SP_CR_ActualizarColumnaMask_VRC' })
], UpdateColumnMask);


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CampaignService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(19);
const campania_entity_1 = __webpack_require__(18);
let CampaignService = exports.CampaignService = class CampaignService {
    constructor(campaignRepository) {
        this.campaignRepository = campaignRepository;
    }
    async getCampaigns() {
        return this.campaignRepository.query('SELECT campaign_id, campaign_name FROM DA_V_vicidial_campaings');
    }
};
exports.CampaignService = CampaignService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(campania_entity_1.Campaign)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], CampaignService);


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MainClientService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(19);
let MainClientService = exports.MainClientService = class MainClientService {
    constructor(connection) {
        this.connection = connection;
    }
    async obtenerDatosClt(dto) {
        const { dni, num_cta, campania } = dto;
        const query = `
    EXEC [SP_CR_ObtenerDatosClt_VRC] @dni = '${dni}', @cta = ${num_cta ? `'${num_cta}'` : 'NULL'}, @campania = '${campania}'
    `;
        const result = await this.connection.query(query);
        return result[0];
    }
};
exports.MainClientService = MainClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Connection !== "undefined" && typeorm_1.Connection) === "function" ? _a : Object])
], MainClientService);


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatosAdicionalCltService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(19);
const vrc_adicional_cliente_entity_1 = __webpack_require__(21);
let DatosAdicionalCltService = exports.DatosAdicionalCltService = class DatosAdicionalCltService {
    constructor(datosAdicionalesRepository) {
        this.datosAdicionalesRepository = datosAdicionalesRepository;
    }
    async obtenerDatosPorCampania(dto) {
        const { campania, dni, num_cta } = dto;
        try {
            const resultados = await this.datosAdicionalesRepository.query(`EXEC SP_CR_ObtenerDatosPorCampaña_VRC @campania = @0, @dni = @1, @cta = @2`, [campania, dni, num_cta || null]);
            return resultados[0];
        }
        catch (error) {
            console.error('Error al ejecutar el procedimiento almacenado:', error.message);
            throw new Error('No se pudieron obtener los datos. Verifique los parámetros ingresados.');
        }
    }
};
exports.DatosAdicionalCltService = DatosAdicionalCltService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vrc_adicional_cliente_entity_1.DatosAdicionalesCltEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DatosAdicionalCltService);


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PagosService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(19);
const vrc_pagos_entity_1 = __webpack_require__(22);
const typeorm_2 = __webpack_require__(14);
let PagosService = exports.PagosService = class PagosService {
    constructor(pagosRepository) {
        this.pagosRepository = pagosRepository;
    }
    async getPagos(dto) {
        const { dni, num_cta, campania, periodo } = dto;
        const ctaValue = num_cta && num_cta !== '' ? num_cta : null;
        const periodoValue = periodo && periodo !== '' ? periodo : null;
        return this.pagosRepository.query(`EXEC SP_CR_ObtenerPagosClt_VRC @dni = @0, @cta = @1, @campania = @2, @periodo = @3`, [dni, ctaValue, campania, periodoValue]);
    }
};
exports.PagosService = PagosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(vrc_pagos_entity_1.PagosEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object])
], PagosService);


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GestionService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(19);
let GestionService = exports.GestionService = class GestionService {
    constructor(connection) {
        this.connection = connection;
    }
    async obtenerGestion(dto) {
        const { dni, num_cta, campania } = dto;
        const query = `
      EXEC [dbo].[SP_CR_ObtenerGestionClt_VRC]
      @dni = '${dni}',
      @cta = ${num_cta ? `'${num_cta}'` : 'NULL'},
      @campania = '${campania}'
    `;
        const result = await this.connection.query(query);
        return result.map((row) => ({
            ...row,
            FEC_GESTION: row.FEC_GESTION ? new Date(row.FEC_GESTION).toISOString().split('T')[0] : null,
            HOR_GESTION: row.HOR_GESTION ? new Date(row.HOR_GESTION).toTimeString().split(' ')[0] : null,
        }));
    }
};
exports.GestionService = GestionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Connection !== "undefined" && typeorm_1.Connection) === "function" ? _a : Object])
], GestionService);


/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObtenerWspmasivoCltService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(19);
const vrc_wspmasivo_entity_1 = __webpack_require__(24);
let ObtenerWspmasivoCltService = exports.ObtenerWspmasivoCltService = class ObtenerWspmasivoCltService {
    constructor(wspmasivoCltRepository) {
        this.wspmasivoCltRepository = wspmasivoCltRepository;
    }
    async obtenerDatosWsp(dto) {
        const { dni, num_cta } = dto;
        return await this.wspmasivoCltRepository.query(`EXEC [dbo].[SP_CR_ObtenerWspmasivoClt_VRC] @dni = '${dni}', @cta = ${num_cta ? `'${num_cta}'` : 'NULL'}`, [dni, num_cta || null]);
    }
};
exports.ObtenerWspmasivoCltService = ObtenerWspmasivoCltService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vrc_wspmasivo_entity_1.ObtenerWspmasivoClt)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ObtenerWspmasivoCltService);


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObtenerSmsMasivoCltService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(19);
const vrc_smsmasivo_entity_1 = __webpack_require__(25);
let ObtenerSmsMasivoCltService = exports.ObtenerSmsMasivoCltService = class ObtenerSmsMasivoCltService {
    constructor(smsmasivoCltRepository) {
        this.smsmasivoCltRepository = smsmasivoCltRepository;
    }
    async obtenerDatosSms(dto) {
        const { dni, num_cta } = dto;
        return await this.smsmasivoCltRepository.query(`EXEC [dbo].[SP_CR_ObtenerSMSmasivoClt_VRC] @dni = '${dni}', @cta = ${num_cta ? `'${num_cta}'` : 'NULL'}`, [dni, num_cta || null]);
    }
};
exports.ObtenerSmsMasivoCltService = ObtenerSmsMasivoCltService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vrc_smsmasivo_entity_1.ObtenerSmsMasivoClt)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ObtenerSmsMasivoCltService);


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DetalleDeudaCltService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(19);
const vrc_detalledeuda_entity_1 = __webpack_require__(26);
let DetalleDeudaCltService = exports.DetalleDeudaCltService = class DetalleDeudaCltService {
    constructor(detalleDeudaRepository) {
        this.detalleDeudaRepository = detalleDeudaRepository;
    }
    async obtenerDetalleDeuda(dto) {
        const { campania, dni, num_cta } = dto;
        try {
            const resultados = await this.detalleDeudaRepository.query(`EXEC SP_CR_ObtenerDetalleDeudaClt_VRC @campania = @0, @dni = @1, @cta = @2`, [campania, dni, num_cta || null]);
            return resultados;
        }
        catch (error) {
            console.error('Error al ejecutar el procedimiento almacenado:', error.message);
            throw new Error('No se pudieron obtener los datos. Verifique los parámetros ingresados.');
        }
    }
};
exports.DetalleDeudaCltService = DetalleDeudaCltService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vrc_detalledeuda_entity_1.DetalleDeudaCltEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], DetalleDeudaCltService);


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObtenerIvrMasivoCltService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(19);
const vrc_ivrmasivo_entity_1 = __webpack_require__(27);
let ObtenerIvrMasivoCltService = exports.ObtenerIvrMasivoCltService = class ObtenerIvrMasivoCltService {
    constructor(ivrmasivoCltRepository) {
        this.ivrmasivoCltRepository = ivrmasivoCltRepository;
    }
    async obtenerDatosIvr(dto) {
        const { dni, num_cta } = dto;
        const resultados = await this.ivrmasivoCltRepository.query(`EXEC [dbo].[SP_CR_ObtenerIVRClt_VRC] @dni = '${dni}', @cta = ${num_cta ? `'${num_cta}'` : 'NULL'}`, [dni, num_cta || null]);
        return resultados.map((resultado) => {
            return {
                ...resultado,
                FEC_GESTION: resultado.FEC_GESTION
                    ? new Date(resultado.FEC_GESTION).toISOString().split('T')[0]
                    : null,
                HOR_GESTION: resultado.HOR_GESTION
                    ? new Date(resultado.HOR_GESTION).toTimeString().split(' ')[0]
                    : null,
            };
        });
    }
};
exports.ObtenerIvrMasivoCltService = ObtenerIvrMasivoCltService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vrc_ivrmasivo_entity_1.ObtenerIvrMasivoClt)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ObtenerIvrMasivoCltService);


/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FrPagosService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FrPagosService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(19);
const xlsx = __webpack_require__(40);
let FrPagosService = exports.FrPagosService = FrPagosService_1 = class FrPagosService {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(FrPagosService_1.name);
    }
    async uploadFile(file, list_id, cCAMPAIGN_ID) {
        const { headers, rows } = this.parseExcel(file.buffer);
        const fieldMapping = {
            'CAMPAÑA': 'cCAMPAIGN_ID',
            'NUM_CUENTA': 'cNUM_CUENTA',
            'NUM_DOCUMENTO': 'cNUM_DOCUMENTO',
            'OBSERVACION': 'cOBSERVACION',
            'PERIODO': 'cPERIODO',
            'CUOTA': 'cCUOTA',
            'FECHA_PAGO': 'dFECHA_PAGO',
            'MONEDA': 'nMONEDA',
            'MONTO': 'nMONTO',
            'MONTO_CONSIDERADO': 'nMONTO_CONSIDERADO',
            'ACTIVO': 'nSTATUS',
        };
        const matchedColumns = headers
            .filter((header) => fieldMapping[header])
            .map((header) => fieldMapping[header]);
        matchedColumns.push('list_id', 'cCAMPAIGN_ID', 'dFECHA_CARGA_CSV');
        const validRows = [];
        const errors = [];
        let totalInsertedRecords = 0;
        for (const [rowIndex, row] of rows.entries()) {
            try {
                const mappedRow = headers.map((header, index) => {
                    const columnName = fieldMapping[header];
                    if (!columnName)
                        return null;
                    const columnType = this.getColumnType(columnName);
                    return this.validateAndConvert(row[index] || null, columnType, columnName, rowIndex);
                });
                const currentDateTime = this.getLocalDateTime();
                mappedRow.push(list_id, cCAMPAIGN_ID, currentDateTime);
                validRows.push(mappedRow);
            }
            catch (error) {
                errors.push({ row: rowIndex + 2, error: error.message });
            }
        }
        console.log(`Total de filas válidas: ${validRows.length}`);
        console.log(`Errores durante la validación: ${JSON.stringify(errors)}`);
        const BATCH_SIZE = 500;
        const batches = [];
        for (let i = 0; i < validRows.length; i += BATCH_SIZE) {
            batches.push(validRows.slice(i, i + BATCH_SIZE));
        }
        for (const batch of batches) {
            const insertColumns = matchedColumns.join(', ');
            const valuesStatements = batch
                .map((row) => `(${row
                .map((value) => {
                if (value === null || value === undefined || Number.isNaN(value))
                    return 'NULL';
                if (typeof value === 'string') {
                    return `'${value.replace(/'/g, "''")}'`;
                }
                return value;
            })
                .join(', ')})`)
                .join(', ');
            const sqlQuery = `
        INSERT INTO FR_PAGOS (${insertColumns})
        VALUES ${valuesStatements};
      `;
            try {
                console.log(`Ejecutando batch con ${batch.length} registros.`);
                await this.dataSource.query(sqlQuery);
                totalInsertedRecords += batch.length;
            }
            catch (error) {
                console.error(`Error en batch: ${error.message}`);
                errors.push({ row: 'N/A', error: error.message });
            }
        }
        console.log(`Total de registros insertados: ${totalInsertedRecords}`);
        return errors.length > 0
            ? `Datos insertados parcialmente (${totalInsertedRecords} registros insertados). Revisa el log para más detalles.`
            : `Datos insertados correctamente. Total de registros insertados: ${totalInsertedRecords}.`;
    }
    parseExcel(buffer) {
        try {
            const workbook = xlsx.read(buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
            if (!data || data.length === 0) {
                throw new Error('El archivo Excel está vacío o no es válido.');
            }
            const headers = data[0];
            const rows = data.slice(1);
            return { headers, rows };
        }
        catch (error) {
            this.logger.error(`Error al procesar el archivo Excel: ${error.message}`);
            throw new Error('Error al procesar el archivo Excel.');
        }
    }
    getColumnType(columnName) {
        const columnDetails = {
            cCAMPAIGN_ID: { dataType: 'varchar', maxLength: 50 },
            cNUM_CUENTA: { dataType: 'varchar', maxLength: 50 },
            cNUM_DOCUMENTO: { dataType: 'varchar', maxLength: 50 },
            cOBSERVACION: { dataType: 'varchar', maxLength: 50 },
            cPERIODO: { dataType: 'varchar', maxLength: 7 },
            cCUOTA: { dataType: 'varchar', maxLength: 20 },
            dFECHA_PAGO: { dataType: 'datetime', maxLength: null },
            nMONEDA: { dataType: 'int', maxLength: null },
            nMONTO: { dataType: 'decimal', maxLength: null },
            nMONTO_CONSIDERADO: { dataType: 'decimal', maxLength: null },
            nSTATUS: { dataType: 'int', maxLength: null },
            dFECHA_CARGA_CSV: { dataType: 'datetime', maxLength: null },
        };
        return columnDetails[columnName];
    }
    validateAndConvert(value, column, columnName, rowIndex) {
        if (value === null || value === undefined) {
            return null;
        }
        switch (column.dataType) {
            case 'varchar':
                if (column.maxLength && value.length > column.maxLength) {
                    throw new Error(`El valor '${value}' excede la longitud máxima (${column.maxLength}) para la columna '${columnName}' en la fila ${rowIndex + 2}.`);
                }
                return value.toString();
            case 'decimal':
                const numericValue = parseFloat(value);
                if (isNaN(numericValue)) {
                    throw new Error(`El valor '${value}' no es un número válido para la columna '${columnName}' en la fila ${rowIndex + 2}.`);
                }
                return numericValue;
            case 'int':
                const intValue = parseInt(value, 10);
                if (isNaN(intValue)) {
                    throw new Error(`El valor '${value}' no es un número entero válido para la columna '${columnName}' en la fila ${rowIndex + 2}.`);
                }
                return intValue;
            case 'datetime':
                const dateValue = new Date(value);
                if (isNaN(dateValue.getTime())) {
                    throw new Error(`El valor '${value}' no es una fecha válida para la columna '${columnName}' en la fila ${rowIndex + 2}.`);
                }
                return dateValue.toISOString();
            default:
                return value;
        }
    }
    getLocalDateTime() {
        return new Date().toISOString();
    }
};
exports.FrPagosService = FrPagosService = FrPagosService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], FrPagosService);


/***/ }),
/* 40 */
/***/ ((module) => {

module.exports = require("xlsx");

/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MascaraService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(19);
const XLSX = __webpack_require__(40);
let MascaraService = exports.MascaraService = class MascaraService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    getLocalDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    isValidDate(value) {
        const date = new Date(value);
        return !isNaN(date.getTime()) && date.getFullYear() >= 1900 && date.getFullYear() <= 2100;
    }
    validateAndConvert(value, column, columnName, rowIndex) {
        try {
            if (!column)
                return value;
            switch (column.dataType) {
                case 'datetime':
                    if (value && typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
                        const date = new Date(value);
                        if (!this.isValidDate(date)) {
                            console.warn(`Fila ${rowIndex + 1}: Fecha inválida en columna ${columnName}`);
                            return null;
                        }
                        return `${value.split(' ')[0]} 00:00:00`;
                    }
                    console.warn(`Fila ${rowIndex + 1}: Fecha inválida '${value}' en columna ${columnName}`);
                    return null;
                case 'numeric':
                case 'decimal':
                case 'float':
                    const parsedFloat = parseFloat(value);
                    if (isNaN(parsedFloat)) {
                        console.warn(`Fila ${rowIndex + 1}: Valor no numérico '${value}' en columna ${columnName}`);
                        return 0.0;
                    }
                    return parsedFloat;
                case 'int':
                    const parsedInt = parseInt(value, 10);
                    if (isNaN(parsedInt)) {
                        console.warn(`Fila ${rowIndex + 1}: Valor no entero '${value}' en columna ${columnName}`);
                        return 0;
                    }
                    return parsedInt;
                case 'varchar':
                case 'nvarchar':
                    if (typeof value !== 'string')
                        value = value ? String(value) : '';
                    if (column.maxLength && value.length > column.maxLength) {
                        console.warn(`Fila ${rowIndex + 1}: Cadena truncada en columna ${columnName}`);
                        value = value.substring(0, column.maxLength);
                    }
                    return value.replace(/'/g, "''");
                default:
                    return value;
            }
        }
        catch (error) {
            console.error(`Error al validar valor en fila ${rowIndex + 1}, columna ${columnName}: ${error.message}`);
            return null;
        }
    }
    async processExcel(file, campaign_id, list_id) {
        const BATCH_SIZE = 500;
        let updatedCount = 0;
        let insertedCount = 0;
        console.log(`Archivo recibido: ${file.originalname}, Tamaño=${file.size}`);
        const workbook = XLSX.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        if (data.length < 2) {
            throw new common_1.InternalServerErrorException('El archivo Excel está vacío o mal formateado');
        }
        const headers = data[0];
        const rows = data.slice(1);
        const mappingQuery = `
      SELECT columna AS columna, columna_etiqueta, DATA_TYPE AS dataType, CHARACTER_MAXIMUM_LENGTH AS maxLength
      FROM [BD_CR_MAESTRA].[dbo].[T_Columnas_mask]
      JOIN INFORMATION_SCHEMA.COLUMNS ON columna = COLUMN_NAME
      WHERE campaign_id = '${campaign_id}' AND TABLE_NAME = 'FR_MASCARA'
    `;
        const mapping = await this.dataSource.query(mappingQuery);
        const columnMapping = mapping.reduce((acc, curr) => {
            acc[curr.columna_etiqueta] = {
                column: curr.columna,
                type: curr.dataType || 'varchar',
                maxLength: curr.maxLength || null
            };
            return acc;
        }, {});
        const filteredHeaders = headers.filter((header) => columnMapping[header]);
        const mappedColumns = filteredHeaders.map((header) => columnMapping[header].column);
        mappedColumns.push('campaign_id', 'list_id', 'dFecha_CARGA_CSV');
        const validRows = [];
        for (const rowIndex in rows) {
            const row = rows[rowIndex];
            const filteredRow = filteredHeaders.map((header) => {
                const columnInfo = columnMapping[header];
                return this.validateAndConvert(row[headers.indexOf(header)] || null, columnInfo, columnInfo.column, parseInt(rowIndex));
            });
            filteredRow.push(campaign_id, list_id, this.getLocalDateTime());
            validRows.push(filteredRow);
        }
        const batches = [];
        for (let i = 0; i < validRows.length; i += BATCH_SIZE) {
            batches.push(validRows.slice(i, i + BATCH_SIZE));
        }
        for (const batch of batches) {
            for (const row of batch) {
                const checkQuery = `
          SELECT COUNT(*) AS count FROM [BD_CR_MAESTRA].[dbo].[FR_MASCARA]
          WHERE cnum_cuenta = '${row[0]}' AND cnum_documento = '${row[1]}' AND campaign_id = '${campaign_id}' AND list_id = '${list_id}'
        `;
                const checkResult = await this.dataSource.query(checkQuery);
                if (checkResult[0].count > 0) {
                    const updateColumns = mappedColumns.map((col, index) => {
                        return `${col} = ${row[index] === null ? 'NULL' : `'${row[index]}'`}`;
                    }).join(', ');
                    const updateQuery = `
            UPDATE [BD_CR_MAESTRA].[dbo].[FR_MASCARA]
            SET dFecha_MODIFICACION = GETDATE(), ${updateColumns}
            WHERE cnum_cuenta = '${row[0]}' AND cnum_documento = '${row[1]}' AND campaign_id = '${campaign_id}' AND list_id = '${list_id}'
          `;
                    await this.dataSource.query(updateQuery);
                    updatedCount++;
                }
                else {
                    if (mappedColumns.length !== row.length) {
                        console.error(`Error: La cantidad de columnas (${mappedColumns.length}) no coincide con la cantidad de valores (${row.length}) en la fila:`, row);
                        continue;
                    }
                    const valuesStatements = `(${row.map((value) => (value === null ? 'NULL' : `'${value}'`)).join(', ')})`;
                    const insertQuery = `
            INSERT INTO [BD_CR_MAESTRA].[dbo].[FR_MASCARA]
            (${mappedColumns.join(', ')})
            VALUES ${valuesStatements}
          `;
                    await this.dataSource.query(insertQuery);
                    insertedCount++;
                }
            }
        }
        return `Proceso completado correctamente. Registros actualizados: ${updatedCount}, Registros insertados: ${insertedCount}`;
    }
};
exports.MascaraService = MascaraService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], MascaraService);


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColumnaMaskService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(19);
const vrc_masksupervisor_entity_1 = __webpack_require__(28);
let ColumnaMaskService = exports.ColumnaMaskService = class ColumnaMaskService {
    constructor(columnaMaskRepository) {
        this.columnaMaskRepository = columnaMaskRepository;
    }
    async obtenerColumnasMask(dto) {
        const { campania } = dto;
        try {
            const resultados = await this.columnaMaskRepository.query(`EXEC SP_CR_ObtenerColumnaMask_VRC @campania = '${campania}'`, [campania]);
            return resultados;
        }
        catch (error) {
            console.error('Error al ejecutar el procedimiento almacenado:', error.message);
            throw new Error('No se pudieron obtener los datos. Verifique los parámetros ingresados.');
        }
    }
};
exports.ColumnaMaskService = ColumnaMaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vrc_masksupervisor_entity_1.ColumnaMask)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ColumnaMaskService);


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateColumnMaskService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(19);
const vrc_updatemasksupervisor_entity_1 = __webpack_require__(29);
let UpdateColumnMaskService = exports.UpdateColumnMaskService = class UpdateColumnMaskService {
    constructor(columnMaskRepository) {
        this.columnMaskRepository = columnMaskRepository;
    }
    async updateColumnMask(dto) {
        const { campania, etiqueta, celda, valor, estado } = dto;
        try {
            await this.columnMaskRepository.query(`EXEC SP_CR_ActualizarColumnaMask_VRC 
        @campania = '${campania}', @etiqueta = '${etiqueta}', @celda = '${celda}', @valor = '${valor}', @estado = '${estado}'`, [campania, etiqueta, celda, valor, estado]);
            return 'Datos actualizados correctamente';
        }
        catch (error) {
            console.error('Error en el procedimiento almacenado:', error);
            throw new Error('No se pudo actualizar la columna en la base de datos');
        }
    }
};
exports.UpdateColumnMaskService = UpdateColumnMaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vrc_updatemasksupervisor_entity_1.UpdateColumnMask)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], UpdateColumnMaskService);


/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColumnasMask2 = void 0;
const typeorm_1 = __webpack_require__(19);
let ColumnasMask2 = exports.ColumnasMask2 = class ColumnasMask2 {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], ColumnasMask2.prototype, "campaign_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ColumnasMask2.prototype, "columna", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ColumnasMask2.prototype, "columna_etiqueta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ColumnasMask2.prototype, "celda", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ColumnasMask2.prototype, "valor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ColumnasMask2.prototype, "estado", void 0);
exports.ColumnasMask2 = ColumnasMask2 = __decorate([
    (0, typeorm_1.Entity)('T_Columnas_mask')
], ColumnasMask2);


/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColumnasMaskService2 = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(19);
const columnas_mask_entity_1 = __webpack_require__(44);
let ColumnasMaskService2 = exports.ColumnasMaskService2 = class ColumnasMaskService2 {
    constructor(columnasMaskRepository) {
        this.columnasMaskRepository = columnasMaskRepository;
    }
    async getColumnasByCampaign(campaign_id) {
        const columnas = await this.columnasMaskRepository
            .createQueryBuilder('columnas')
            .select(['columnas.celda', 'columnas.columna_etiqueta', 'columnas.valor'])
            .where('columnas.campaign_id = :campaign_id', { campaign_id })
            .andWhere('columnas.estado = :estado', { estado: 'S' })
            .getRawMany();
        console.log('Cantidad de filas recuperadas:', columnas.length);
        console.log('Datos recuperados:', columnas);
        if (!columnas || columnas.length === 0) {
            console.warn('No se encontraron datos para el campaign_id:', campaign_id);
            return {};
        }
        const response = {};
        columnas.forEach((columna) => {
            const celda = columna.columnas_celda;
            const columnaEtiqueta = columna.columnas_columna_etiqueta;
            const valor = columna.columnas_valor;
            if (celda && columnaEtiqueta && valor) {
                response[columnaEtiqueta] = { celda, valor };
            }
            else {
                console.warn(`Fila con datos incompletos: ${JSON.stringify(columna)}`);
            }
        });
        console.log('Respuesta formateada:', response);
        return response;
    }
};
exports.ColumnasMaskService2 = ColumnasMaskService2 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(columnas_mask_entity_1.ColumnasMask2)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ColumnasMaskService2);


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MaestraController = void 0;
const common_1 = __webpack_require__(2);
const campania_service_1 = __webpack_require__(30);
const vrc_obtenercliente_dto_1 = __webpack_require__(47);
const vrc_principal_cliente_service_1 = __webpack_require__(31);
const vrc_obteneradicionaldatos_dto_1 = __webpack_require__(48);
const vrc_adicional_cliente_service_1 = __webpack_require__(32);
const vrc_pagoscliente_dto_1 = __webpack_require__(49);
const vrc_pagos_service_1 = __webpack_require__(33);
const vrc_fotogestion_service_1 = __webpack_require__(34);
const vrc_obtenergestioncliente_dto_1 = __webpack_require__(50);
const vrc_obtenerwspmasivo_dto_1 = __webpack_require__(51);
const vrc_wspmasivo_service_1 = __webpack_require__(35);
const vrc_obtenersmsmasivo_dto_1 = __webpack_require__(52);
const vrc_smsmasivo_service_1 = __webpack_require__(36);
const vrc_obtenerdetalledeuda_dto_1 = __webpack_require__(53);
const vrc_detalledeuda_service_1 = __webpack_require__(37);
const vrc_ivrmasivo_service_1 = __webpack_require__(38);
const vrc_obtenerivrmasivo_dto_1 = __webpack_require__(54);
const vrc_obtenermasksupervisor_dto_1 = __webpack_require__(55);
const vrc_masksupervisor_service_1 = __webpack_require__(42);
const vrc_updatemasksupervisor_dto_1 = __webpack_require__(56);
const vrc_updatemasksupervisor_service_1 = __webpack_require__(43);
const columnas_mask_service_1 = __webpack_require__(45);
let MaestraController = exports.MaestraController = class MaestraController {
    constructor(campaignService, clientMainService, pagosService, gestionService, wspmasivoCltService, smsmasivoCltService, DatosAdicionalesService, detalleDeudaService, ivrmasivoCltService, columnaMaskService, updateColumnaMaskService, columnasMaskService) {
        this.campaignService = campaignService;
        this.clientMainService = clientMainService;
        this.pagosService = pagosService;
        this.gestionService = gestionService;
        this.wspmasivoCltService = wspmasivoCltService;
        this.smsmasivoCltService = smsmasivoCltService;
        this.DatosAdicionalesService = DatosAdicionalesService;
        this.detalleDeudaService = detalleDeudaService;
        this.ivrmasivoCltService = ivrmasivoCltService;
        this.columnaMaskService = columnaMaskService;
        this.updateColumnaMaskService = updateColumnaMaskService;
        this.columnasMaskService = columnasMaskService;
    }
    async getCampaigns() {
        try {
            return await this.campaignService.getCampaigns();
        }
        catch (error) {
            throw new Error('Error al obtener las campañas: ' + error.message);
        }
    }
    async obtenerDatos(obtenerDatosCltDto) {
        return this.clientMainService.obtenerDatosClt(obtenerDatosCltDto);
    }
    async getPagos(dto) {
        return this.pagosService.getPagos(dto);
    }
    async obtenerGestion(obtenerGestionDto) {
        return this.gestionService.obtenerGestion(obtenerGestionDto);
    }
    async obtenerDatosWSP(dto) {
        return await this.wspmasivoCltService.obtenerDatosWsp(dto);
    }
    async obtenerDatosSMS(dto) {
        return await this.smsmasivoCltService.obtenerDatosSms(dto);
    }
    async obtenerDatosAdicional(dto) {
        return this.DatosAdicionalesService.obtenerDatosPorCampania(dto);
    }
    async obtenerDetalleDeuda(dto) {
        return this.detalleDeudaService.obtenerDetalleDeuda(dto);
    }
    async obtenerDatosIvr(dto) {
        return await this.ivrmasivoCltService.obtenerDatosIvr(dto);
    }
    async obtenerColumnaMask(dto) {
        return await this.columnaMaskService.obtenerColumnasMask(dto);
    }
    async updateColumnMask(dto) {
        return await this.updateColumnaMaskService.updateColumnMask(dto);
    }
    async getColumnas(campaign_id) {
        console.log('Solicitud recibida con campaign_id:', campaign_id);
        if (!campaign_id) {
            return { success: false, message: 'El campaign_id es requerido' };
        }
        const response = await this.columnasMaskService.getColumnasByCampaign(campaign_id);
        console.log('Respuesta enviada:', JSON.stringify(response, null, 2));
        return response;
    }
};
__decorate([
    (0, common_1.Post)('campaings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MaestraController.prototype, "getCampaigns", null);
__decorate([
    (0, common_1.Post)('dataprivate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof vrc_obtenercliente_dto_1.ObtenerDatosCltDto !== "undefined" && vrc_obtenercliente_dto_1.ObtenerDatosCltDto) === "function" ? _o : Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], MaestraController.prototype, "obtenerDatos", null);
__decorate([
    (0, common_1.Post)('pagos'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof vrc_pagoscliente_dto_1.PagosClienteDto !== "undefined" && vrc_pagoscliente_dto_1.PagosClienteDto) === "function" ? _q : Object]),
    __metadata("design:returntype", Promise)
], MaestraController.prototype, "getPagos", null);
__decorate([
    (0, common_1.Post)('gestiones'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_r = typeof vrc_obtenergestioncliente_dto_1.ObtenerDetalleGestionDto !== "undefined" && vrc_obtenergestioncliente_dto_1.ObtenerDetalleGestionDto) === "function" ? _r : Object]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], MaestraController.prototype, "obtenerGestion", null);
__decorate([
    (0, common_1.Post)('wspmasivo'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_t = typeof vrc_obtenerwspmasivo_dto_1.ObtenerWspmasivoCltDto !== "undefined" && vrc_obtenerwspmasivo_dto_1.ObtenerWspmasivoCltDto) === "function" ? _t : Object]),
    __metadata("design:returntype", Promise)
], MaestraController.prototype, "obtenerDatosWSP", null);
__decorate([
    (0, common_1.Post)('smsmasivo'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_u = typeof vrc_obtenersmsmasivo_dto_1.ObtenerSmsMasivoCltDto !== "undefined" && vrc_obtenersmsmasivo_dto_1.ObtenerSmsMasivoCltDto) === "function" ? _u : Object]),
    __metadata("design:returntype", Promise)
], MaestraController.prototype, "obtenerDatosSMS", null);
__decorate([
    (0, common_1.Post)('dataaditional'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_v = typeof vrc_obteneradicionaldatos_dto_1.ObtenerDatosAdicionalesCltDto !== "undefined" && vrc_obteneradicionaldatos_dto_1.ObtenerDatosAdicionalesCltDto) === "function" ? _v : Object]),
    __metadata("design:returntype", typeof (_w = typeof Promise !== "undefined" && Promise) === "function" ? _w : Object)
], MaestraController.prototype, "obtenerDatosAdicional", null);
__decorate([
    (0, common_1.Post)('detalledeuda'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_x = typeof vrc_obtenerdetalledeuda_dto_1.ObtenerDetalleDeudaDto !== "undefined" && vrc_obtenerdetalledeuda_dto_1.ObtenerDetalleDeudaDto) === "function" ? _x : Object]),
    __metadata("design:returntype", typeof (_y = typeof Promise !== "undefined" && Promise) === "function" ? _y : Object)
], MaestraController.prototype, "obtenerDetalleDeuda", null);
__decorate([
    (0, common_1.Post)('ivrmasivo'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_z = typeof vrc_obtenerivrmasivo_dto_1.ObtenerIvrMasivoDto !== "undefined" && vrc_obtenerivrmasivo_dto_1.ObtenerIvrMasivoDto) === "function" ? _z : Object]),
    __metadata("design:returntype", Promise)
], MaestraController.prototype, "obtenerDatosIvr", null);
__decorate([
    (0, common_1.Post)('columnamask'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_0 = typeof vrc_obtenermasksupervisor_dto_1.ObtenerColumnaMaskDto !== "undefined" && vrc_obtenermasksupervisor_dto_1.ObtenerColumnaMaskDto) === "function" ? _0 : Object]),
    __metadata("design:returntype", Promise)
], MaestraController.prototype, "obtenerColumnaMask", null);
__decorate([
    (0, common_1.Post)('updatecolumnamask'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_1 = typeof vrc_updatemasksupervisor_dto_1.UpdateColumnMaskDto !== "undefined" && vrc_updatemasksupervisor_dto_1.UpdateColumnMaskDto) === "function" ? _1 : Object]),
    __metadata("design:returntype", Promise)
], MaestraController.prototype, "updateColumnMask", null);
__decorate([
    (0, common_1.Post)('mascara'),
    __param(0, (0, common_1.Body)('campaign_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaestraController.prototype, "getColumnas", null);
exports.MaestraController = MaestraController = __decorate([
    (0, common_1.Controller)('maestra'),
    __metadata("design:paramtypes", [typeof (_a = typeof campania_service_1.CampaignService !== "undefined" && campania_service_1.CampaignService) === "function" ? _a : Object, typeof (_b = typeof vrc_principal_cliente_service_1.MainClientService !== "undefined" && vrc_principal_cliente_service_1.MainClientService) === "function" ? _b : Object, typeof (_c = typeof vrc_pagos_service_1.PagosService !== "undefined" && vrc_pagos_service_1.PagosService) === "function" ? _c : Object, typeof (_d = typeof vrc_fotogestion_service_1.GestionService !== "undefined" && vrc_fotogestion_service_1.GestionService) === "function" ? _d : Object, typeof (_e = typeof vrc_wspmasivo_service_1.ObtenerWspmasivoCltService !== "undefined" && vrc_wspmasivo_service_1.ObtenerWspmasivoCltService) === "function" ? _e : Object, typeof (_f = typeof vrc_smsmasivo_service_1.ObtenerSmsMasivoCltService !== "undefined" && vrc_smsmasivo_service_1.ObtenerSmsMasivoCltService) === "function" ? _f : Object, typeof (_g = typeof vrc_adicional_cliente_service_1.DatosAdicionalCltService !== "undefined" && vrc_adicional_cliente_service_1.DatosAdicionalCltService) === "function" ? _g : Object, typeof (_h = typeof vrc_detalledeuda_service_1.DetalleDeudaCltService !== "undefined" && vrc_detalledeuda_service_1.DetalleDeudaCltService) === "function" ? _h : Object, typeof (_j = typeof vrc_ivrmasivo_service_1.ObtenerIvrMasivoCltService !== "undefined" && vrc_ivrmasivo_service_1.ObtenerIvrMasivoCltService) === "function" ? _j : Object, typeof (_k = typeof vrc_masksupervisor_service_1.ColumnaMaskService !== "undefined" && vrc_masksupervisor_service_1.ColumnaMaskService) === "function" ? _k : Object, typeof (_l = typeof vrc_updatemasksupervisor_service_1.UpdateColumnMaskService !== "undefined" && vrc_updatemasksupervisor_service_1.UpdateColumnMaskService) === "function" ? _l : Object, typeof (_m = typeof columnas_mask_service_1.ColumnasMaskService2 !== "undefined" && columnas_mask_service_1.ColumnasMaskService2) === "function" ? _m : Object])
], MaestraController);


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObtenerDatosCltDto = void 0;
const class_validator_1 = __webpack_require__(9);
class ObtenerDatosCltDto {
}
exports.ObtenerDatosCltDto = ObtenerDatosCltDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObtenerDatosCltDto.prototype, "dni", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObtenerDatosCltDto.prototype, "num_cta", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObtenerDatosCltDto.prototype, "campania", void 0);


/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObtenerDatosAdicionalesCltDto = void 0;
const class_validator_1 = __webpack_require__(9);
class ObtenerDatosAdicionalesCltDto {
}
exports.ObtenerDatosAdicionalesCltDto = ObtenerDatosAdicionalesCltDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObtenerDatosAdicionalesCltDto.prototype, "dni", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObtenerDatosAdicionalesCltDto.prototype, "num_cta", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObtenerDatosAdicionalesCltDto.prototype, "campania", void 0);


/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PagosClienteDto = void 0;
const class_validator_1 = __webpack_require__(9);
class PagosClienteDto {
}
exports.PagosClienteDto = PagosClienteDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PagosClienteDto.prototype, "dni", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PagosClienteDto.prototype, "num_cta", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PagosClienteDto.prototype, "campania", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PagosClienteDto.prototype, "periodo", void 0);


/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObtenerDetalleGestionDto = void 0;
const class_validator_1 = __webpack_require__(9);
class ObtenerDetalleGestionDto {
}
exports.ObtenerDetalleGestionDto = ObtenerDetalleGestionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObtenerDetalleGestionDto.prototype, "dni", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObtenerDetalleGestionDto.prototype, "num_cta", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObtenerDetalleGestionDto.prototype, "campania", void 0);


/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObtenerWspmasivoCltDto = void 0;
const class_validator_1 = __webpack_require__(9);
class ObtenerWspmasivoCltDto {
}
exports.ObtenerWspmasivoCltDto = ObtenerWspmasivoCltDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObtenerWspmasivoCltDto.prototype, "dni", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObtenerWspmasivoCltDto.prototype, "num_cta", void 0);


/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObtenerSmsMasivoCltDto = void 0;
const class_validator_1 = __webpack_require__(9);
class ObtenerSmsMasivoCltDto {
}
exports.ObtenerSmsMasivoCltDto = ObtenerSmsMasivoCltDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObtenerSmsMasivoCltDto.prototype, "dni", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObtenerSmsMasivoCltDto.prototype, "num_cta", void 0);


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObtenerDetalleDeudaDto = void 0;
const class_validator_1 = __webpack_require__(9);
class ObtenerDetalleDeudaDto {
}
exports.ObtenerDetalleDeudaDto = ObtenerDetalleDeudaDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObtenerDetalleDeudaDto.prototype, "dni", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObtenerDetalleDeudaDto.prototype, "num_cta", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObtenerDetalleDeudaDto.prototype, "campania", void 0);


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObtenerIvrMasivoDto = void 0;
const class_validator_1 = __webpack_require__(9);
class ObtenerIvrMasivoDto {
}
exports.ObtenerIvrMasivoDto = ObtenerIvrMasivoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObtenerIvrMasivoDto.prototype, "dni", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObtenerIvrMasivoDto.prototype, "num_cta", void 0);


/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObtenerColumnaMaskDto = void 0;
const class_validator_1 = __webpack_require__(9);
class ObtenerColumnaMaskDto {
}
exports.ObtenerColumnaMaskDto = ObtenerColumnaMaskDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObtenerColumnaMaskDto.prototype, "campania", void 0);


/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateColumnMaskDto = void 0;
const class_validator_1 = __webpack_require__(9);
class UpdateColumnMaskDto {
}
exports.UpdateColumnMaskDto = UpdateColumnMaskDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateColumnMaskDto.prototype, "campania", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateColumnMaskDto.prototype, "etiqueta", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateColumnMaskDto.prototype, "celda", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateColumnMaskDto.prototype, "valor", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateColumnMaskDto.prototype, "estado", void 0);


/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExcelService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(19);
const XLSX = __webpack_require__(40);
let ExcelService = exports.ExcelService = class ExcelService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    getLocalDateTime() {
        return new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
    isValidDate(value) {
        return !isNaN(Date.parse(value));
    }
    validateAndConvert(value, column) {
        if (value === null || value === undefined || value === '') {
            return column?.columnName === 'nEstado' ? 1 : null;
        }
        switch (column?.dataType) {
            case 'datetime':
                return this.isValidDate(value) ? new Date(value).toISOString().slice(0, 19).replace('T', ' ') : null;
            case 'int':
                return Number.isInteger(Number(value)) ? parseInt(value, 10) : (column?.columnName === 'nEstado' ? 1 : 0);
            case 'numeric':
            case 'decimal':
            case 'float':
                return !isNaN(parseFloat(value)) ? parseFloat(value) : 0.0;
            case 'varchar':
            case 'nvarchar':
                let stringValue = String(value).trim();
                return column.maxLength ? stringValue.slice(0, column.maxLength) : stringValue;
            default:
                return value;
        }
    }
    async processExcel(file, campaign_id, list_id) {
        const BATCH_SIZE = 200;
        console.log(`Archivo recibido: ${file.originalname} (${file.size} bytes)`);
        const workbook = XLSX.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        if (data.length < 2) {
            throw new common_1.InternalServerErrorException('El archivo Excel está vacío o mal formateado');
        }
        const headers = data[0];
        const rows = data.slice(1);
        const mappingQuery = `SELECT columna AS cabecera_asignacion, columna_etiqueta FROM [BD_CR_MAESTRA].[dbo].[T_Columnas2] WHERE campaign_id = @0`;
        const mapping = await this.dataSource.query(mappingQuery, [campaign_id]);
        if (!mapping.length) {
            throw new common_1.InternalServerErrorException('No se encontraron columnas mapeadas para la campaña.');
        }
        const columnMapping = mapping.reduce((acc, curr) => ({ ...acc, [curr.columna_etiqueta]: curr.cabecera_asignacion }), {});
        const filteredHeaders = headers.filter((header) => columnMapping[header]);
        if (!filteredHeaders.length) {
            throw new common_1.InternalServerErrorException('No hay cabeceras válidas para insertar.');
        }
        const columnInfoQuery = `SELECT COLUMN_NAME AS columnName, DATA_TYPE AS dataType, CHARACTER_MAXIMUM_LENGTH AS maxLength FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'FR_ASIGNACION'`;
        const columnInfo = await this.dataSource.query(columnInfoQuery);
        const columnDetails = columnInfo.reduce((acc, curr) => ({ ...acc, [curr.columnName]: { dataType: curr.dataType, maxLength: curr.maxLength } }), {});
        const mappedColumns = [...filteredHeaders.map((header) => columnMapping[header]), 'campaign_id', 'list_id', 'dFecha_CARGA_CSV'];
        const validRows = [];
        const errors = [];
        let totalInsertedRecords = 0;
        rows.forEach((row, rowIndex) => {
            try {
                const filteredRow = filteredHeaders.map((header) => {
                    const columnName = columnMapping[header];
                    const column = columnDetails[columnName];
                    const colIndex = headers.indexOf(header);
                    return this.validateAndConvert(row[colIndex], column);
                });
                filteredRow.push(campaign_id, list_id, this.getLocalDateTime());
                console.log(`Fila ${rowIndex + 2}:`, filteredRow);
                validRows.push(filteredRow);
            }
            catch (error) {
                errors.push({ row: rowIndex + 2, error: error.message });
            }
        });
        const batches = [];
        for (let i = 0; i < validRows.length; i += BATCH_SIZE) {
            batches.push(validRows.slice(i, i + BATCH_SIZE));
        }
        for (const batch of batches) {
            if (batch.some(row => row.length !== mappedColumns.length)) {
                console.error('Error: Desajuste entre columnas y valores en el batch.');
                console.log(`Columnas esperadas: ${mappedColumns.length}, Valores en fila: ${batch[0]?.length}`);
                throw new common_1.InternalServerErrorException('Error en la estructura de datos. Verifica el mapeo de columnas.');
            }
            const insertColumns = mappedColumns.join(', ');
            const valuesStatements = batch
                .map((row) => `(${row.map((value) => (value === null ? 'DEFAULT' : typeof value === 'string' ? `'${value.replace(/'/g, "''")}'` : value)).join(', ')})`)
                .join(', ');
            const sqlQuery = `INSERT INTO [BD_CR_MAESTRA].[dbo].[FR_ASIGNACION] (${insertColumns}) VALUES ${valuesStatements};`;
            try {
                await this.dataSource.query(sqlQuery);
                totalInsertedRecords += batch.length;
            }
            catch (error) {
                console.error(`Error en batch: ${error.message}`);
                errors.push({ row: 'N/A', error: error.message });
            }
        }
        return errors.length > 0
            ? `Datos insertados parcialmente (${totalInsertedRecords} registros). Revisa el log.`
            : `Datos insertados correctamente (${totalInsertedRecords} registros).`;
    }
};
exports.ExcelService = ExcelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], ExcelService);


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExcelController = void 0;
const common_1 = __webpack_require__(2);
const platform_express_1 = __webpack_require__(59);
const cargasignacion_service_1 = __webpack_require__(57);
const pagos_service_1 = __webpack_require__(39);
const frmascara_service_1 = __webpack_require__(41);
const uploadExece_dto_1 = __webpack_require__(60);
const pagos_dto_1 = __webpack_require__(61);
const BQCourrier_service_1 = __webpack_require__(62);
const BQCourrier_dto_1 = __webpack_require__(66);
const express_1 = __webpack_require__(67);
let ExcelController = exports.ExcelController = class ExcelController {
    constructor(excelService, pagosService, mascaraService, bqCourierService) {
        this.excelService = excelService;
        this.pagosService = pagosService;
        this.mascaraService = mascaraService;
        this.bqCourierService = bqCourierService;
    }
    async uploadExcel(uploadExcelDto, file) {
        if (!file) {
            throw new common_1.BadRequestException('No se subió ningún archivo');
        }
        const { campaign_id, list_id } = uploadExcelDto;
        return this.excelService.processExcel(file, campaign_id, list_id);
    }
    async uploadFile(file, body) {
        const { list_id, cCAMPAIGN_ID } = body;
        return this.pagosService.uploadFile(file, list_id, cCAMPAIGN_ID);
    }
    async MascaraExcel(uploadExcelDto, file) {
        if (!file) {
            throw new common_1.BadRequestException('No se subió ningún archivo');
        }
        const { campaign_id, list_id } = uploadExcelDto;
        return this.mascaraService.processExcel(file, campaign_id, list_id);
    }
    async uploadFileS(file, dto) {
        return this.bqCourierService.processFile(file, dto);
    }
};
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof uploadExece_dto_1.UploadExcelDto !== "undefined" && uploadExece_dto_1.UploadExcelDto) === "function" ? _e : Object, typeof (_g = typeof express_1.Express !== "undefined" && (_f = express_1.Express.Multer) !== void 0 && _f.File) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], ExcelController.prototype, "uploadExcel", null);
__decorate([
    (0, common_1.Post)('Pagos'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof express_1.Express !== "undefined" && (_h = express_1.Express.Multer) !== void 0 && _h.File) === "function" ? _j : Object, typeof (_k = typeof pagos_dto_1.UploadDto !== "undefined" && pagos_dto_1.UploadDto) === "function" ? _k : Object]),
    __metadata("design:returntype", Promise)
], ExcelController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('Mascara'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof uploadExece_dto_1.UploadExcelDto !== "undefined" && uploadExece_dto_1.UploadExcelDto) === "function" ? _l : Object, typeof (_o = typeof express_1.Express !== "undefined" && (_m = express_1.Express.Multer) !== void 0 && _m.File) === "function" ? _o : Object]),
    __metadata("design:returntype", Promise)
], ExcelController.prototype, "MascaraExcel", null);
__decorate([
    (0, common_1.Post)('courrier'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof express_1.Express !== "undefined" && (_p = express_1.Express.Multer) !== void 0 && _p.File) === "function" ? _q : Object, typeof (_r = typeof BQCourrier_dto_1.CreateBQCourierDto !== "undefined" && BQCourrier_dto_1.CreateBQCourierDto) === "function" ? _r : Object]),
    __metadata("design:returntype", Promise)
], ExcelController.prototype, "uploadFileS", null);
exports.ExcelController = ExcelController = __decorate([
    (0, common_1.Controller)('excel'),
    __metadata("design:paramtypes", [typeof (_a = typeof cargasignacion_service_1.ExcelService !== "undefined" && cargasignacion_service_1.ExcelService) === "function" ? _a : Object, typeof (_b = typeof pagos_service_1.FrPagosService !== "undefined" && pagos_service_1.FrPagosService) === "function" ? _b : Object, typeof (_c = typeof frmascara_service_1.MascaraService !== "undefined" && frmascara_service_1.MascaraService) === "function" ? _c : Object, typeof (_d = typeof BQCourrier_service_1.BQCourierService !== "undefined" && BQCourrier_service_1.BQCourierService) === "function" ? _d : Object])
], ExcelController);


/***/ }),
/* 59 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadExcelDto = void 0;
const class_validator_1 = __webpack_require__(9);
const swagger_1 = __webpack_require__(4);
class UploadExcelDto {
}
exports.UploadExcelDto = UploadExcelDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la campaña',
        example: 'IBKPREV',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadExcelDto.prototype, "campaign_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID de la lista',
        example: 'LIST123',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadExcelDto.prototype, "list_id", void 0);


/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadDto = void 0;
const class_validator_1 = __webpack_require__(9);
class UploadDto {
}
exports.UploadDto = UploadDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UploadDto.prototype, "list_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UploadDto.prototype, "cCAMPAIGN_ID", void 0);


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BQCourierService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(19);
const csv = __webpack_require__(63);
const xlsx = __webpack_require__(40);
const BQCourier_entity_1 = __webpack_require__(64);
const stream_1 = __webpack_require__(65);
let BQCourierService = exports.BQCourierService = class BQCourierService {
    constructor(bqCourierRepo) {
        this.bqCourierRepo = bqCourierRepo;
    }
    async processFile(file, dto) {
        let records = [];
        if (file.mimetype === 'text/csv') {
            records = await this.parseCSV(file.buffer);
        }
        else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.mimetype === 'application/vnd.ms-excel') {
            records = await this.parseExcel(file.buffer);
        }
        else {
            throw new Error('Formato de archivo no soportado');
        }
        for (const record of records) {
            record.campania = dto.CAMPANIA;
            record.usuario = dto.USUARIO;
            record.fecarga = new Date();
            record.periodo = new Date().getFullYear().toString() +
                ('0' + (new Date().getMonth() + 1)).slice(-2);
        }
        await this.bqCourierRepo.insert(records);
        return `Se insertaron ${records.length} registros.`;
    }
    parseCSV(buffer) {
        return new Promise((resolve, reject) => {
            const results = [];
            const stream = stream_1.Readable.from(buffer.toString());
            stream.pipe(csv({ separator: ';' }))
                .on('data', (data) => {
                if (data.DOCUMENTO && data.CLIENTE && data.DIRECCION) {
                    results.push({
                        documento: data.DOCUMENTO.trim(),
                        cliente: data.CLIENTE.trim(),
                        direccion: data.DIRECCION.trim(),
                        departamento: data.DEPARTAMENTO?.trim() || '',
                        provincia: data.PROVINCIA?.trim() || '',
                        distrito: data.DISTRITO?.trim() || '',
                        deuda: parseFloat(data.DEUDA.replace(',', '.')) || 0,
                        cancelacion: parseFloat(data.CANCELACION.replace(',', '.')) || 0,
                        campania: '',
                        usuario: '',
                    });
                }
                else {
                    console.warn(`⚠️ Fila inválida ignorada: ${JSON.stringify(data)}`);
                }
            })
                .on('end', () => resolve(results))
                .on('error', (err) => reject(err));
        });
    }
    parseExcel(buffer) {
        const workbook = xlsx.read(buffer, { type: 'buffer' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        return xlsx.utils.sheet_to_json(sheet);
    }
};
exports.BQCourierService = BQCourierService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(BQCourier_entity_1.BqCourier)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], BQCourierService);


/***/ }),
/* 63 */
/***/ ((module) => {

module.exports = require("csv-parser");

/***/ }),
/* 64 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BqCourier = void 0;
const typeorm_1 = __webpack_require__(19);
let BqCourier = exports.BqCourier = class BqCourier {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], BqCourier.prototype, "documento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BqCourier.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BqCourier.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BqCourier.prototype, "departamento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BqCourier.prototype, "provincia", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BqCourier.prototype, "distrito", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], BqCourier.prototype, "deuda", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], BqCourier.prototype, "cancelacion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BqCourier.prototype, "campania", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BqCourier.prototype, "periodo", void 0);
__decorate([
    (0, typeorm_1.Column)('date'),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BqCourier.prototype, "fecarga", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BqCourier.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)('date'),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BqCourier.prototype, "fecha_envio", void 0);
exports.BqCourier = BqCourier = __decorate([
    (0, typeorm_1.Entity)('BQ_COURIER')
], BqCourier);


/***/ }),
/* 65 */
/***/ ((module) => {

module.exports = require("stream");

/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateBQCourierDto = void 0;
const class_validator_1 = __webpack_require__(9);
class CreateBQCourierDto {
}
exports.CreateBQCourierDto = CreateBQCourierDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBQCourierDto.prototype, "CAMPANIA", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBQCourierDto.prototype, "USUARIO", void 0);


/***/ }),
/* 67 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 68 */
/***/ ((module) => {

module.exports = require("body-parser");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const documentacion_1 = __webpack_require__(3);
const bodyParser = __webpack_require__(68);
const app_module_1 = __webpack_require__(5);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Main');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    app.enableCors({
        origin: 'http://192.168.1.6',
        credentials: true,
    });
    (0, documentacion_1.generateDocumentacion)(app);
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    await app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
        logger.log(`Server running on port ${process.env.PORT || 3000}`);
        logger.log(`Modo ${process.env.NODE_ENV ? process.env.NODE_ENV : 'Desarrollo'}`);
        logger.log(__dirname);
    });
}
bootstrap();

})();

/******/ })()
;