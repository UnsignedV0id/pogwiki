"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagesController = void 0;
const common_1 = require("@nestjs/common");
const pages_dto_1 = require("../dto/pages.dto");
const pages_service_1 = require("../service/pages.service");
const jwt = require("jsonwebtoken");
let PagesController = class PagesController {
    constructor(pagesService) {
        this.pagesService = pagesService;
    }
    async findAll() {
        return this.pagesService.findAll();
    }
    async fillModerationData() {
        return this.pagesService.fillModerationData();
    }
    async fillUserCreatedPages(request) {
        const authorizationHeader = request.headers['authorization'];
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            const decodedToken = jwt.decode(token);
            if (decodedToken && typeof decodedToken === 'object') {
                return this.pagesService.fillUserCreatedPages(parseInt(decodedToken.id));
            }
            else {
                console.error('Erro ao decodificar o token.');
            }
        }
    }
    async findAllApproved() {
        return this.pagesService.findAllApproved();
    }
    async findOne(id) {
        return this.pagesService.findOne(id);
    }
    async create(createPagesDto, request) {
        const authorizationHeader = request.headers['authorization'];
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            const decodedToken = jwt.decode(token);
            if (decodedToken && typeof decodedToken === 'object') {
                createPagesDto.creator = parseInt(decodedToken.id);
            }
            else {
                console.error('Erro ao decodificar o token.');
            }
        }
        return this.pagesService.create(createPagesDto);
    }
    async update(id, updatePagesDto, request) {
        const authorizationHeader = request.headers['authorization'];
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            const decodedToken = jwt.decode(token);
            if (decodedToken && typeof decodedToken === 'object') {
                updatePagesDto.stateText = "Last updated by: " + decodedToken.username;
            }
            else {
                console.error('Erro ao decodificar o token.');
            }
        }
        return this.pagesService.update(id, updatePagesDto);
    }
    async delete(id) {
        return;
    }
};
exports.PagesController = PagesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('fillModData'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "fillModerationData", null);
__decorate([
    (0, common_1.Get)('myPages'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "fillUserCreatedPages", null);
__decorate([
    (0, common_1.Get)('approved'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "findAllApproved", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pages_dto_1.CreatePagesDto, Request]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, pages_dto_1.UpdatePagesDto,
        Request]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "delete", null);
exports.PagesController = PagesController = __decorate([
    (0, common_1.Controller)('pages'),
    __metadata("design:paramtypes", [pages_service_1.PagesService])
], PagesController);
//# sourceMappingURL=pages.controller.js.map