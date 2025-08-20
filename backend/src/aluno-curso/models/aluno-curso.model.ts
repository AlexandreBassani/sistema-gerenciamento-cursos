import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';
import { Aluno } from '../../aluno/models/aluno.model';
import { Curso } from '../../curso/models/curso.model';

@Table({
  tableName: 'alunos_curso', 
  timestamps: true, 
})
export class AlunoCurso extends Model<AlunoCurso> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id: number;

  @ForeignKey(() => Aluno)
  @Column({
    type: DataType.INTEGER,
    allowNull: false, 
  })
  alunoId: number; 

  @BelongsTo(() => Aluno)
  aluno: Aluno;

  @ForeignKey(() => Curso)
  @Column({
    type: DataType.INTEGER,
    allowNull: false, 
  })
  cursoId: number;

  @BelongsTo(() => Curso)
  curso: Curso;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  dataConclusao: Date | null;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  concluido: boolean;
}