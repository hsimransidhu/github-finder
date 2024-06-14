import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './css/index.css';
import Search from './pages/Search';
import User from './pages/User';

function App() {
  return (
      <main className="container">
        <Routes>
          <Route path="/github-finder" element={<Search />} />
          <Route path="/github-finder/user/:username" element={<User />} />
        </Routes>
      </main>
  );
}

export default App;
