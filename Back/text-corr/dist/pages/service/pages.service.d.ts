import { User } from "./../../user/entity/user.entity";
import { Repository } from "typeorm";
import { UserService } from "./../../user/service/user.service";
import { Pages } from "../entity/pages.entity";
import { CreatePagesDto, UpdatePagesDto } from "../dto/pages.dto";
export declare class PagesService {
    private pagesRepository;
    private userService;
    constructor(pagesRepository: Repository<Pages>, userService: UserService);
    create(createPagesDto: CreatePagesDto): Promise<Pages>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<Pages>;
    update(id: number, updatePagesDto: UpdatePagesDto): Promise<Pages>;
    remove(id: number): Promise<void>;
}
