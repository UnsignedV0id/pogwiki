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
exports.PagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pages_entity_1 = require("../entity/pages.entity");
const user_service_1 = require("../../user/service/user.service");
let PagesService = class PagesService {
    constructor(pagesRepository, userService) {
        this.pagesRepository = pagesRepository;
        this.userService = userService;
    }
    async create(createPagesDto) {
        const creator = await this.userService.findOne(createPagesDto.creator);
        if (!creator) {
            throw new common_1.NotFoundException(`Usuário não encontrado.`);
        }
        const newPages = this.pagesRepository.create({
            ...createPagesDto,
            user: creator,
        });
        return await this.pagesRepository.save(newPages);
    }
    async findAll() {
        return await this.pagesRepository.find();
    }
    async fillModerationData() {
        return await this.pagesRepository.query("SELECT A.*, B.nome FROM pages AS A, user AS B WHERE A.creator = B.id_user");
    }
    async fillUserCreatedPages(userId) {
        return await this.pagesRepository.query(`SELECT A.*  FROM pages AS A WHERE A.creator = ${userId}`);
    }
    async findAllApproved() {
        const pages = await this.pagesRepository.find({
            where: { state: 2 },
        });
        if (!pages) {
            throw new common_1.NotFoundException(`Pagina não encontrada.`);
        }
        return pages;
    }
    async findOne(id) {
        const pages = await this.pagesRepository.findOne({
            where: { id_pages: id },
        });
        if (!pages) {
            throw new common_1.NotFoundException(`Pagina não encontrada.`);
        }
        return pages;
    }
    async update(id, updatePagesDto) {
        const pages = await this.findOne(id);
        delete updatePagesDto.creator;
        const updated = this.pagesRepository.merge(pages, updatePagesDto);
        return await this.pagesRepository.save(updated);
    }
    async remove(id) {
        const pages = await this.findOne(id);
        await this.pagesRepository.remove(pages);
    }
};
exports.PagesService = PagesService;
exports.PagesService = PagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pages_entity_1.Pages)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], PagesService);
//# sourceMappingURL=pages.service.js.map