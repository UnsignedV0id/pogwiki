import { Repository } from "typeorm";
import { Pages } from "../entity/pages.entity";
import { CreatePagesDto, UpdatePagesDto } from "../dto/pages.dto";
import { UserService } from "src/user/service/user.service";
export declare class PagesService {
    private pagesRepository;
    private userService;
    constructor(pagesRepository: Repository<Pages>, userService: UserService);
    create(createPagesDto: CreatePagesDto): Promise<Pages>;
    findAll(): Promise<Pages[]>;
    findOne(id: number): Promise<Pages>;
    update(id: number, updatePagesDto: UpdatePagesDto): Promise<Pages>;
    remove(id: number): Promise<void>;
}
