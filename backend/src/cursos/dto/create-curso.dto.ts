import { IsString, IsNotEmpty, MaxLength, IsOptional, IsInt, Min } from 'class-validator';

export class CreateCursoDto {
  @IsString({ message: 'O nome do curso deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome do curso não pode ser vazio.' })
  @MaxLength(255, { message: 'O nome do curso não pode ter mais de 255 caracteres.' })
  nome: string;

  @IsOptional()
  @IsString({ message: 'A descrição do curso deve ser uma string.' })
  @MaxLength(1000, { message: 'A descrição do curso não pode ter mais de 1000 caracteres.' }) 
  descricao?: string;

  @IsOptional()
  @IsInt({ message: 'A carga horária deve ser um número inteiro.' })
  @Min(1, { message: 'A carga horária mínima é 1 hora.' })
  cargaHoraria?: number;
}