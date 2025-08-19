import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import adicionarIcone from '../assets/adicionar-icone.png';

const UF_MAP: Record<string, string> = {
  AC: 'Acre', AL: 'Alagoas', AP: 'Amapá', AM: 'Amazonas', BA: 'Bahia',
  CE: 'Ceará', DF: 'Distrito Federal', ES: 'Espírito Santo', GO: 'Goiás',
  MA: 'Maranhão', MT: 'Mato Grosso', MS: 'Mato Grosso do Sul', MG: 'Minas Gerais',
  PA: 'Pará', PB: 'Paraíba', PR: 'Paraná', PE: 'Pernambuco', PI: 'Piauí',
  RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte', RS: 'Rio Grande do Sul',
  RO: 'Rondônia', RR: 'Roraima', SC: 'Santa Catarina', SP: 'São Paulo',
  SE: 'Sergipe', TO: 'Tocantins',
};
const fullEstado = (uf?: string) => {
  if (!uf) return '—';
  const key = uf.trim().toUpperCase();
  return UF_MAP[key] ?? uf;
};

type CursoLike = { id?: number; nome?: string } | string;
type Aluno = {
  id: number;
  nome: string;
  sobrenome?: string;
  estado?: string;
  createdAt?: string;
  cursos?: CursoLike[];
};
type Paged<T> = { data: T[]; total: number };

function buildPageItems(totalPages: number, current: number) {
  const s = new Set<number>();
  [1, 2, current - 1, current, current + 1, totalPages - 1, totalPages]
    .forEach(n => { if (n >= 1 && n <= totalPages) s.add(n); });
  const arr = Array.from(s).sort((a, b) => a - b);
  const out: (number | string)[] = [];
  for (let i = 0; i < arr.length; i++) {
    out.push(arr[i]);
    if (i < arr.length - 1 && arr[i + 1] - arr[i] > 1) out.push('…');
  }
  return out;
}

const AlunoList: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const totalPages = Math.max(1, Math.ceil(total / limit) || 1);

  const fetchAlunos = async (opts?: {
    order?: 'ASC' | 'DESC';
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const order = opts?.order ?? sortOrder;
    const q = (opts?.search ?? search).trim();
    const p = opts?.page ?? page;
    const l = opts?.limit ?? limit;

    try {
      const response = await api.get('/alunos', {
        params: { sortBy: 'createdAt', order, search: q || undefined, page: p, limit: l },
      });
      const payload: Paged<Aluno> = Array.isArray(response.data)
        ? { data: response.data, total: response.data.length }
        : (response.data ?? { data: [], total: 0 });

      setAlunos(payload.data);
      setTotal(payload.total);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      fetchAlunos({ search, page: 1 });
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    fetchAlunos({ page });
  }, [page, limit]);

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
    setSortOrder(newOrder);
    setPage(1);
    fetchAlunos({ order: newOrder, page: 1 });
  };

  const renderCursosPills = (cursos?: CursoLike[]) => {
    const nomes = (cursos ?? [])
      .map((c) => (typeof c === 'string' ? c : c?.nome))
      .filter(Boolean) as string[];
    if (nomes.length === 0) return <span className="text-gray-400">—</span>;
    const visiveis = nomes.slice(0, 3);
    const restante = nomes.length - visiveis.length;
    return (
      <div className="flex flex-wrap gap-2">
        {visiveis.map((nome, i) => (
          <span
            key={`${nome}-${i}`}
            className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
          >
            {nome}
          </span>
        ))}
        {restante > 0 && (
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
            +{restante}
          </span>
        )}
      </div>
    );
  };

  const fullName = (a: Aluno) =>
    [a.nome, a.sobrenome].filter(Boolean).join(' ') || a.nome || '—';

  const handleDelete = async (aluno: Aluno) => {
    const ok = window.confirm(`Tem certeza que deseja excluir "${fullName(aluno)}"?`);
    if (!ok) return;
    try {
      setDeletingId(aluno.id);
      await api.delete(`/alunos/${aluno.id}`);
      const restamNaPagina = alunos.length - 1;
      const totalApos = total - 1;
      const totalPagesApos = Math.max(1, Math.ceil(totalApos / limit) || 1);
      const novaPagina = restamNaPagina === 0 && page > 1 && page > totalPagesApos ? page - 1 : page;
      setPage(novaPagina);
      await fetchAlunos({ page: novaPagina });
    } catch (err: any) {
      console.error('Erro ao excluir aluno:', err);
      const server = err?.response?.data;
      const msg =
        (typeof server === 'string' && server) ||
        (Array.isArray(server?.message) ? server.message.join(', ') : server?.message) ||
        err?.message ||
        'Erro ao excluir aluno.';
      window.alert(msg);
      fetchAlunos({ page });
    } finally {
      setDeletingId(null);
    }
  };

  const pageItems = buildPageItems(totalPages, page);

  return (
    <>
      <Header title="Gerenciador de alunos" />
      <div className="pt-32 px-8 bg-white min-h-screen">
        <div className="container mx-auto w-[1098px]">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-[822px] h-[46px]">
              <input
                type="text"
                placeholder="Buscar por aluno"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    setPage(1);
                    fetchAlunos({ search, page: 1 });
                  }
                }}
                className="w-full h-full pl-[12px] pr-[36px] py-[8px] border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="button"
                onClick={() => { setPage(1); fetchAlunos({ search, page: 1 }); }}
                className="absolute right-[8px] top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                title="Buscar"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
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

          <div className="p-6">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={toggleSortOrder}
                  >
                    Data de cadastro {sortOrder === 'ASC' ? '↑' : '↓'}
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
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {alunos.length > 0 ? (
                  alunos.map((aluno) => (
                    <tr key={aluno.id} className="border-b border-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {aluno.createdAt
                          ? new Date(aluno.createdAt).toLocaleDateString('pt-BR')
                          : '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {[aluno.nome, aluno.sobrenome].filter(Boolean).join(' ') || aluno.nome || '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {fullEstado(aluno.estado)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {renderCursosPills(aluno.cursos)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/alunos/editar/${aluno.id}`}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50"
                            title="Editar aluno"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536M4 20h4.586a1 1 0 00.707-.293l9.9-9.9a2 2 0 10-2.828-2.828l-9.9 9.9A1 1 0 006 18.586V20z" />
                            </svg>
                            Editar
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(aluno)}
                            disabled={deletingId === aluno.id}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-red-300 text-red-600 hover:bg-red-50 disabled:opacity-60"
                            title="Excluir aluno"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.203 21H7.797a2 2 0 01-1.936-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1H9a1 1 0 00-1 1v3m3 4v-3m2 6v-6" />
                            </svg>
                            {deletingId === aluno.id ? 'Excluindo...' : 'Excluir'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      Nenhum aluno encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-6">
            <nav className="flex items-center space-x-2" aria-label="Pagination">
              <button
                className="flex items-center text-gray-600 hover:text-gray-800 text-sm disabled:opacity-40"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Anterior
              </button>

              {pageItems.map((item, idx) =>
                item === '…' ? (
                  <span key={`dots-${idx}`} className="px-2 text-gray-400 select-none">…</span>
                ) : (
                  <button
                    key={`p-${item}`}
                    onClick={() => setPage(item as number)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      item === page
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                    }`}
                  >
                    {item}
                  </button>
                )
              )}

              <button
                className="flex items-center text-gray-600 hover:text-gray-800 text-sm disabled:opacity-40"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
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
