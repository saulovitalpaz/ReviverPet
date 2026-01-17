import React, { useState } from 'react';

const walkers = [
    { id: 1, name: 'Michael S.', role: 'Enfermeiro Veterinário', price: 30, rating: 5.0, reviews: 42, bio: 'Especialista em manejo de cães idosos e hotelzinho. Atende centro e bairros próximos em GV.', tags: ['Seguro Veterinário', 'Fotos em Tempo Real'] },
    { id: 2, name: 'Julia M.', role: 'Dog Walker Certificada', price: 25, rating: 4.8, reviews: 28, bio: 'Passeios focados em gasto de energia. Especialista em raças grandes.', tags: ['Relatório GPS', 'Hidratação'] },
];

const plans = [
    { id: 1, name: 'Básico', description: '2 passeios por semana', price: 220, color: 'lavender' },
    { id: 2, name: 'Premium', description: '5 passeios por semana + Checkup Mensal', price: 550, color: 'mint' },
];

function App() {
    const [activeTab, setActiveTab] = useState('explorar');

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="glass sticky top-0 z-50 p-4 px-6 flex justify-between items-center shadow-md">
                <h1 className="text-2xl font-black text-slate-800 tracking-tighter">
                    ZELO<span className="text-mint-500">PET</span>
                </h1>
                <div className="flex gap-4 items-center">
                    <button className="text-sm font-bold text-slate-600 hover:text-slate-900">Entrar</button>
                    <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold">Criar Conta</button>
                </div>
            </header>

            {/* Tabs */}
            <nav className="bg-white border-b border-slate-100 sticky top-[72px] z-40">
                <div className="max-w-4xl mx-auto flex justify-around">
                    {['explorar', 'driver', 'assinaturas'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-4 px-6 text-sm font-bold transition-all border-b-2 capitalize ${activeTab === tab ? 'border-mint-500 text-mint-500' : 'border-transparent text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {tab === 'explorar' ? 'Explorar' : tab === 'driver' ? 'PetDriver GV' : 'Minhas Assinaturas'}
                        </button>
                    ))}
                </div>
            </nav>

            <main className="max-w-4xl mx-auto p-6 mt-4">
                {activeTab === 'explorar' && (
                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-900">O que seu pet precisa hoje?</h2>
                            <p className="text-slate-500">Passeadores especializados em Governador Valadares.</p>
                        </div>

                        <div className="grid gap-6">
                            {walkers.map(walker => (
                                <div key={walker.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 card-hover">
                                    <div className="w-24 h-24 bg-lavender-100 rounded-2xl flex-shrink-0 flex items-center justify-center text-4xl">
                                        🐕
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-800">{walker.name}</h3>
                                                <p className="text-mint-500 font-bold text-sm">{walker.role}</p>
                                            </div>
                                            <div className="text-sm text-amber-500 font-bold">
                                                ⭐ {walker.rating} ({walker.reviews})
                                            </div>
                                        </div>
                                        <p className="mt-3 text-slate-600 text-sm leading-relaxed">{walker.bio}</p>
                                        <div className="mt-4 flex gap-2 flex-wrap">
                                            {walker.tags.map(tag => (
                                                <span key={tag} className="bg-lavender-50 px-3 py-1 rounded-full text-[10px] text-lavender-500 font-black uppercase tracking-wider">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-2 md:border-l md:pl-8 border-slate-100">
                                        <span className="text-2xl font-black text-slate-900">R$ {walker.price},00</span>
                                        <button className="btn-primary w-full md:w-auto">Agendar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {activeTab === 'driver' && (
                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-900">Para onde vamos?</h2>
                            <p className="text-slate-500">Transporte especializado em GV.</p>
                        </div>
                        <div className="bg-slate-900 text-white rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
                            {/* Simulação de Mapa */}
                            <div className="w-full h-48 bg-slate-800 rounded-3xl mb-8 flex items-center justify-center border border-slate-700 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-mint-500/10 to-lavender-500/10"></div>
                                <div className="z-10 bg-white text-slate-900 px-6 py-2 rounded-full font-black shadow-2xl">
                                    GV - Centro 📍
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-slate-800 p-5 rounded-3xl border-2 border-mint-500/50 flex justify-between items-center cursor-pointer hover:bg-slate-700 transition-all">
                                    <div>
                                        <h4 className="font-bold text-lg">Comfort Pet</h4>
                                        <p className="text-xs text-slate-400">Capa de couro & Ar-condicionado</p>
                                    </div>
                                    <span className="text-mint-200 font-black text-xl text-right">R$ 18,50</span>
                                </div>

                                <div className="bg-slate-800 p-5 rounded-3xl border-2 border-transparent flex justify-between items-center opacity-60 hover:opacity-100 transition-all cursor-pointer">
                                    <div>
                                        <h4 className="font-bold text-lg">Multi Pet</h4>
                                        <p className="text-xs text-slate-400">Até 3 animais & Cintos especiais</p>
                                    </div>
                                    <span className="text-slate-400 font-black text-xl">R$ 25,00</span>
                                </div>
                            </div>

                            <button className="w-full bg-mint-500 hover:bg-mint-200 text-slate-900 font-black py-5 rounded-3xl mt-10 transition-all uppercase tracking-widest text-lg shadow-lg shadow-mint-500/20">
                                Confirmar PetDriver
                            </button>
                        </div>
                    </section>
                )}

                {activeTab === 'assinaturas' && (
                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-900">Planos Mensais</h2>
                            <p className="text-slate-500">Garanta economia e rotina para o seu melhor amigo.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {plans.map(plan => (
                                <div key={plan.id} className={`p-8 rounded-[40px] border-4 flex flex-col justify-between h-80 card-hover ${plan.color === 'mint' ? 'bg-mint-50 border-mint-200' : 'bg-lavender-50 border-lavender-200'
                                    }`}>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-2">{plan.name}</h3>
                                        <p className="text-slate-600 font-medium">{plan.description}</p>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="text-3xl font-black text-slate-900">
                                            R$ {plan.price}<span className="text-sm font-bold text-slate-500 block">/mês</span>
                                        </div>
                                        <button className={`px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-md active:scale-95 transition-all ${plan.color === 'mint' ? 'bg-mint-500 text-slate-900' : 'bg-lavender-500 text-white'
                                            }`}>
                                            Assinar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <footer className="mt-20 p-12 bg-slate-900 text-white text-center">
                <p className="text-slate-500 text-sm">© 2026 ZeloPet por Ana Elisa Ferraz. Governador Valadares, MG.</p>
            </footer>
        </div>
    );
}

export default App;
