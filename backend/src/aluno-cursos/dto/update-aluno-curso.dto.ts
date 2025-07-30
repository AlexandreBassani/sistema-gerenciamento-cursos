import { PartialType } from '@nestjs/mapped-types';
import { CreateAlunoCursoDto } from './create-aluno-curso.dto';

export class UpdateAlunoCursoDto extends PartialType(CreateAlunoCursoDto) {}
