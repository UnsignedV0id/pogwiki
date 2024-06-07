import { User } from 'src/user/entity/user.entity';
import { Entity, PrimaryGeneratedColumn, Column , ManyToOne, JoinColumn} from 'typeorm'; 

@Entity('pages')
export class Pages {
  @PrimaryGeneratedColumn()
  id_pages: number;

  @Column({ length: 40 })
  title: string;

  @Column({type: 'text' })
  content: string;

  @Column({ type: 'int' , default : 0})
  state: number; // 0 - created , 1 - rejected , 2 - approved 
  
  @Column({default : 'newly added'})
  stateText: string; 

  @ManyToOne(() => User, (user) => user.pages) // esta linha foi adicionada
  @JoinColumn({name:'creator'})
  user: User; // esta linha foi adicionada

}
