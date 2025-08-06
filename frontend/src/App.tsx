import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AlunoList from './pages/AlunoList';
import AlunoDetalhe from './pages/AlunoDetalhe';

import './index.css';

function App() {
  return (
    <div className="font-montserrat">
      <Routes>
        <Route path="/" element={<AlunoList />} />
        <Route path="/alunos" element={<AlunoList />} />
        <Route path="/alunos/:id" element={<AlunoDetalhe />} />
      </Routes>
    </div>
  );
}

export default App;