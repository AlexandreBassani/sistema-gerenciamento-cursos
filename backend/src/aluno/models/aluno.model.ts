import { Column, Model, Table, PrimaryKey, AutoIncrement, DataType, BelongsToMany } from 'sequelize-typescript';
import { Curso } from '../../curso/models/curso.model';
import { AlunoCurso } from '../../aluno-curso/models/aluno-curso.model'; 

@Table({
  tableName: 'alunos',
  timestamps: true,
})
export class Aluno extends Model<Aluno> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  nome: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  sobrenome: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  dataNascimento: Date;

  @Column({
    type: DataType.STRING(14),
    allowNull: false,
    unique: true,
  })
  cpf: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  genero: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  cep: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  pais: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  rua: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  numero: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  complemento: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  bairro: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  cidade: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  estado: string;

  @BelongsToMany(() => Curso, () => AlunoCurso)
  cursos: Curso[];
}