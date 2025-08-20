import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { AlunoService } from './alunos.service';
import { Aluno } from '../aluno/models/aluno.model';
import { NotFoundException } from '@nestjs/common';
import { AlunoSortBy, OrderEnum } from './dto/get-alunos.dto';

describe('AlunoService', () => {
  let service: AlunoService;

  const alunoModel = {
    create: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        AlunoService,
        { provide: getModelToken(Aluno), useValue: alunoModel },
      ],
    }).compile();
    service = module.get(AlunoService);
  });

  it('create: cria aluno', async () => {
    alunoModel.create.mockResolvedValue({ id: 1, nome: 'Ana' });
    const res = await service.create({ nome: 'Ana' } as any);
    expect(res).toEqual({ id: 1, nome: 'Ana' });
  });

  it('findAll: paginação/ordenação', async () => {
    alunoModel.findAndCountAll.mockResolvedValue({ rows: [{ id: 1 }], count: 1 });
    const res = await service.findAll({
      page: 2, limit: 10, search: 'an', sortBy: AlunoSortBy.NOME, order: OrderEnum.ASC,
    } as any);
    expect(alunoModel.findAndCountAll).toHaveBeenCalledWith(expect.objectContaining({
      limit: 10, offset: 10, order: [[AlunoSortBy.NOME, OrderEnum.ASC]],
    }));
    expect(res).toEqual({ data: [{ id: 1 }], total: 1 });
  });

  it('findOne: ok', async () => {
    alunoModel.findByPk.mockResolvedValue({ id: 5 });
    await expect(service.findOne(5)).resolves.toEqual({ id: 5 });
  });

  it('findOne: NotFound', async () => {
    alunoModel.findByPk.mockResolvedValue(null);
    await expect(service.findOne(999)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('update: ok', async () => {
    alunoModel.update.mockResolvedValue([1, [{ id: 10, nome: 'Novo' }]]);
    await expect(service.update(10, { nome: 'Novo' } as any))
      .resolves.toEqual({ id: 10, nome: 'Novo' });
  });

  it('remove: NotFound', async () => {
    alunoModel.destroy.mockResolvedValue(0);
    await expect(service.remove(3)).rejects.toBeInstanceOf(NotFoundException);
  });
});
