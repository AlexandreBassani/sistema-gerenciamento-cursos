import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AlunoService } from './alunos.service';

@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) 
  create(@Body() createAlunoDto: any) { 
    return this.alunoService.create(createAlunoDto);
  }

  @Get()
  findAll() {
    return this.alunoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alunoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlunoDto: any) { 
    return this.alunoService.update(+id, updateAlunoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) 
  remove(@Param('id') id: string) {
    return this.alunoService.remove(+id);
  }
}