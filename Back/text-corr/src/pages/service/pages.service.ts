import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pages } from "../entity/pages.entity";
import { CreatePagesDto, UpdatePagesDto } from "../dto/pages.dto";
import { UserService } from "src/user/service/user.service";

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Pages)
    private pagesRepository: Repository<Pages>,
    private userService: UserService
  ) {}

  async create(createPagesDto: CreatePagesDto): Promise<Pages> {
    const creator = await this.userService.findOne(createPagesDto.creator);
    if (!creator) {
      throw new NotFoundException(`Usuário não encontrado.`);
      }
    const newPages = this.pagesRepository.create({
      ...createPagesDto,
      user: creator, // Associando o usuário encontrado ao novo registro de pagina
    });
    return await this.pagesRepository.save(newPages);
  }

  async findAll(): Promise<Pages[]> {
    return await this.pagesRepository.find();
  }

  async fillModerationData(): Promise<Pages[]> {
    return await this.pagesRepository.query("SELECT A.*, B.nome FROM pages AS A, user AS B WHERE A.creator = B.id_user");
  }

  async fillUserCreatedPages(userId): Promise<Pages[]> {
    return await this.pagesRepository.query(`SELECT A.*  FROM pages AS A WHERE A.creator = ${userId}`);
  }

  async findAllApproved(): Promise<Pages[]> {
    const pages = await this.pagesRepository.find({
      where: { state: 2 },
    });
    if (!pages) {
      throw new NotFoundException(`Pagina não encontrada.`);
    }
    return pages;
  }

  async findOne(id: number): Promise<Pages> {
    const pages = await this.pagesRepository.findOne({
      where: { id_pages: id },
    });
    if (!pages) {
      throw new NotFoundException(`Pagina não encontrada.`);
    }
    return pages;
  }

  async update(
    id: number,
    updatePagesDto: UpdatePagesDto
  ): Promise<Pages> {
    const pages = await this.findOne(id);
    delete updatePagesDto.creator;

    const updated = this.pagesRepository.merge(pages, updatePagesDto);
    return await this.pagesRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const pages = await this.findOne(id);
    await this.pagesRepository.remove(pages);
  }
}
