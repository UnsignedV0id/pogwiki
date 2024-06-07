import { CreatePagesDto, UpdatePagesDto } from '../dto/pages.dto';
import { PagesService } from '../service/pages.service';
export declare class PagesController {
    private readonly pagesService;
    constructor(pagesService: PagesService);
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    create(createPagesDto: CreatePagesDto): Promise<any>;
    update(id: number, updatePagesDto: UpdatePagesDto): Promise<any>;
    delete(id: number): Promise<void>;
}
