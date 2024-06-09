
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { CreatePagesDto, UpdatePagesDto } from '../dto/pages.dto';
  import { PagesService } from '../service/pages.service';
  
  @Controller('pages')
  export class PagesController {
    constructor(private readonly pagesService: PagesService) {}
  
    @Get()
    async findAll(): Promise<any[]> {
      return this.pagesService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<any> {
      return this.pagesService.findOne(id);
    }
  
    @Post()
    async create(@Body() createPagesDto: CreatePagesDto): Promise<any> {
      return this.pagesService.create(createPagesDto);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body() updatePagesDto: UpdatePagesDto,
    ): Promise<any> {
      return this.pagesService.update(id, updatePagesDto);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
      return //this.pagesService.delete(id);
    }
  }
  
  
