import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GameBoard } from './components/GameBoard';
import { MainMenu } from './components/MainMenu';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/level/:levelNumber" element={<GameBoard />} />
    </Routes>
  );
}