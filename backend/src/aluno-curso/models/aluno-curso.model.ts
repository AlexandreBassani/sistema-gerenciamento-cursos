import { Column, Model, Table, PrimaryKey, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import { Aluno } from '../../aluno/models/aluno.model';
import { Curso } from '../../curso/models/curso.model';

@Table({
  tableName: 'aluno_cursos',
  timestamps: true,
})
export class AlunoCurso extends Model<AlunoCurso> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => Aluno)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  alunoId: number;

  @ForeignKey(() => Curso)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cursoId: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  dataConclusao: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  concluido: boolean;

  @BelongsTo(() => Aluno)
  aluno: Aluno;

  @BelongsTo(() => Curso)
  curso: Curso;
}