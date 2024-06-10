import { CreatePagesDto, UpdatePagesDto } from '../dto/pages.dto';
import { PagesService } from '../service/pages.service';
export declare class PagesController {
    private readonly pagesService;
    constructor(pagesService: PagesService);
    findAll(): Promise<any[]>;
    fillModerationData(): Promise<any[]>;
    fillUserCreatedPages(request: Request): Promise<any[]>;
    findAllApproved(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    create(createPagesDto: CreatePagesDto, request: Request): Promise<any>;
    update(id: number, updatePagesDto: UpdatePagesDto, request: Request): Promise<any>;
    delete(id: number): Promise<void>;
}
