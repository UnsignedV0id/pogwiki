import { IsInt, IsOptional, IsString, Length, isInt } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreatePagesDto {
  @IsString()
  @Length(2, 40, { message: 'tamanho de 2 a 40 caracteres' })
  title: string;

  @IsString()
  content: string;

  @IsInt()
  creator: number;

  @IsString()
  @IsOptional()
  stateText: string;

  @IsInt()
  @IsOptional()
  state: number;

  }

export class UpdatePagesDto extends PartialType(CreatePagesDto) {}
