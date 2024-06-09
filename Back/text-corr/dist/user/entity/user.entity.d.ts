import { Pages } from 'src/pages/entity/pages.entity';
export declare class User {
    id_user: number;
    nome: string;
    email: string;
    senha: string;
    tipo: number;
    pages: Pages[];
}
