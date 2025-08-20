import request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { AlunosModule } from '../src/alunos/alunos.module';
import { Aluno } from '../src/aluno/models/aluno.model';
import { Curso } from '../src/curso/models/curso.model';
import { AlunoCurso } from '../src/aluno-curso/models/aluno-curso.model';

describe('Alunos (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          dialect: 'sqlite',
          storage: ':memory:',
          autoLoadModels: true,
          synchronize: true,
          logging: false,
          models: [Aluno, Curso, AlunoCurso],
        }),
        AlunosModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/alunos (POST) cria aluno', async () => {
    const res = await request(app.getHttpServer())
      .post('/alunos')
      .send({
        nome: 'Ana',
        sobrenome: 'Silva',
        dataNascimento: '2000-01-01',
        cpf: '123.456.789-10',
        genero: 'Feminino',
        email: 'ana@example.com',
        cep: '12345-678',
        pais: 'Brasil',
        rua: 'Rua A',
        numero: '100',
        bairro: 'Centro',
        cidade: 'Porto Alegre',
        estado: 'RS',
      })
      .expect(201);

    expect(res.body.id).toBeDefined();
  });

  it('/alunos (GET) lista paginada', async () => {
    const res = await request(app.getHttpServer())
      .get('/alunos')
      .query({ page: 1, limit: 10, search: 'Ana' })
      .expect(200);

    expect(Array.isArray(res.body.data)).toBe(true);
    expect(typeof res.body.total).toBe('number');
  });
});
