import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';

export function GameLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}