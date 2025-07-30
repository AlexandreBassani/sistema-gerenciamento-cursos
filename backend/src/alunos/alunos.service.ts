import { Injectable, NotFoundException } from '@nestjs/common'; 
import { InjectModel } from '@nestjs/sequelize';
import { Aluno } from '../aluno/models/aluno.model'; 

@Injectable()
export class AlunoService {
  constructor(
    @InjectModel(Aluno)
    private alunoModel: typeof Aluno, 
  ) {}

  async create(createAlunoDto: any): Promise<Aluno> { 
    return this.alunoModel.create(createAlunoDto);
  }

  async findAll(): Promise<Aluno[]> {
    return this.alunoModel.findAll();
  }

  async findOne(id: number): Promise<Aluno> {
    const aluno = await this.alunoModel.findByPk(id);
    if (!aluno) {
      throw new NotFoundException(`Aluno com ID ${id} não encontrado.`);
    }
    return aluno;
  }

  async update(id: number, updateAlunoDto: any): Promise<[number, Aluno[]]> { 
    const [numberOfAffectedRows, affectedRows] = await this.alunoModel.update(updateAlunoDto, {
      where: { id },
      returning: true,
    });

    if (numberOfAffectedRows === 0) {
        throw new NotFoundException(`Aluno com ID ${id} não encontrado para atualização.`);
    }

    return [numberOfAffectedRows, affectedRows];
  }

  async remove(id: number): Promise<void> {
    const aluno = await this.findOne(id); 
    await aluno.destroy();
  }
}