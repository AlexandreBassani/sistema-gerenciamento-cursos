# Sistema de Gerenciamento de Cursos e Alunos

Aplicação full-stack para cadastrar, listar, editar e excluir Alunos e Cursos, além de vincular alunos a cursos (em andamento ou concluídos).  
Frontend em React + TypeScript + Tailwind e backend em NestJS + Sequelize (PostgreSQL) com validações, paginação, busca e testes (unitários e E2E).

## Destaques
- ✅ CRUD de Alunos e Cursos
- 🔗 Vínculo Aluno ↔ Curso (com data de conclusão)
- 🔎 Busca de alunos por nome (search bar)
- 📄 Paginação no backend e UI
- 🧾 CEP (ViaCEP) para autocompletar endereço
- 🏷️ Cursos como chips na listagem
- 📝 Formulário único para Criar/Editar aluno
- 🛡️ Validações robustas (CPF, e-mail, formatos)
- 🧪 Testes (Jest unit + Supertest E2E no backend)


## Arquitetura & Stack

### Backend
- **Node.js, NestJS**
- **Sequelize (sequelize-typescript)**
- **PostgreSQL**
- **class-validator / class-transformer**
- **Jest + Supertest (unit & e2e)**

### Frontend
- **React 18 + TypeScript**
- **React Router**
- **Tailwind CSS**
- **Axios**
- **ViaCEP (autocompletar por CEP)**


## 📁 Estrutura do Projeto

```text
backend
├── src
│   ├── aluno
│   │   └── models
│   │       └── aluno.model.ts
│   ├── aluno-curso
│   │   └── models
│   │       └── aluno-curso.model.ts
│   ├── aluno-cursos
│   │   ├── dto
│   │   ├── entities
│   │   ├── aluno-cursos.controller.ts
│   │   ├── aluno-cursos.module.ts
│   │   └── aluno-cursos.service.ts
│   ├── alunos
│   │   ├── dto
│   │   ├── entities
│   │   ├── alunos.controller.spec.ts
│   │   ├── alunos.controller.ts
│   │   ├── alunos.module.ts
│   │   ├── alunos.service.spec.ts
│   │   └── alunos.service.ts
│   ├── common
│   │   └── dto
│   │       └── pagination.dto.ts
│   ├── curso
│   │   └── models
│   │       └── curso.model.ts
│   ├── cursos
│   │   ├── dto
│   │   ├── entities
│   │   ├── cursos.controller.ts
│   │   ├── cursos.module.ts
│   │   └── cursos.service.ts
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   └── app.service.ts
└── test
    ├── alunos.e2e-spec.ts
    └── jest-e2e.json
```

```text

frontend
├── public
│   └── index.html
├── src
│   ├── assets/                   
│   ├── components/
│   │   └── Header.tsx
│   ├── pages/
│   │   ├── AlunoList.tsx
│   │   └── AlunoDetalhe.tsx
│   ├── services/
│   │   └── api.ts                
│   ├── App.tsx
│   └── index.tsx
├── package.json
├── tsconfig.json
└── tailwind.config.js    
```                

# Como Rodar (dev)

## 1) Pré-requisitos
- Node.js **22.16.0+**
- PostgreSQL **13+**

### Variáveis de Ambiente
**Backend** (`backend/.env`)
```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=cursos_alunos
```

# Instalação e Execução

## Backend

### Instalar e Subir:

```bash
cd backend
npm install
npm run start:dev
API: http://localhost:3001
```

## Frontend

```bash
cd frontend
npm install
npm start
App: http://localhost:3000
```

## APIs (Resumo)

As APIs do sistema são divididas em três principais categorias: Alunos, Cursos e Aluno-Cursos. Cada uma delas possui métodos específicos para realizar operações CRUD (Criar, Ler, Atualizar e Deletar).


### Alunos
A API de Alunos permite criar novos alunos, listar alunos com suporte a paginação e filtros, buscar um aluno específico por ID, atualizar informações de um aluno e remover um aluno. Os parâmetros de consulta para a listagem incluem opções como paginação, busca por nome, sobrenome, e-mail ou CPF, além de filtros por estado e ordenação.

### Cursos
A API de Cursos oferece funcionalidades semelhantes, permitindo a criação de novos cursos, listagem de cursos, busca por ID, atualização e remoção de cursos. 

### Aluno-Cursos
A API de Aluno-Cursos gerencia os vínculos entre alunos e cursos. Ela permite criar novos vínculos, listar todos os vínculos existentes, buscar um vínculo específico por ID, atualizar informações (como a data de conclusão) e remover vínculos.

Essas APIs são projetadas para facilitar a interação entre o frontend e o backend, garantindo que as operações relacionadas a alunos e cursos sejam realizadas de forma eficiente e organizada.


## Testes

O sistema inclui uma robusta suíte de testes para garantir a qualidade e a funcionalidade do backend. Os testes são divididos em duas categorias principais: testes unitários e testes de integração (E2E).

Os testes unitários são realizados utilizando o Jest e cobrem as funcionalidades dos serviços e controladores. Já os testes E2E (end-to-end) são realizados com Supertest e garantem que as APIs funcionem corretamente em um ambiente simulado. Para executar os testes, os desenvolvedores podem usar os seguintes comandos:

```bash
cd backend
npm run test       # para testes unitários
npm run test:e2e   # para testes de integração
```

# Tratamento de Erros

## Validações via DTOs (`class-validator`) — Alunos/Cursos
- Regras de validação centralizadas em DTOs.
- Mensagens claras e específicas por campo inválido.
- Erros de validação resultam em **400 Bad Request** com detalhes por propriedade.

## Respostas HTTP comuns

| Status | Quando usar | Exemplo de mensagem |
|---|---|---|
| **400 – Bad Request** | Dados inválidos nos DTOs | “O campo `email` deve ser um e-mail válido.” |
| **404 – Not Found** | Aluno/curso/vínculo não encontrado | “Aluno com id `:id` não encontrado.” |
| **409 – Conflict** | Violação de unicidade | “CPF já cadastrado.” / “E-mail já cadastrado.” |

### Mapeamento de erros do Sequelize
- Backend converte erros do banco para mensagens amigáveis.
- Ex.: **`23505`** (violação de unicidade) → **409 Conflict** com mensagem “CPF/E-mail já cadastrado”.

---

# Próximos Passos (Roadmap)

- [ ] 🔐 **Autenticação JWT** (login / guards / roles)  
- [ ] 📘 **Documentação Swagger**  
- [ ] 🐳 **Docker** (API + Front + Postgres)  
- [ ] 🚀 **Deploy** (Railway / Render / Vercel)  
- [ ] 🧬 **Migrations** com Sequelize CLI  
- [ ] 🧪 **Mais testes** (integração no front, mocks com MSW)
