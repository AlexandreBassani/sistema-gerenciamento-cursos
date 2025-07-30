import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AlunoCursosService } from './aluno-cursos.service';
import { AlunoCursosController } from './aluno-cursos.controller';
import { AlunoCurso } from '../aluno-curso/models/aluno-curso.model';
import { Aluno } from '../aluno/models/aluno.model';
import { Curso } from '../curso/models/curso.model'; 

@Module({
  imports: [
    SequelizeModule.forFeature([AlunoCurso, Aluno, Curso]),
  ],
  controllers: [AlunoCursosController],
  providers: [
    AlunoCursosService,
  ],
  exports: [
    AlunoCursosService,
  ],
})
export class AlunoCursosModule {}
