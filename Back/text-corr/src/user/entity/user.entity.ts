import { Pages } from 'src/pages/entity/pages.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'; // foi incluida importação de ManyToOne

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column({ length: 40 })
  nome: string;

  @Column({ unique: true, length: 40 })
  email: string;

  @Column()
  senha: string;

  @Column({default : 0})//0 - Commom , 1- ADM
  tipo: number;

  @OneToMany(() => Pages, (pages) => pages.user) // esta linha foi adicionada
  pages: Pages[]; // esta linha foi adicionada
}
