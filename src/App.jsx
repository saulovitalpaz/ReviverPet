import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import MainLayout from './components/layout/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import DriverPage from './pages/DriverPage';
import PlansPage from './pages/PlansPage';
import AdminPanel from './pages/AdminPanel';

function App() {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/driver" element={<DriverPage />} />
                    <Route path="/plans" element={<PlansPage />} />
                    <Route path="/admin" element={<AdminPanel />} />
                    {/* Placeholder for future routes */}
                    <Route path="/login" element={<div className="min-h-screen pt-40 text-center animate-fade-in"><h2 className="text-3xl font-light">Login em Breve</h2><p className="text-stone-400 mt-4">Estamos preparando seu acesso seguro.</p></div>} />
                    <Route path="/signup" element={<div className="min-h-screen pt-40 text-center animate-fade-in"><h2 className="text-3xl font-light">Cadastro</h2><p className="text-stone-400 mt-4">Junte-se à comunidade ZeloPet.</p></div>} />
                    <Route path="/favorites" element={<div className="min-h-screen pt-40 text-center animate-fade-in"><h2 className="text-3xl font-light">Favoritos</h2><p className="text-stone-400 mt-4">Seus cuidadores preferidos estarão aqui.</p></div>} />
                </Routes>
            </MainLayout>
        </Router>
    );
}

export default App;
