import { Injectable, NotFoundException, ConflictException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Aluno } from '../aluno/models/aluno.model';
import { GetAlunosDto, AlunoSortBy, OrderEnum } from './dto/get-alunos.dto';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UniqueConstraintError } from 'sequelize';
import { Curso } from '../curso/models/curso.model';

@Injectable()
export class AlunoService {
  constructor(
    @InjectModel(Aluno)
    private alunoModel: typeof Aluno, 
  ) {}

  async create(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    try {
      return await this.alunoModel.create(createAlunoDto as any);
    } catch (error: any) {
      if (error instanceof UniqueConstraintError) {
        const field =
          error?.errors?.[0]?.path ||
          Object.keys(error?.fields || {})[0] ||
          '';

        if (field === 'cpf') {
          throw new ConflictException('CPF já cadastrado.');
        }
        if (field === 'email') {
          throw new ConflictException('E-mail já cadastrado.');
        }
        throw new ConflictException('Registro já existe.');
      }

      throw error;
    }
  }

  async findAll(queryDto: GetAlunosDto): Promise<{ data: Aluno[]; total: number }> {
  const page   = Number(queryDto.page ?? 1);
  const limit  = Number(queryDto.limit ?? 10);
  const search = (queryDto.search ?? '').trim();
  const estado = (queryDto.estado ?? '').trim();
  const sortBy = queryDto.sortBy ?? AlunoSortBy.NOME;
  const order  = queryDto.order ?? OrderEnum.ASC;

  const whereClause: any = {};
  if (search) {
    whereClause[Op.or] = [
      { nome:      { [Op.iLike]: `%${search}%` } },
      { sobrenome: { [Op.iLike]: `%${search}%` } },
    ];
  }

  if (estado) {
    whereClause.estado = { [Op.iLike]: `%${estado}%` };
  }

  if (queryDto.dataInicio && queryDto.dataFim) {
    whereClause.createdAt = {
      [Op.between]: [new Date(queryDto.dataInicio), new Date(queryDto.dataFim)],
    };
  } else if (queryDto.dataInicio) {
    whereClause.createdAt = { [Op.gte]: new Date(queryDto.dataInicio) };
  } else if (queryDto.dataFim) {
    whereClause.createdAt = { [Op.lte]: new Date(queryDto.dataFim) };
  }

  // ordenação segura
  const allowedSorts = [AlunoSortBy.NOME, AlunoSortBy.CPF, AlunoSortBy.DATA_CADASTRO];
  const safeSort  = allowedSorts.includes(sortBy) ? sortBy : AlunoSortBy.NOME;
  const safeOrder = order === OrderEnum.DESC ? OrderEnum.DESC : OrderEnum.ASC;

  const { rows, count } = await this.alunoModel.findAndCountAll({
    where: whereClause,
    limit,
    offset: (page - 1) * limit,
    order: [[safeSort as string, safeOrder]],
    include: [
      {
        model: Curso,              
        attributes: ['id', 'nome'],
        through: { attributes: [] },  
      },
    ],
  });

  return { data: rows, total: count };
}


  async findOne(id: number): Promise<Aluno> {
    const aluno = await this.alunoModel.findByPk(id, {
      include: [{ model: Curso, attributes: ['id', 'nome'], through: { attributes: [] } }],
    });
    if (!aluno) throw new NotFoundException(`Aluno com ID ${id} não encontrado.`);
    return aluno;
  }

  async update(id: number, updateAlunoDto: any): Promise<Aluno> {
    const [numberOfAffectedRows, [updatedAluno]] = await this.alunoModel.update(
      updateAlunoDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`Aluno com ID ${id} não encontrado para atualização.`);
    }
    return updatedAluno;
  }

  async remove(id: number): Promise<void> {
    const result = await this.alunoModel.destroy({ where: { id } });
    if (result === 0) {
      throw new NotFoundException(`Aluno com ID ${id} não encontrado para exclusão.`);
    }
  }
}