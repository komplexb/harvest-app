import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { LivePledgePage } from './components/LivePledgePage';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/live" element={<LivePledgePage />} />
      </Routes>
    </Router>
  );
}
