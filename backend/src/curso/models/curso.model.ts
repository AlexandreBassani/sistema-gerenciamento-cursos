import { Column, Model, Table, PrimaryKey, AutoIncrement, DataType, BelongsToMany } from 'sequelize-typescript';
import { Aluno } from '../../aluno/models/aluno.model';
import { AlunoCurso } from '../../aluno-curso/models/aluno-curso.model';

@Table({
  tableName: 'cursos',
  timestamps: true,
})
export class Curso extends Model<Curso> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING(255), allowNull: false, unique: true })
  nome: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  descricao: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  cargaHoraria: number;

  @BelongsToMany(() => Aluno, () => AlunoCurso)
  alunos: Aluno[];
}