import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import adicionarIcone from '../assets/adicionar-icone.png';

const mockAlunos = [
  {
    id: 1,
    nome: 'Olivia Rhye',
    estado: 'Rio Grande do Sul',
    cursos: ['Design', 'Marketing', 'Product'],
    dataCadastro: '23/05/2023',
  },
  {
    id: 2,
    nome: 'Phoenix Baker',
    estado: 'Rio Grande do Sul',
    cursos: ['Design', 'Marketing', 'Product'],
    dataCadastro: '23/05/2023',
  },
  {
    id: 3,
    nome: 'Lana Steiner',
    estado: 'Santa Catarina',
    cursos: ['Design', 'Marketing', 'Product'],
    dataCadastro: '23/05/2023',
  },
  {
    id: 4,
    nome: 'Demi Wilkinson',
    estado: 'Santa Catarina',
    cursos: ['Design', 'Marketing', 'Product'],
    dataCadastro: '23/05/2023',
  },
];

const AlunoList = () => {
  return (
    <>
      <Header title="Gerenciador de alunos" />
      <div className="pt-32 px-8 bg-white min-h-screen">
        <div className="container mx-auto w-[1098px]">
          {/* Barra de busca e botão */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-[822px] h-[46px]">
              <input
                type="text"
                placeholder="Buscar por aluno"
                className="w-full h-full pl-[12px] pr-[36px] py-[8px] border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <svg
                className="h-5 w-5 absolute right-[12px] top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <Link
              to="/alunos/adicionar"
              className="bg-white text-gray-800 w-[202px] h-[46px] rounded-[6px] px-[10px] py-[8px] font-medium hover:bg-gray-200 flex items-center justify-center border border-gray-300"
            >
              <img src={adicionarIcone} alt="Adicionar" className="h-5 w-auto" />
              <span className="text-gray-800 text-[14px] leading-[30px] tracking-[1%] font-normal ml-[12px]">
                Adicionar
              </span>
            </Link>
          </div>

          {/* Tabela */}
          <div className="p-6">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data de cadastro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cursos
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockAlunos.map((aluno) => (
                  <tr key={aluno.id} className="border-b border-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {aluno.dataCadastro}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {aluno.nome}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {aluno.estado}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-1">
                        {aluno.cursos.map((curso, index) => (
                          <span
                            key={index}
                            className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                          >
                            {curso}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginação bonita */}
          <div className="flex justify-center mt-6">
            <nav className="flex items-center space-x-2" aria-label="Pagination">
              <button className="flex items-center text-gray-600 hover:text-gray-800 text-sm">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Anterior
              </button>

              {[1, 2, 3, '...', 8, 9, 10].map((page, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    page === 1
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button className="flex items-center text-gray-600 hover:text-gray-800 text-sm">
                Próximo
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlunoList;
