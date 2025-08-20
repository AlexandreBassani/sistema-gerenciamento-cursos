import { IsOptional, IsString, MaxLength, IsEnum, IsDateString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto'; 

export enum AlunoSortBy {
  NOME = 'nome',
  CPF = 'cpf',
  DATA_CADASTRO = 'createdAt'
}

export enum OrderEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class GetAlunosDto extends PaginationDto {
  @IsOptional()
  @IsString({ message: 'O termo de busca deve ser uma string.' })
  @MaxLength(100, { message: 'O termo de busca não pode exceder 100 caracteres.' })
  search?: string;

  @IsOptional()
  @IsString({ message: 'O estado deve ser uma string.' })
  @MaxLength(100, { message: 'O estado não pode exceder 100 caracteres.' })
  estado?: string;

  @IsOptional()
  @IsEnum(AlunoSortBy, { message: 'Campo de ordenação inválido.' })
  sortBy?: AlunoSortBy = AlunoSortBy.NOME;

  @IsOptional()
  @IsEnum(OrderEnum, { message: 'Ordem de classificação inválida. Use ASC ou DESC.' })
  order?: OrderEnum = OrderEnum.ASC;

  @IsOptional()
  @IsDateString({}, { message: 'A data inicial deve ser uma data válida no formato YYYY-MM-DD.' })
  dataInicio?: string;

  @IsOptional()
  @IsDateString({}, { message: 'A data final deve ser uma data válida no formato YYYY-MM-DD.' })
  dataFim?: string;
}
  