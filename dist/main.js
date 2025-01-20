/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_controller_1 = __webpack_require__(/*! ./controllers/app.controller */ "./src/controllers/app.controller.ts");
const database_module_1 = __webpack_require__(/*! ./database/database.module */ "./src/database/database.module.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const config_2 = __webpack_require__(/*! ./config/config */ "./src/config/config.ts");
const Joi = __webpack_require__(/*! joi */ "joi");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const campania_entity_1 = __webpack_require__(/*! ./entities/campania.entity */ "./src/entities/campania.entity.ts");
const vrc_principal_cliente_entity_1 = __webpack_require__(/*! ./entities/vrc-principal-cliente.entity */ "./src/entities/vrc-principal-cliente.entity.ts");
const vrc_pagos_entity_1 = __webpack_require__(/*! ./entities/vrc-pagos.entity */ "./src/entities/vrc-pagos.entity.ts");
const vrc_fotogestion_entity_1 = __webpack_require__(/*! src/entities/vrc-fotogestion.entity */ "./src/entities/vrc-fotogestion.entity.ts");
const vrc_wspmasivo_entity_1 = __webpack_require__(/*! ./entities/vrc-wspmasivo.entity */ "./src/entities/vrc-wspmasivo.entity.ts");
const vrc_smsmasivo_entity_1 = __webpack_require__(/*! ./entities/vrc-smsmasivo.entity */ "./src/entities/vrc-smsmasivo.entity.ts");
const campania_service_1 = __webpack_require__(/*! ./services/campania.service */ "./src/services/campania.service.ts");
const vrc_principal_cliente_service_1 = __webpack_require__(/*! ./services/vrc-principal-cliente.service */ "./src/services/vrc-principal-cliente.service.ts");
const vrc_pagos_service_1 = __webpack_require__(/*! ./services/vrc-pagos.service */ "./src/services/vrc-pagos.service.ts");
const vrc_fotogestion_service_1 = __webpack_require__(/*! ./services/vrc-fotogestion.service */ "./src/services/vrc-fotogestion.service.ts");
const vrc_wspmasivo_service_1 = __webpack_require__(/*! ./services/vrc-wspmasivo.service */ "./src/services/vrc-wspmasivo.service.ts");
const vrc_smsmasivo_service_1 = __webpack_require__(/*! ./services/vrc-smsmasivo.service */ "./src/services/vrc-smsmasivo.service.ts");
const maestra_controller_1 = __webpack_require__(/*! ./controllers/maestra.controller */ "./src/controllers/maestra.controller.ts");
const cargasignacion_service_1 = __webpack_require__(/*! ./services/cargasignacion.service */ "./src/services/cargasignacion.service.ts");
const cargabases_controller_1 = __webpack_require__(/*! ./controllers/cargabases.controller */ "./src/controllers/cargabases.controller.ts");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([campania_entity_1.Campaign, vrc_principal_cliente_entity_1.MainClientes, vrc_pagos_entity_1.PagosEntity, vrc_fotogestion_entity_1.FotogestionesEntity, vrc_wspmasivo_entity_1.ObtenerWspmasivoClt, vrc_smsmasivo_entity_1.ObtenerSmsMasivoClt]),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
                load: [config_2.default],
                validationSchema: Joi.object(config_2.validation),
            }),
            database_module_1.DatabaseModule,
        ],
        providers: [campania_service_1.CampaignService, vrc_principal_cliente_service_1.MainClientService, vrc_pagos_service_1.PagosService, vrc_fotogestion_service_1.GestionService, cargasignacion_service_1.ExcelService, vrc_wspmasivo_service_1.ObtenerWspmasivoCltService, vrc_smsmasivo_service_1.ObtenerSmsMasivoCltService],
        controllers: [app_controller_1.AppController, maestra_controller_1.MaestraController, cargabases_controller_1.ExcelController],
    })
], AppModule);


/***/ }),

/***/ "./src/common/response.ts":
/*!********************************!*\
  !*** ./src/common/response.ts ***!
  \********************************/
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

/***/ "./src/config/config.ts":
/*!******************************!*\
  !*** ./src/config/config.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validation = void 0;
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const Joi = __webpack_require__(/*! joi */ "joi");
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

/***/ "./src/controllers/app.controller.ts":
/*!*******************************************!*\
  !*** ./src/controllers/app.controller.ts ***!
  \*******************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const excel_dto_1 = __webpack_require__(/*! ../dtos/excel.dto */ "./src/dtos/excel.dto.ts");
const node_1 = __webpack_require__(/*! write-excel-file/node */ "write-excel-file/node");
const response_1 = __webpack_require__(/*! ../common/response */ "./src/common/response.ts");
const utils_1 = __webpack_require__(/*! src/utils */ "./src/utils.ts");
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

/***/ "./src/controllers/cargabases.controller.ts":
/*!**************************************************!*\
  !*** ./src/controllers/cargabases.controller.ts ***!
  \**************************************************/
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExcelController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const cargasignacion_service_1 = __webpack_require__(/*! src/services/cargasignacion.service */ "./src/services/cargasignacion.service.ts");
const uploadExece_dto_1 = __webpack_require__(/*! src/dtos/uploadExece.dto */ "./src/dtos/uploadExece.dto.ts");
let ExcelController = exports.ExcelController = class ExcelController {
    constructor(excelService) {
        this.excelService = excelService;
    }
    async uploadExcel(uploadExcelDto, file) {
        if (!file) {
            throw new common_1.BadRequestException('No se subió ningún archivo');
        }
        const { campaign_id, list_id } = uploadExcelDto;
        return this.excelService.processExcel(file, campaign_id, list_id);
    }
};
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof uploadExece_dto_1.UploadExcelDto !== "undefined" && uploadExece_dto_1.UploadExcelDto) === "function" ? _b : Object, typeof (_d = typeof Express !== "undefined" && (_c = Express.Multer) !== void 0 && _c.File) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], ExcelController.prototype, "uploadExcel", null);
exports.ExcelController = ExcelController = __decorate([
    (0, common_1.Controller)('excel'),
    __metadata("design:paramtypes", [typeof (_a = typeof cargasignacion_service_1.ExcelService !== "undefined" && cargasignacion_service_1.ExcelService) === "function" ? _a : Object])
], ExcelController);


/***/ }),

/***/ "./src/controllers/maestra.controller.ts":
/*!***********************************************!*\
  !*** ./src/controllers/maestra.controller.ts ***!
  \***********************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MaestraController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const campania_service_1 = __webpack_require__(/*! src/services/campania.service */ "./src/services/campania.service.ts");
const vrc_obtenercliente_dto_1 = __webpack_require__(/*! src/dtos/vrc-obtenercliente.dto */ "./src/dtos/vrc-obtenercliente.dto.ts");
const vrc_principal_cliente_service_1 = __webpack_require__(/*! src/services/vrc-principal-cliente.service */ "./src/services/vrc-principal-cliente.service.ts");
const vrc_pagoscliente_dto_1 = __webpack_require__(/*! src/dtos/vrc-pagoscliente.dto */ "./src/dtos/vrc-pagoscliente.dto.ts");
const vrc_pagos_service_1 = __webpack_require__(/*! src/services/vrc-pagos.service */ "./src/services/vrc-pagos.service.ts");
const vrc_fotogestion_service_1 = __webpack_require__(/*! ../services/vrc-fotogestion.service */ "./src/services/vrc-fotogestion.service.ts");
const vrc_obtenergestioncliente_dto_1 = __webpack_require__(/*! src/dtos/vrc-obtenergestioncliente.dto */ "./src/dtos/vrc-obtenergestioncliente.dto.ts");
let MaestraController = exports.MaestraController = class MaestraController {
    constructor(campaignService, clientMainService, pagosService, gestionService) {
        this.campaignService = campaignService;
        this.clientMainService = clientMainService;
        this.pagosService = pagosService;
        this.gestionService = gestionService;
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
    __metadata("design:paramtypes", [typeof (_e = typeof vrc_obtenercliente_dto_1.ObtenerDatosCltDto !== "undefined" && vrc_obtenercliente_dto_1.ObtenerDatosCltDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], MaestraController.prototype, "obtenerDatos", null);
__decorate([
    (0, common_1.Post)('pagos'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof vrc_pagoscliente_dto_1.PagosClienteDto !== "undefined" && vrc_pagoscliente_dto_1.PagosClienteDto) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], MaestraController.prototype, "getPagos", null);
__decorate([
    (0, common_1.Post)('gestiones'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof vrc_obtenergestioncliente_dto_1.ObtenerGestionDto !== "undefined" && vrc_obtenergestioncliente_dto_1.ObtenerGestionDto) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], MaestraController.prototype, "obtenerGestion", null);
exports.MaestraController = MaestraController = __decorate([
    (0, common_1.Controller)('maestra'),
    __metadata("design:paramtypes", [typeof (_a = typeof campania_service_1.CampaignService !== "undefined" && campania_service_1.CampaignService) === "function" ? _a : Object, typeof (_b = typeof vrc_principal_cliente_service_1.MainClientService !== "undefined" && vrc_principal_cliente_service_1.MainClientService) === "function" ? _b : Object, typeof (_c = typeof vrc_pagos_service_1.PagosService !== "undefined" && vrc_pagos_service_1.PagosService) === "function" ? _c : Object, typeof (_d = typeof vrc_fotogestion_service_1.GestionService !== "undefined" && vrc_fotogestion_service_1.GestionService) === "function" ? _d : Object])
], MaestraController);


/***/ }),

/***/ "./src/database/database.module.ts":
/*!*****************************************!*\
  !*** ./src/database/database.module.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const config_1 = __webpack_require__(/*! src/config/config */ "./src/config/config.ts");
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
                }),
                inject: [config_1.default.KEY],
            }),
        ],
    })
], DatabaseModule);


/***/ }),

/***/ "./src/documentacion.ts":
/*!******************************!*\
  !*** ./src/documentacion.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateDocumentacion = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
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

/***/ "./src/dtos/excel.dto.ts":
/*!*******************************!*\
  !*** ./src/dtos/excel.dto.ts ***!
  \*******************************/
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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./src/dtos/uploadExece.dto.ts":
/*!*************************************!*\
  !*** ./src/dtos/uploadExece.dto.ts ***!
  \*************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./src/dtos/vrc-obtenercliente.dto.ts":
/*!********************************************!*\
  !*** ./src/dtos/vrc-obtenercliente.dto.ts ***!
  \********************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./src/dtos/vrc-obtenergestioncliente.dto.ts":
/*!***************************************************!*\
  !*** ./src/dtos/vrc-obtenergestioncliente.dto.ts ***!
  \***************************************************/
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
exports.ObtenerGestionDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class ObtenerGestionDto {
}
exports.ObtenerGestionDto = ObtenerGestionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObtenerGestionDto.prototype, "dni", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObtenerGestionDto.prototype, "num_cta", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ObtenerGestionDto.prototype, "campania", void 0);


/***/ }),

/***/ "./src/dtos/vrc-pagoscliente.dto.ts":
/*!******************************************!*\
  !*** ./src/dtos/vrc-pagoscliente.dto.ts ***!
  \******************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./src/entities/campania.entity.ts":
/*!*****************************************!*\
  !*** ./src/entities/campania.entity.ts ***!
  \*****************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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

/***/ "./src/entities/vrc-fotogestion.entity.ts":
/*!************************************************!*\
  !*** ./src/entities/vrc-fotogestion.entity.ts ***!
  \************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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

/***/ "./src/entities/vrc-pagos.entity.ts":
/*!******************************************!*\
  !*** ./src/entities/vrc-pagos.entity.ts ***!
  \******************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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

/***/ "./src/entities/vrc-principal-cliente.entity.ts":
/*!******************************************************!*\
  !*** ./src/entities/vrc-principal-cliente.entity.ts ***!
  \******************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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

/***/ "./src/entities/vrc-smsmasivo.entity.ts":
/*!**********************************************!*\
  !*** ./src/entities/vrc-smsmasivo.entity.ts ***!
  \**********************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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

/***/ "./src/entities/vrc-wspmasivo.entity.ts":
/*!**********************************************!*\
  !*** ./src/entities/vrc-wspmasivo.entity.ts ***!
  \**********************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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

/***/ "./src/services/campania.service.ts":
/*!******************************************!*\
  !*** ./src/services/campania.service.ts ***!
  \******************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const campania_entity_1 = __webpack_require__(/*! src/entities/campania.entity */ "./src/entities/campania.entity.ts");
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

/***/ "./src/services/cargasignacion.service.ts":
/*!************************************************!*\
  !*** ./src/services/cargasignacion.service.ts ***!
  \************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const XLSX = __webpack_require__(/*! xlsx */ "xlsx");
let ExcelService = exports.ExcelService = class ExcelService {
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
        console.log(`Archivo recibido: Nombre=${file.originalname}, Tamaño=${file.size}`);
        const workbook = XLSX.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        console.log(`Total de filas leídas (incluyendo encabezados): ${data.length}`);
        if (data.length < 2) {
            throw new common_1.InternalServerErrorException('El archivo Excel está vacío o mal formateado');
        }
        const headers = data[0];
        const rows = data.slice(1);
        console.log(`Encabezados detectados: ${headers}`);
        console.log(`Total de filas de datos: ${rows.length}`);
        const mappingQuery = `
      SELECT columna AS cabecera_asignacion, columna_etiqueta
      FROM [BD_CR_MAESTRA].[dbo].[T_Columnas2]
      WHERE campaign_id = @0
    `;
        const mapping = await this.dataSource.query(mappingQuery, [campaign_id]);
        console.log(`Columnas mapeadas desde la base de datos: ${JSON.stringify(mapping)}`);
        if (!mapping || mapping.length === 0) {
            throw new common_1.InternalServerErrorException('No se encontraron columnas mapeadas para la campaña proporcionada');
        }
        const columnMapping = mapping.reduce((acc, curr) => {
            acc[curr.columna_etiqueta] = curr.cabecera_asignacion;
            return acc;
        }, {});
        const filteredHeaders = headers.filter((header) => columnMapping[header]);
        if (filteredHeaders.length === 0) {
            throw new common_1.InternalServerErrorException('No hay cabeceras válidas para insertar en la base de datos.');
        }
        const mappedColumns = filteredHeaders.map((header) => columnMapping[header]);
        const additionalColumns = ['campaign_id', 'list_id', 'dFecha_CARGA_CSV'];
        mappedColumns.push(...additionalColumns);
        console.log(`Columnas finales para inserción: ${mappedColumns}`);
        const columnInfoQuery = `
      SELECT COLUMN_NAME AS columnName, DATA_TYPE AS dataType, CHARACTER_MAXIMUM_LENGTH AS maxLength
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = 'FR_ASIGNACION'
    `;
        const columnInfo = await this.dataSource.query(columnInfoQuery);
        const columnDetails = columnInfo.reduce((acc, curr) => {
            acc[curr.columnName] = {
                maxLength: curr.maxLength,
                dataType: curr.dataType,
            };
            return acc;
        }, {});
        const errors = [];
        const validRows = [];
        let totalInsertedRecords = 0;
        for (const [rowIndex, row] of rows.entries()) {
            try {
                const filteredRow = filteredHeaders.map((header) => {
                    const columnName = columnMapping[header];
                    const column = columnDetails[columnName];
                    const colIndex = headers.indexOf(header);
                    return this.validateAndConvert(row[colIndex] || null, column, columnName, rowIndex);
                });
                filteredRow.push(campaign_id, list_id, this.getLocalDateTime());
                validRows.push(filteredRow);
            }
            catch (error) {
                errors.push({ row: rowIndex + 2, error: error.message });
            }
        }
        console.log(`Total de filas válidas: ${validRows.length}`);
        console.log(`Errores durante la validación: ${JSON.stringify(errors)}`);
        const batches = [];
        for (let i = 0; i < validRows.length; i += BATCH_SIZE) {
            batches.push(validRows.slice(i, i + BATCH_SIZE));
        }
        for (const batch of batches) {
            const insertColumns = mappedColumns.join(', ');
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
        INSERT INTO [BD_CR_MAESTRA].[dbo].[FR_ASIGNACION]
        (${insertColumns})
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
};
exports.ExcelService = ExcelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], ExcelService);


/***/ }),

/***/ "./src/services/vrc-fotogestion.service.ts":
/*!*************************************************!*\
  !*** ./src/services/vrc-fotogestion.service.ts ***!
  \*************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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

/***/ "./src/services/vrc-pagos.service.ts":
/*!*******************************************!*\
  !*** ./src/services/vrc-pagos.service.ts ***!
  \*******************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const vrc_pagos_entity_1 = __webpack_require__(/*! ../entities/vrc-pagos.entity */ "./src/entities/vrc-pagos.entity.ts");
const typeorm_2 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
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

/***/ "./src/services/vrc-principal-cliente.service.ts":
/*!*******************************************************!*\
  !*** ./src/services/vrc-principal-cliente.service.ts ***!
  \*******************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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

/***/ "./src/services/vrc-smsmasivo.service.ts":
/*!***********************************************!*\
  !*** ./src/services/vrc-smsmasivo.service.ts ***!
  \***********************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const vrc_smsmasivo_entity_1 = __webpack_require__(/*! src/entities/vrc-smsmasivo.entity */ "./src/entities/vrc-smsmasivo.entity.ts");
let ObtenerSmsMasivoCltService = exports.ObtenerSmsMasivoCltService = class ObtenerSmsMasivoCltService {
    constructor(smsmasivoCltRepository) {
        this.smsmasivoCltRepository = smsmasivoCltRepository;
    }
    async obtenerDatos(dto) {
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

/***/ "./src/services/vrc-wspmasivo.service.ts":
/*!***********************************************!*\
  !*** ./src/services/vrc-wspmasivo.service.ts ***!
  \***********************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const vrc_wspmasivo_entity_1 = __webpack_require__(/*! src/entities/vrc-wspmasivo.entity */ "./src/entities/vrc-wspmasivo.entity.ts");
let ObtenerWspmasivoCltService = exports.ObtenerWspmasivoCltService = class ObtenerWspmasivoCltService {
    constructor(wspmasivoCltRepository) {
        this.wspmasivoCltRepository = wspmasivoCltRepository;
    }
    async obtenerDatos(dto) {
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

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
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

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/platform-express":
/*!*******************************************!*\
  !*** external "@nestjs/platform-express" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("joi");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "write-excel-file/node":
/*!****************************************!*\
  !*** external "write-excel-file/node" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("write-excel-file/node");

/***/ }),

/***/ "xlsx":
/*!***********************!*\
  !*** external "xlsx" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("xlsx");

/***/ })

/******/ 	});
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
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const documentacion_1 = __webpack_require__(/*! ./documentacion */ "./src/documentacion.ts");
const bodyParser = __webpack_require__(/*! body-parser */ "body-parser");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
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
    await app.listen(process.env.PORT || 3000, () => {
        logger.log(`Server running on port ${process.env.PORT || 3000}`);
        logger.log(`Modo ${process.env.NODE_ENV ? process.env.NODE_ENV : 'Desarrollo'}`);
        logger.log(__dirname);
    });
}
bootstrap();

})();

/******/ })()
;