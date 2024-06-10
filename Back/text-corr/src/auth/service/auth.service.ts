import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from "src/user/entity/user.entity";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(nome: string, senha: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { nome } });
    if (user && await bcrypt.compare(senha, user.senha)) {
      const { senha, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.nome, id: user.id_user , type : user.tipo};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}