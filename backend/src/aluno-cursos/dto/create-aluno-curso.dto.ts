import {
  IsInt,
  IsBoolean,
  IsOptional,
  IsDate, 
  Min,
  IsNotEmpty, 
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAlunoCursoDto {
  @IsInt({ message: 'O ID do aluno deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O ID do aluno não pode ser vazio.' })
  @Min(1, { message: 'O ID do aluno deve ser maior que 0.' })
  alunoId: number;

  @IsInt({ message: 'O ID do curso deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O ID do curso não pode ser vazio.' })
  @Min(1, { message: 'O ID do curso deve ser maior que 0.' })
  cursoId: number;

  @IsOptional()
  @Type(() => Date) 
  @IsDate({ message: 'A data de conclusão deve ser uma data válida.' })
  dataConclusao?: Date; 

  @IsOptional()
  @IsBoolean({ message: 'Concluído deve ser um valor booleano (true/false).' })
  concluido?: boolean;
}