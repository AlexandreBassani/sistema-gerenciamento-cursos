import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Aluno } from './aluno/models/aluno.model';
import { Curso } from './curso/models/curso.model'; 
import { AlunoCurso } from './aluno-curso/models/aluno-curso.model'; 


import { AlunosModule } from './alunos/alunos.module';
import { CursosModule } from './cursos/cursos.module';
import { AlunoCursosModule } from './aluno-cursos/aluno-cursos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadModels: true,
        models: [AlunoCurso, Aluno, Curso],
        synchronize: true,
        alter: true,
      }),
    }),
    AlunosModule,
    CursosModule,
    AlunoCursosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}