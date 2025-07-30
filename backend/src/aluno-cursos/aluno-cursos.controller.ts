import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AlunoCursosService } from './aluno-cursos.service';
import { CreateAlunoCursoDto } from './dto/create-aluno-curso.dto'; 
import { UpdateAlunoCursoDto } from './dto/update-aluno-curso.dto';


@Controller('aluno-cursos')
export class AlunoCursosController {
  constructor(private readonly alunoCursosService: AlunoCursosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlunoCursoDto: CreateAlunoCursoDto) { 
    return this.alunoCursosService.create(createAlunoCursoDto);
  }

  @Get()
  findAll() {
    return this.alunoCursosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alunoCursosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlunoCursoDto: UpdateAlunoCursoDto) { 
    return this.alunoCursosService.update(+id, updateAlunoCursoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.alunoCursosService.remove(+id);
  }
}