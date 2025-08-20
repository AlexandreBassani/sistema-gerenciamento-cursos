import { Test } from '@nestjs/testing';
import { AlunosController } from './alunos.controller';
import { AlunoService } from './alunos.service';

describe('AlunosController', () => {
  let controller: AlunosController;
  const service = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      controllers: [AlunosController],
      providers: [{ provide: AlunoService, useValue: service }],
    }).compile();
    controller = module.get(AlunosController);
  });

  it('create -> delega service', async () => {
    service.create.mockResolvedValue({ id: 1 });
    const res = await controller.create({ nome: 'Ana' } as any);
    expect(res).toEqual({ id: 1 });
  });

  it('findAll -> delega', async () => {
    service.findAll.mockResolvedValue({ data: [], total: 0 });
    const res = await controller.findAll({} as any);
    expect(res).toEqual({ data: [], total: 0 });
  });
});
