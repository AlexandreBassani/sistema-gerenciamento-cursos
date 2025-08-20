import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AlunoCurso } from '../aluno-curso/models/aluno-curso.model';
import { Aluno } from '../aluno/models/aluno.model';
import { Curso } from '../curso/models/curso.model';
import { CreateAlunoCursoDto } from './dto/create-aluno-curso.dto';
import { UpdateAlunoCursoDto } from './dto/update-aluno-curso.dto';




@Injectable()
export class AlunoCursosService {
  constructor(
    @InjectModel(AlunoCurso)
    private alunoCursoModel: typeof AlunoCurso,
    @InjectModel(Aluno)
    private alunoModel: typeof Aluno,
    @InjectModel(Curso)
    private cursoModel: typeof Curso,
  ) {}

  async create(createAlunoCursoDto: CreateAlunoCursoDto): Promise<AlunoCurso> {
    const { alunoId, cursoId, dataConclusao, concluido } = createAlunoCursoDto; 

    const aluno = await this.alunoModel.findByPk(alunoId);
    if (!aluno) {
      throw new NotFoundException(`Aluno com ID ${alunoId} não encontrado.`);
    }

    const curso = await this.cursoModel.findByPk(cursoId);
    if (!curso) {
      throw new NotFoundException(`Curso com ID ${cursoId} não encontrado.`);
    }

    const existingEntry = await this.alunoCursoModel.findOne({ where: { alunoId, cursoId } });
    if (existingEntry) {
      throw new ConflictException(`Aluno ${alunoId} já está matriculado no Curso ${cursoId}.`);
    }

    const dataToCreate = {
    alunoId: alunoId,
    cursoId: cursoId,
    dataConclusao: dataConclusao, 
    concluido: concluido || false
  };

   return this.alunoCursoModel.create(dataToCreate as any);
  }
  
  async findAll(): Promise<AlunoCurso[]> {
    return this.alunoCursoModel.findAll({
      include: [Aluno, Curso]
    });
  }

  async findOne(id: number): Promise<AlunoCurso> {
    const alunoCurso = await this.alunoCursoModel.findByPk(id, {
      include: [Aluno, Curso]
    });
    if (!alunoCurso) {
      throw new NotFoundException(`Matrícula com ID ${id} não encontrada.`);
    }
    return alunoCurso;
  }

  async update(id: number, updateAlunoCursoDto: UpdateAlunoCursoDto): Promise<AlunoCurso> {
    const [numberOfAffectedRows, [updatedAlunoCurso]] = await this.alunoCursoModel.update(
      updateAlunoCursoDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`Matrícula com ID ${id} não encontrada para atualização.`);
    }
    return updatedAlunoCurso;
  }

  async remove(id: number): Promise<void> {
    const result = await this.alunoCursoModel.destroy({ where: { id } });
    if (result === 0) {
      throw new NotFoundException(`Matrícula com ID ${id} não encontrada para exclusão.`);
    }
  }
}
