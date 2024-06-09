import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { DatabaseModule } from '../database/database.module';
import { User } from '../user/entity/user.entity';
import { Pages } from '../pages/entity/pages.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { PagesController } from '../pages/controller/pages.controller';
import { PagesService } from 'src/pages/service/pages.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User, Pages]),
  ],
  controllers: [AppController, UserController, PagesController],
  providers: [AppService, UserService, PagesService],
})
export class UserModule {}