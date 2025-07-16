import { Column, Model, Table, PrimaryKey, AutoIncrement, DataType, HasMany } from 'sequelize-typescript';
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

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  nome: string;

  @HasMany(() => AlunoCurso)
  alunoCursos: AlunoCurso[];
}