import React, { useState } from 'react';
import { Search, MapPin, Filter, Star } from 'lucide-react';

const MOCK_WALKERS = [
    {
        id: 1,
        name: 'Michael Santos',
        role: 'Enfermeiro Veterinário',
        price: 35,
        rating: 5.0,
        reviews: 42,
        location: 'Centro',
        image: '👨‍⚕️',
        tags: ['Medicação', 'Idosos']
    },
    {
        id: 2,
        name: 'Julia Martins',
        role: 'Adestradora',
        price: 40,
        rating: 4.9,
        reviews: 128,
        location: 'Ilha dos Araújos',
        image: '👩',
        tags: ['Comportamento', 'Esportes']
    },
    {
        id: 3,
        name: 'Carlos Oliveira',
        role: 'Dog Walker',
        price: 25,
        rating: 4.7,
        reviews: 15,
        location: 'Lourdes',
        image: '👱',
        tags: ['Passeio Recreativo']
    },
];

export default function SearchPage() {
    return (
        <div className="container-custom py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters - Real Marketplace Feel */}
                <aside className="lg:w-1/4 space-y-6">
                    <div className="card-clean p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-800">Filtros</h3>
                            <button className="text-xs text-primary-600 font-semibold hover:underline">Limpar</button>
                        </div>

                        <div className="space-y-6">
                            {/* Service Type */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Serviço</label>
                                <select className="input-field">
                                    <option>Passeio (Dog Walking)</option>
                                    <option>Pet Sitter</option>
                                    <option>Hospedagem</option>
                                </select>
                            </div>

                            {/* Date */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Data</label>
                                <input type="date" className="input-field" />
                            </div>

                            {/* Price Range */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Preço (h)</label>
                                <div className="flex items-center gap-2">
                                    <input type="number" placeholder="Min" className="input-field w-1/2" />
                                    <span className="text-slate-400">-</span>
                                    <input type="number" placeholder="Max" className="input-field w-1/2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Listing */}
                <main className="lg:w-3/4">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-slate-800">Profissionais em Governador Valadares</h2>
                        <p className="text-slate-500">3 profissionais encontrados para sua busca.</p>
                    </div>

                    <div className="space-y-4">
                        {MOCK_WALKERS.map((walker) => (
                            <div key={walker.id} className="card-clean p-6 flex flex-col md:flex-row gap-6 hover:border-primary-300 transition-colors cursor-pointer group">
                                {/* Avatar */}
                                <div className="w-full md:w-48 h-32 md:h-auto bg-slate-100 rounded-xl flex items-center justify-center text-4xl group-hover:bg-primary-50 transition-colors">
                                    {walker.image}
                                </div>

                                {/* Content */}
                                <div className="flex-grow flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                                    {walker.name}
                                                    <span className="badge badge-primary">Verificado</span>
                                                </h3>
                                                <p className="text-primary-600 font-medium text-sm">{walker.role}</p>
                                            </div>
                                            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
                                                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                                <span className="font-bold text-slate-700">{walker.rating}</span>
                                                <span className="text-xs text-slate-400">({walker.reviews})</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-slate-500 text-sm mt-2">
                                            <MapPin size={16} />
                                            {walker.location}, GV
                                        </div>

                                        <div className="flex gap-2 mt-4">
                                            {walker.tags.map(tag => (
                                                <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50 md:border-none md:mt-0 md:pt-0">

                                    </div>
                                </div>

                                {/* Action - Sidebar on Desktop */}
                                <div className="flex flex-row md:flex-col justify-between md:justify-center items-center gap-4 md:border-l border-slate-100 md:pl-6 min-w-[150px]">
                                    <div className="text-center">
                                        <span className="text-xs text-slate-400 uppercase font-semibold">A partir de</span>
                                        <div className="text-2xl font-bold text-slate-800">R$ {walker.price}</div>
                                    </div>
                                    <button className="btn-primary w-full md:w-auto">
                                        Ver Perfil
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
