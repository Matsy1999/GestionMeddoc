import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importez vos composants de pages
import Medicaments from './madicaments';
import EntreesSorties from './entreesortie'
import AjouterSortie from './sorties'
import AjouterEntrees from './entrees';
import Dashboard from './dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Router>
      <Routes>
        <Route path="/" element={<Medicaments />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/entreesortie" element={<EntreesSorties />} />
        <Route path="/sorties" element={<AjouterSortie />} />
        <Route path="/entrees" element={<AjouterEntrees />} />
      </Routes>
    </Router>

);
