import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import FavoritesView from './views/FavoritesView';
import CharacterDetail from './views/CharacterDetail';
import './styles/App.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/favorites" element={<FavoritesView />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </div>
  );
}

export default App;