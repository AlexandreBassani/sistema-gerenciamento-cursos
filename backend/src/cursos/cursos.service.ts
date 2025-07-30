import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Curso } from '../curso/models/curso.model'; 

@Injectable()
export class CursosService {
  constructor(
    @InjectModel(Curso)
    private cursoModel: typeof Curso,
  ) {}

  async findAll(): Promise<Curso[]> {
    return this.cursoModel.findAll();
  }

  async findOne(id: number): Promise<Curso> {
    const curso = await this.cursoModel.findByPk(id);
    if (!curso) {
      throw new NotFoundException(`Curso com ID ${id} não encontrado.`);
    }
    return curso;
  }

  async create(createCursoDto: any): Promise<Curso> {
    return this.cursoModel.create(createCursoDto);
  }

  async update(id: number, updateCursoDto: any): Promise<Curso> {
    const [numberOfAffectedRows, [updatedCurso]] = await this.cursoModel.update(
      updateCursoDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`Curso com ID ${id} não encontrado para atualização.`);
    }
    return updatedCurso;
  }

  async remove(id: number): Promise<void> {
    const result = await this.cursoModel.destroy({ where: { id } });
    if (result === 0) {
      throw new NotFoundException(`Curso com ID ${id} não encontrado para exclusão.`);
    }
  }
}
