import { PartialType } from '@nestjs/mapped-types';
import { CreateAlunoCursoDto } from './create-aluno-curso.dto';
import { IsInt, IsDateString, IsBoolean, IsOptional } from 'class-validator';


export class UpdateAlunoCursoDto extends PartialType(CreateAlunoCursoDto) {}