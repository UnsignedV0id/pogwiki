
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
  } from '@nestjs/common';
  import { CreatePagesDto, UpdatePagesDto } from '../dto/pages.dto';
  import { PagesService } from '../service/pages.service';
  import * as jwt from 'jsonwebtoken'; // Importe a biblioteca jsonwebtoken

  @Controller('pages')
  export class PagesController {
    constructor(private readonly pagesService: PagesService) {}
  
    @Get()
    async findAll(): Promise<any[]> {
      return this.pagesService.findAll();
    }

    @Get('fillModData')
    async fillModerationData(): Promise<any[]> {
      return this.pagesService.fillModerationData();
    }

    @Get('myPages')
    async fillUserCreatedPages(@Req() request: Request): Promise<any[]> {

      const authorizationHeader = request.headers['authorization'];
      if (authorizationHeader) {
        // Se o header de autorização existir
        const token = authorizationHeader.split(' ')[1]; // Obtém o token JWT
        const decodedToken = jwt.decode(token); // Decodifica o token JWT sem chave secreta
          
        if (decodedToken && typeof decodedToken === 'object') {
          return this.pagesService.fillUserCreatedPages(parseInt(decodedToken.id));
        } else {
          console.error('Erro ao decodificar o token.');
        }
      }

    }
  
    @Get('approved')
    async findAllApproved(): Promise<any[]> {
      return this.pagesService.findAllApproved();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<any> {
      return this.pagesService.findOne(id);
    }
  

    @Post()
    async create(@Body() createPagesDto: CreatePagesDto, @Req() request: Request): Promise<any> {
      const authorizationHeader = request.headers['authorization'];
      if (authorizationHeader) {
        // Se o header de autorização existir
        const token = authorizationHeader.split(' ')[1]; // Obtém o token JWT
        const decodedToken = jwt.decode(token); // Decodifica o token JWT sem chave secreta
          
        if (decodedToken && typeof decodedToken === 'object') {
          createPagesDto.creator = parseInt(decodedToken.id); 
        } else {
          console.error('Erro ao decodificar o token.');
        }
      }
  
      return this.pagesService.create(createPagesDto);
    }

    
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body() updatePagesDto: UpdatePagesDto,
      @Req() request: Request
    ): Promise<any> {
      const authorizationHeader = request.headers['authorization'];
      if (authorizationHeader) {
        // Se o header de autorização existir
        const token = authorizationHeader.split(' ')[1]; // Obtém o token JWT
        const decodedToken = jwt.decode(token); // Decodifica o token JWT sem chave secreta
          
        if (decodedToken && typeof decodedToken === 'object') {
          updatePagesDto.stateText = "Last updated by: " + decodedToken.username; 
        } else {
          console.error('Erro ao decodificar o token.');
        }
      }
  
      return this.pagesService.update(id, updatePagesDto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
      return //this.pagesService.delete(id);
    }
  }
  
  
