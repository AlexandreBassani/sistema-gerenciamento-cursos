import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import api from '../services/api';

type FormState = {
  nome: string;
  sobrenome: string;
  dataNascimento: string;
  cpf: string;
  genero: string;
  email: string;
  cep: string;
  pais: string;
  rua: string;
  bairro: string;
  numero: string;
  complemento?: string;
  cidade: string;
  estado: string;
};

type CursoForm = { nome: string; dataConclusao: string };

type Matricula = {
  id: number;
  alunoId: number;
  cursoId: number;
  dataConclusao: string | null;
  concluido: boolean;
  curso?: { id: number; nome: string };
};

const maskCep = (v: string) => {
  const digits = v.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
};
const cepToDigits = (masked: string) => masked.replace(/\D/g, '');

const maskDataBR = (v: string) => {
  const d = v.replace(/\D/g, '').slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length === 3) return `${d.slice(0, 2)}/${d.slice(2)}`;
  if (d.length === 4) return `${d.slice(0, 2)}/${d.slice(2, 4)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
};

const dataBrParaISO = (data: string): string | null => {
  if (!data) return null;
  const [dd, mm, yyyy] = data.split('/');
  if (!dd || !mm || !yyyy) return null;
  const iso = `${yyyy.padStart(4, '0')}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : iso;
};

const isoParaDataBR = (iso?: string | null): string => {
  if (!iso) return '';
  const only = iso.split('T')[0] || '';
  const [y, m, d] = only.split('-');
  if (!y || !m || !d) return '';
  return `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;
};

const AlunoDetalhe: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const [form, setForm] = useState<FormState>({
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    cpf: '',
    genero: '',
    email: '',
    cep: '',
    pais: 'Brasil',
    rua: '',
    bairro: '',
    numero: '',
    complemento: '',
    cidade: '',
    estado: '',
  });

  const [cursos, setCursos] = useState<CursoForm[]>([{ nome: '', dataConclusao: '' }]);
  const [matriculasOriginais, setMatriculasOriginais] = useState<Matricula[]>([]);

  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [cepLoading, setCepLoading] = useState(false);
  const [cepErro, setCepErro] = useState<string | null>(null);

  const tituloHeader = useMemo(
    () =>
      form.nome || form.sobrenome
        ? `Gerenciador de alunos | ${[form.nome, form.sobrenome].filter(Boolean).join(' ')}`
        : isEdit
        ? 'Gerenciador de alunos | Editar aluno'
        : 'Gerenciador de alunos | Novo aluno',
    [form.nome, form.sobrenome, isEdit],
  );

  function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // Carrega dados quando em modo edição
  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const [alunoResp, acResp] = await Promise.all([
          api.get(`/alunos/${id}`),
          api.get('/aluno-cursos'),
        ]);

        const aluno = alunoResp.data;
        setForm({
          nome: aluno.nome ?? '',
          sobrenome: aluno.sobrenome ?? '',
          dataNascimento: isoParaDataBR(aluno.dataNascimento),
          cpf: aluno.cpf ?? '',
          genero: aluno.genero ?? '',
          email: aluno.email ?? '',
          cep: aluno.cep ?? '',
          pais: aluno.pais ?? 'Brasil',
          rua: aluno.rua ?? '',
          bairro: aluno.bairro ?? '',
          numero: aluno.numero ?? '',
          complemento: aluno.complemento ?? '',
          cidade: aluno.cidade ?? '',
          estado: aluno.estado ?? '',
        });

        const todasMatriculas: Matricula[] = Array.isArray(acResp.data) ? acResp.data : [];
        const doAluno = todasMatriculas.filter((m) => m.alunoId === Number(id));

        setMatriculasOriginais(doAluno);

        if (doAluno.length > 0) {
          setCursos(
            doAluno.map((m) => ({
              nome: m.curso?.nome ?? '',
              dataConclusao: isoParaDataBR(m.dataConclusao),
            })),
          );
        } else {
          setCursos([{ nome: '', dataConclusao: '' }]);
        }
      } catch (e: any) {
        const msg =
          e?.response?.data?.message ||
          (Array.isArray(e?.response?.data) ? e.response.data.join(', ') : 'Erro ao carregar aluno.');
        setErro(typeof msg === 'string' ? msg : 'Erro ao carregar aluno.');
      }
    })();
  }, [id, isEdit]);

  // Auto-preencher por CEP
  useEffect(() => {
    setCepErro(null);
    const digits = cepToDigits(form.cep);
    if (digits.length !== 8) return;

    const t = setTimeout(async () => {
      try {
        setCepLoading(true);
        const resp = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
        const data = await resp.json();
        if (data?.erro) {
          setCepErro('CEP não encontrado.');
          return;
        }
        setForm((prev) => ({
          ...prev,
          rua: data.logradouro ?? prev.rua,
          bairro: data.bairro ?? prev.bairro,
          cidade: data.localidade ?? prev.cidade,
          estado: data.uf ?? prev.estado,
          pais: prev.pais || 'Brasil',
        }));
      } catch {
        setCepErro('Erro ao consultar CEP.');
      } finally {
        setCepLoading(false);
      }
    }, 500);

    return () => clearTimeout(t);
  }, [form.cep]);

  const addCursoRow = () => setCursos((prev) => [...prev, { nome: '', dataConclusao: '' }]);
  const removeCursoRow = (index: number) => setCursos((prev) => prev.filter((_, i) => i !== index));
  const updateCursoField = (index: number, key: keyof CursoForm, value: string) => {
    setCursos((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [key]: value };
      return copy;
    });
  };

  async function ensureCursoIdByName(nome: string, cache: Map<string, number>) {
    const trimmed = nome.trim();
    if (!trimmed) return null;
    if (cache.has(trimmed)) return cache.get(trimmed)!;

    const all = await api.get('/cursos');
    const existentes: Array<{ id: number; nome: string }> = Array.isArray(all.data) ? all.data : [];
    const hit = existentes.find((c) => c.nome === trimmed);
    if (hit) {
      cache.set(trimmed, hit.id);
      return hit.id;
    }
    const novo = await api.post('/cursos', { nome: trimmed });
    const novoId = novo?.data?.id;
    if (novoId) cache.set(trimmed, novoId);
    return novoId ?? null;
  }

  async function syncCursosAfterSave(alunoId: number) {
    const cursosDigitados = cursos
      .map((c) => ({ nome: (c.nome || '').trim(), dataConclusao: c.dataConclusao }))
      .filter((c) => c.nome.length > 0);

    const cache = new Map<string, number>();

    const atuaisByCurso = new Map<number, Matricula>(
      matriculasOriginais
        .filter((m) => typeof m.cursoId === 'number' && m.alunoId === alunoId)
        .map((m) => [m.cursoId as number, m] as [number, Matricula]),
    );

    const desejadosCursoIds: number[] = [];

    for (const c of cursosDigitados) {
      const cursoId = await ensureCursoIdByName(c.nome, cache);
      if (!cursoId) continue;
      desejadosCursoIds.push(cursoId);

      const desejadaISO = c.dataConclusao ? dataBrParaISO(c.dataConclusao) : null;
      const existe = atuaisByCurso.get(cursoId);

      if (!existe) {
        await api.post('/aluno-cursos', {
          alunoId,
          cursoId,
          dataConclusao: desejadaISO,
          concluido: !!desejadaISO,
        });
        continue;
      }

      const atualISO = existe.dataConclusao ? existe.dataConclusao.split('T')[0] : null;
      if (atualISO !== desejadaISO) {
        await api.put(`/aluno-cursos/${existe.id}`, {
          dataConclusao: desejadaISO,
          concluido: !!desejadaISO,
        });
      }
    }


    for (const [cursoId, m] of atuaisByCurso) {
      if (!desejadosCursoIds.includes(cursoId)) {
        await api.delete(`/aluno-cursos/${m.id}`);
      }
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setSalvando(true);

    try {
      const dataISO = form.dataNascimento ? dataBrParaISO(form.dataNascimento) : null;
      if (form.dataNascimento && !dataISO) {
        throw new Error('Data de nascimento inválida. Use o formato DD/MM/YYYY.');
      }

      const alunoPayload = {
        nome: form.nome,
        sobrenome: form.sobrenome,
        dataNascimento: dataISO,
        cpf: form.cpf,
        genero: form.genero,
        email: form.email,
        cep: form.cep,
        pais: form.pais,
        rua: form.rua,
        bairro: form.bairro,
        numero: form.numero,
        complemento: form.complemento,
        cidade: form.cidade,
        estado: form.estado,
      };

      if (isEdit) {
        await api.put(`/alunos/${id}`, alunoPayload);
        await syncCursosAfterSave(Number(id));
      } else {
        const createAlunoResp = await api.post('/alunos', alunoPayload);
        const alunoId = createAlunoResp?.data?.id;
        if (!alunoId) throw new Error('Aluno criado, mas não recebi o ID.');
        await syncCursosAfterSave(alunoId);
      }

      navigate('/alunos');
    } catch (err: any) {
      const server = err?.response?.data;
      let msg = 'Erro ao salvar aluno.';
      if (typeof server === 'string') msg = server;
      else if (server?.message) msg = Array.isArray(server.message) ? server.message.join(', ') : server.message;
      else if (Array.isArray(server)) msg = server.join(', ');
      else if (err?.message) msg = err.message;
      setErro(msg);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <>
      <Header title={tituloHeader} backTo="/alunos" />
      <div className="pt-20 px-6 bg-white min-h-screen">
        <form onSubmit={onSubmit} className="bg-white p-8 rounded-lg max-w-5xl mx-auto">
          {erro && (
            <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-2 text-red-700 text-sm">
              {erro}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="md:col-span-2 text-xl font-semibold text-gray-800">
              {isEdit ? 'Editar Aluno' : 'Dados Pessoais'}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nome*</label>
              <input
                type="text"
                value={form.nome}
                onChange={(e) => onChange('nome', e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Digite o nome"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Sobrenome</label>
              <input
                type="text"
                value={form.sobrenome}
                onChange={(e) => onChange('sobrenome', e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Digite o sobrenome"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Data de nascimento</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="DD/MM/YYYY"
                value={form.dataNascimento}
                onChange={(e) => onChange('dataNascimento', maskDataBR(e.target.value))}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              <p className="mt-1 text-xs text-gray-500">Ex.: 05/1/2004 ou 05/10/2004</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">CPF</label>
              <input
                type="text"
                value={form.cpf}
                onChange={(e) => onChange('cpf', e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="000.000.000-00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Gênero*</label>
              <select
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={form.genero}
                onChange={(e) => onChange('genero', e.target.value)}
                required
              >
                <option value="">Selecione…</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email*</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => onChange('email', e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="email@exemplo.com"
                required
              />
            </div>

            <div className="md:col-span-2 text-xl font-semibold text-gray-800 mt-6">Localização</div>

            <div>
              <div className="flex items-center gap-2">
                <label className="block text-sm font-medium text-gray-700">CEP*</label>
                {cepLoading && <span className="text-xs text-gray-500">consultando…</span>}
                {cepErro && <span className="text-xs text-red-600">{cepErro}</span>}
              </div>
              <input
                type="text"
                value={form.cep}
                onChange={(e) => onChange('cep', maskCep(e.target.value))}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="00000-000"
                inputMode="numeric"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">País*</label>
              <input
                type="text"
                value={form.pais}
                onChange={(e) => onChange('pais', e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Brasil"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Rua</label>
              <input
                type="text"
                value={form.rua}
                onChange={(e) => onChange('rua', e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Rua/Avenida"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Bairro</label>
              <input
                type="text"
                value={form.bairro}
                onChange={(e) => onChange('bairro', e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Bairro"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Número*</label>
              <input
                type="text"
                value={form.numero}
                onChange={(e) => onChange('numero', e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Número"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Complemento</label>
              <input
                type="text"
                value={form.complemento}
                onChange={(e) => onChange('complemento', e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Opcional"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cidade</label>
              <input
                type="text"
                value={form.cidade}
                onChange={(e) => onChange('cidade', e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Cidade"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <input
                type="text"
                value={form.estado}
                onChange={(e) => onChange('estado', e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="UF ou estado"
              />
            </div>
          </div>

          <div className="text-xl font-semibold text-gray-800 mt-8 mb-4">Cursos</div>

          <div className="space-y-5">
            {cursos.map((linha, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-2 items-end"
              >
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Nome do curso</label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Digite o nome do curso"
                    value={linha.nome}
                    onChange={(e) => updateCursoField(index, 'nome', e.target.value)}
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700">Data de conclusão</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="DD/MM/YYYY"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    value={linha.dataConclusao}
                    onChange={(e) => updateCursoField(index, 'dataConclusao', maskDataBR(e.target.value))}
                  />
                </div>

                <div className="flex md:col-span-1 items-center gap-3 mt-2 md:mt-0">
                  {cursos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCursoRow(index)}
                      title="Remover"
                      className="p-2 rounded-full border border-gray-300 hover:bg-red-50 hover:border-red-300"
                    >
                      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  {index === cursos.length - 1 && (
                    <button
                      type="button"
                      onClick={addCursoRow}
                      title="Adicionar"
                      className="p-2 rounded-full border border-gray-300 hover:bg-gray-50"
                    >
                      <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/alunos')}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={salvando}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
            >
              {salvando ? (isEdit ? 'Salvando...' : 'Salvando...') : isEdit ? 'Salvar alterações' : 'Salvar aluno'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AlunoDetalhe;
