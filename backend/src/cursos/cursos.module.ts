import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'; 
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { Curso } from '../curso/models/curso.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Curso]), 
  ],
  controllers: [CursosController],
  providers: [CursosService],
})
export class CursosModule {}
