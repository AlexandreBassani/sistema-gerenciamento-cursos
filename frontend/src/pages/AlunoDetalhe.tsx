import React from 'react';
import { Link } from 'react-router-dom';

const AlunoDetalhe = () => {
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <header className="mb-8 flex items-center justify-between bg-red-600 text-white p-4 rounded-md shadow-md">
                <div className="flex items-center">
                    <Link to="/alunos" className="text-white hover:text-gray-200">
                        <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <h1 className="text-xl font-semibold">Gerenciador de alunos | Andriele Joras dos Santos</h1>
                </div>
                <button className="text-white hover:text-gray-200">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.203 21H7.797a2 2 0 01-1.936-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1H9a1 1 0 00-1 1v3m3 4v-3m2 6v-6" />
                    </svg>
                </button>
            </header>

            <form className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="md:col-span-2 text-xl font-semibold text-gray-800 mb-4">Dados Pessoais</div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome*</label>
                        <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value="Andriele" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Sobrenome</label>
                        <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value="Joras dos Santos" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Data de nascimento</label>
                        <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value="06/05/2004" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">CPF</label>
                        <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value="123.456.789-10" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gênero</label>
                        <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value="Feminino" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email*</label>
                        <input type="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value="andrielejoras@gmail.com" />
                    </div>

                    <div className="md:col-span-2 text-xl font-semibold text-gray-800 mt-8 mb-4">Localização</div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">CEP*</label>
                        <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="99999-999" value="99999-999" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">País*</label>
                        <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value="Brasil" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rua</label>
                        <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value="Rua dos bobos" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bairro</label>
                        <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value="Esmero" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Número*</label>
                        <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value="000" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Complemento</label>
                        <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cidade</label>
                        <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value="Porto Alegre" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Estado</label>
                        <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value="Rio Grande do Sul" />
                    </div>
                </div>

                <div className="text-xl font-semibold text-gray-800 mt-8 mb-4">Cursos</div>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2 items-center">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Nome do curso</label>
                            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                <option>Introdução ao Figma</option>
                                <option>Desenvolvimento Web</option>
                            </select>
                        </div>
                        <div className="flex-grow">
                            <label className="block text-sm font-medium text-gray-700">Data de conclusão</label>
                            <div className="relative">
                                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md pr-10" value="24/03/2022" />
                                <svg className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 2h-1V1a1 1 0 10-2 0v1H8V1a1 1 0 10-2 0v1H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1zm-4 4a1 1 0 000 2h1a1 1 0 100-2h-1zM7 6a1 1 0 011-1h1a1 1 0 110 2H8a1 1 0 01-1-1zm6 0a1 1 0 110 2h-1a1 1 0 110-2h1zM4 9h16v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9zm7 4a1 1 0 100 2h1a1 1 0 100-2h-1zM7 13a1 1 0 011-1h1a1 1 0 110 2H8a1 1 0 01-1-1zm6 0a1 1 0 110 2h-1a1 1 0 110-2h1zM4 16h16v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex justify-end items-center md:col-span-1 md:justify-start">
                            <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2 items-center">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Nome do curso</label>
                            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                                <option>Introdução ao Figma</option>
                                <option>Desenvolvimento Web</option>
                            </select>
                        </div>
                        <div className="flex-grow">
                            <label className="block text-sm font-medium text-gray-700">Data de conclusão</label>
                            <div className="relative">
                                <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md pr-10" value="24/03/2022" />
                                <svg className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 2h-1V1a1 1 0 10-2 0v1H8V1a1 1 0 10-2 0v1H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1zm-4 4a1 1 0 000 2h1a1 1 0 100-2h-1zM7 6a1 1 0 011-1h1a1 1 0 110 2H8a1 1 0 01-1-1zm6 0a1 1 0 110 2h-1a1 1 0 110-2h1zM4 9h16v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9zm7 4a1 1 0 100 2h1a1 1 0 100-2h-1zM7 13a1 1 0 011-1h1a1 1 0 110 2H8a1 1 0 01-1-1zm6 0a1 1 0 110 2h-1a1 1 0 110-2h1zM4 16h16v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex justify-end items-center md:col-span-1 md:justify-start">
                            <svg className="w-6 h-6 text-gray-400 hover:text-red-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <svg className="w-6 h-6 ml-2 text-red-500 hover:text-red-700 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AlunoDetalhe;