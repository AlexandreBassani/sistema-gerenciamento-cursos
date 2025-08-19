import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AlunoList from './pages/AlunoList';
import AlunoDetalhe from './pages/AlunoDetalhe';

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/alunos" replace />} />
    <Route path="/alunos" element={<AlunoList />} />
    <Route path="/alunos/adicionar" element={<AlunoDetalhe />} />
    <Route path="/alunos/editar/:id" element={<AlunoDetalhe />} />
    <Route path="*" element={<Navigate to="/alunos" replace />} />
  </Routes>
);

export default App;