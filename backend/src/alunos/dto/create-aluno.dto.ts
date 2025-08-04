import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
  IsDateString,
  Matches,
} from 'class-validator';

export class CreateAlunoDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @MinLength(2, { message: 'O nome deve ter pelo menos 2 caracteres.' })
  @MaxLength(100, { message: 'O nome não pode ter mais de 100 caracteres.' })
  nome: string;

  @IsString({ message: 'O sobrenome deve ser uma string.' })
  @IsNotEmpty({ message: 'O sobrenome não pode ser vazio.' })
  @MinLength(2, { message: 'O sobrenome deve ter pelo menos 2 caracteres.' })
  @MaxLength(100, { message: 'O sobrenome não pode ter mais de 100 caracteres.' })
  sobrenome: string;

  @IsDateString({}, { message: 'A data de nascimento deve ser uma data válida no formato YYYY-MM-DD.' })
  @IsNotEmpty({ message: 'A data de nascimento não pode ser vazia.' })
  dataNascimento: string;

  @IsString({ message: 'O CPF deve ser uma string.' })
  @IsNotEmpty({ message: 'O CPF não pode ser vazio.' })
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'O CPF deve estar no formato 000.000.000-00.' })
  cpf: string;

  @IsString({ message: 'O gênero deve ser uma string.' })
  @IsNotEmpty({ message: 'O gênero não pode ser vazio.' })
  genero: string;

  @IsEmail({}, { message: 'O email deve ser um endereço de email válido.' })
  @IsNotEmpty({ message: 'O email não pode ser vazio.' })
  @MaxLength(255, { message: 'O email não pode ter mais de 255 caracteres.' })
  email: string;

  @IsString({ message: 'O CEP deve ser uma string.' })
  @IsNotEmpty({ message: 'O CEP não pode ser vazio.' })
  @Matches(/^\d{5}-\d{3}$/, { message: 'O CEP deve estar no formato 00000-000.' })
  cep: string;

  @IsString({ message: 'O país deve ser uma string.' })
  @IsNotEmpty({ message: 'O país não pode ser vazio.' })
  @MaxLength(100, { message: 'O país não pode ter mais de 100 caracteres.' })
  pais: string;

  @IsString({ message: 'A rua deve ser uma string.' })
  @IsNotEmpty({ message: 'A rua não pode ser vazia.' })
  @MaxLength(255, { message: 'A rua não pode ter mais de 255 caracteres.' })
  rua: string;

  @IsString({ message: 'O número deve ser uma string.' })
  @IsNotEmpty({ message: 'O número não pode ser vazio.' })
  @MaxLength(20, { message: 'O número não pode ter mais de 20 caracteres.' })
  numero: string;

  @IsOptional()
  @IsString({ message: 'O complemento deve ser uma string.' })
  @MaxLength(255, { message: 'O complemento não pode ter mais de 255 caracteres.' })
  complemento?: string;

  @IsString({ message: 'O bairro deve ser uma string.' })
  @IsNotEmpty({ message: 'O bairro não pode ser vazio.' })
  @MaxLength(100, { message: 'O bairro não pode ter mais de 100 caracteres.' })
  bairro: string;

  @IsString({ message: 'A cidade deve ser uma string.' })
  @IsNotEmpty({ message: 'A cidade não pode ser vazia.' })
  @MaxLength(100, { message: 'A cidade não pode ter mais de 100 caracteres.' })
  cidade: string;

  @IsString({ message: 'O estado deve ser uma string.' })
  @IsNotEmpty({ message: 'O estado não pode ser vazio.' })
  @MaxLength(100, { message: 'O estado não pode ter mais de 100 caracteres.' })
  estado: string;
}