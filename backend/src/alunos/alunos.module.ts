import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AlunoService } from './alunos.service';
import { AlunosController } from './alunos.controller';
import { Aluno } from '../aluno/models/aluno.model';

@Module({
  imports: [SequelizeModule.forFeature([Aluno])],
  controllers: [AlunosController],
  providers: [AlunoService],
})
export class AlunosModule {}