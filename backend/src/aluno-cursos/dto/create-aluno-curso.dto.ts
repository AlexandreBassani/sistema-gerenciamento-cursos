import { IsInt, IsDate, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAlunoCursoDto {
  @IsInt()
  alunoId: number;

  @IsInt()
  cursoId: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dataConclusao?: Date;

  @IsOptional()
  @IsBoolean()
  concluido?: boolean;
}
