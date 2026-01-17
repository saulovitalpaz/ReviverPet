import React, { useState } from 'react';

// Enhanced walker data with more details
const walkers = [
    { 
        id: 1, 
        name: 'Michael Santos', 
        role: 'Enfermeiro Veterinário', 
        price: 30, 
        rating: 5.0, 
        reviews: 42, 
        bio: 'Especialista em manejo de cães idosos e necessidades especiais. 5 anos de experiência em atendimento veterinário domiciliar.', 
        tags: ['Seguro Vet', 'Fotos Real-Time', 'Emergências'],
        avatar: '🐕',
        experience: '5 anos',
        specialty: ['Idosos', 'Grande Porte', 'Medicação'],
        verified: true
    },
    { 
        id: 2, 
        name: 'Julia Martins', 
        role: 'Dog Walker Certificada', 
        price: 25, 
        rating: 4.8, 
        reviews: 28, 
        bio: 'Passeios de alta energia com foco em socialização. Certificação internacional em comportamento canino.', 
        tags: ['GPS Tracking', 'Hidratação', 'Adestramento'],
        avatar: '🦮',
        experience: '3 anos',
        specialty: ['Raças Grandes', 'Comportamento', 'Socialização'],
        verified: true
    },
    { 
        id: 3, 
        name: 'Carlos Oliveira', 
        role: 'Pet Sitter Premium', 
        price: 35, 
        rating: 4.9, 
        reviews: 67, 
        bio: 'Cuidados completos no conforto da sua casa. Expertise em múltiplas espécies e temperamentos diversos.', 
        tags: ['Multi-Pet', 'Overnight', 'Gatos'],
        avatar: '🐈',
        experience: '7 anos',
        specialty: ['Hotelzinho', 'Gatos', 'Ansiedade'],
        verified: true
    },
];

const plans = [
    { 
        id: 1, 
        name: 'Básico', 
        description: '2 passeios por semana', 
        price: 220,
        features: ['2x passeios/semana', 'Duração 30min', 'Fotos incluídas', 'Suporte WhatsApp'],
        color: 'cyan',
        popular: false
    },
    { 
        id: 2, 
        name: 'Premium', 
        description: '5 passeios + Checkup Mensal', 
        price: 550,
        features: ['5x passeios/semana', 'Duração 45min', 'Relatório mensal', 'Prioridade emergências', 'Banho trimestral'],
        color: 'pink',
        popular: true
    },
    { 
        id: 3, 
        name: 'VIP Elite', 
        description: 'Cuidado total personalizado', 
        price: 890,
        features: ['Passeios ilimitados', 'Veterinário dedicado', 'Grooming mensal', 'Transporte incluso', 'Personal trainer'],
        color: 'lime',
        popular: false
    },
];

function App() {
    const [activeTab, setActiveTab] = useState('explorar');
    const [favorites, setFavorites] = useState([]);
    const [selectedWalker, setSelectedWalker] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleFavorite = (id) => {
        setFavorites(prev => 
            prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
        );
    };

    const filteredWalkers = walkers.filter(walker => 
        walker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        walker.specialty.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen relative">
            {/* Animated Background Gradient */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(6,182,212,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(236,72,153,0.1),transparent_50%)]"></div>
            </div>

            {/* Header */}
            <header className="glass sticky top-0 z-50 p-4 px-6 flex justify-between items-center">
                <h1 className="text-3xl font-black tracking-tighter flex items-center gap-2">
                    <span className="text-gradient-neon floating">ZELO</span>
                    <span className="text-white">PET</span>
                    <span className="text-2xl">🐾</span>
                </h1>
                <div className="flex gap-4 items-center">
                    <button className="text-sm font-bold text-white/70 hover:text-white transition-all">
                        Entrar
                    </button>
                    <button className="btn-neon-cyan px-6 py-2.5 rounded-xl text-sm">
                        Criar Conta
                    </button>
                </div>
            </header>

            {/* Navigation Tabs */}
            <nav className="glass-dark sticky top-[88px] z-40 mt-1">
                <div className="max-w-6xl mx-auto flex justify-around">
                    {[
                        { key: 'explorar', label: 'Explorar', icon: '🔍' },
                        { key: 'driver', label: 'PetDriver GV', icon: '🚗' },
                        { key: 'assinaturas', label: 'Assinaturas', icon: '⭐' }
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`py-5 px-8 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
                                activeTab === tab.key 
                                    ? 'border-neon-cyan-500 text-neon-cyan-400' 
                                    : 'border-transparent text-white/40 hover:text-white/70'
                            }`}
                        >
                            <span className="text-lg">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </nav>

            <main className="max-w-6xl mx-auto p-6 mt-8">
                {/* EXPLORAR TAB */}
                {activeTab === 'explorar' && (
                    <section className="animate-in space-y-8">
                        {/* Hero Section */}
                        <div className="text-center space-y-4 mb-12">
                            <h2 className="text-5xl font-black text-white leading-tight">
                                O que seu <span className="text-gradient-neon">pet</span> precisa hoje?
                            </h2>
                            <p className="text-white/60 text-lg">Passeadores especializados em Governador Valadares</p>
                        </div>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto mb-8">
                            <div className="card-premium">
                                <div className="card-premium-inner flex items-center gap-4 !p-4">
                                    <span className="text-2xl">🔍</span>
                                    <input
                                        type="text"
                                        placeholder="Buscar por nome, especialidade..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40"
                                    />
                                    {searchTerm && (
                                        <button 
                                            onClick={() => setSearchTerm('')}
                                            className="text-white/40 hover:text-white"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Walker Cards */}
                        <div className="grid gap-6">
                            {filteredWalkers.map((walker, index) => (
                                <div key={walker.id} className={`card-premium card-hover stagger-item`}>
                                    <div className="card-premium-inner">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            {/* Avatar */}
                                            <div className="relative flex-shrink-0">
                                                <div className="w-28 h-28 bg-gradient-to-br from-neon-cyan-500 to-neon-pink-500 rounded-2xl flex items-center justify-center text-5xl pulse-neon">
                                                    {walker.avatar}
                                                </div>
                                                {walker.verified && (
                                                    <div className="absolute -top-2 -right-2 bg-neon-lime-500 text-dark-900 rounded-full p-1.5">
                                                        ✓
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-grow space-y-4">
                                                {/* Header */}
                                                <div className="flex justify-between items-start flex-wrap gap-4">
                                                    <div>
                                                        <h3 className="text-2xl font-black text-white flex items-center gap-2">
                                                            {walker.name}
                                                        </h3>
                                                        <p className="text-neon-cyan-400 font-bold text-sm">{walker.role}</p>
                                                        <p className="text-white/40 text-xs mt-1">📅 {walker.experience} de experiência</p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="text-sm font-bold">
                                                            <span className="text-neon-lime-400 text-xl">⭐ {walker.rating}</span>
                                                            <span className="text-white/40 ml-1">({walker.reviews})</span>
                                                        </div>
                                                        <button
                                                            onClick={() => toggleFavorite(walker.id)}
                                                            className="text-2xl transition-all hover:scale-125"
                                                        >
                                                            {favorites.includes(walker.id) ? '❤️' : '🤍'}
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Bio */}
                                                <p className="text-white/70 text-sm leading-relaxed">
                                                    {walker.bio}
                                                </p>

                                                {/* Tags */}
                                                <div className="flex gap-2 flex-wrap">
                                                    {walker.tags.map((tag, i) => (
                                                        <span key={tag} className={`tag-neon ${
                                                            i % 3 === 0 ? 'tag-cyan' : i % 3 === 1 ? 'tag-pink' : 'tag-lime'
                                                        }`}>
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Specialties */}
                                                <div className="flex gap-2 flex-wrap">
                                                    {walker.specialty.map(spec => (
                                                        <span key={spec} className="text-xs text-white/50">
                                                            • {spec}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Price & CTA */}
                                            <div className="flex flex-col justify-center items-center gap-3 md:border-l md:pl-8 border-white/10 min-w-[180px]">
                                                <div className="text-center">
                                                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Por passeio</p>
                                                    <span className="text-4xl font-black text-gradient-neon">R$ {walker.price}</span>
                                                </div>
                                                <button className="btn-neon-cyan w-full whitespace-nowrap">
                                                    Agendar Agora
                                                </button>
                                                <button className="text-neon-cyan-400 text-sm font-bold hover:text-neon-cyan-300 transition-colors">
                                                    Ver Detalhes →
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredWalkers.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-white/40 text-xl">Nenhum passeador encontrado 😢</p>
                                <button 
                                    onClick={() => setSearchTerm('')}
                                    className="btn-neon-cyan mt-4"
                                >
                                    Limpar Busca
                                </button>
                            </div>
                        )}
                    </section>
                )}

                {/* PETDRIVER TAB */}
                {activeTab === 'driver' && (
                    <section className="animate-in space-y-8">
                        <div className="text-center space-y-4 mb-12">
                            <h2 className="text-5xl font-black text-white leading-tight">
                                Para onde <span className="text-gradient-neon">vamos</span>? 🚗
                            </h2>
                            <p className="text-white/60 text-lg">Transporte especializado e seguro em Governador Valadares</p>
                        </div>

                        <div className="card-premium max-w-3xl mx-auto">
                            <div className="card-premium-inner space-y-8">
                                {/* Map Simulation */}
                                <div className="relative w-full h-64 bg-dark-700/50 rounded-3xl overflow-hidden border border-neon-cyan-500/30">
                                    <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan-500/10 via-transparent to-neon-pink-500/10"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-white text-dark-900 px-8 py-3 rounded-full font-black shadow-2xl pulse-neon flex items-center gap-2">
                                            📍 GV - Centro
                                        </div>
                                    </div>
                                    {/* Animated dots */}
                                    <div className="absolute top-10 left-10 w-3 h-3 bg-neon-cyan-400 rounded-full animate-ping"></div>
                                    <div className="absolute bottom-10 right-10 w-3 h-3 bg-neon-pink-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                                </div>

                                {/* Vehicle Options */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-white mb-4">Escolha seu veículo</h3>
                                    
                                    <div className="card-premium card-hover border-2 border-neon-cyan-500/50">
                                        <div className="card-premium-inner !bg-dark-700/80 flex justify-between items-center cursor-pointer">
                                            <div className="flex items-center gap-4">
                                                <span className="text-4xl">🚙</span>
                                                <div>
                                                    <h4 className="font-bold text-lg text-white">Comfort Pet</h4>
                                                    <p className="text-xs text-white/50">Capa de couro • Ar-condicionado • 1 pet</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-neon-cyan-400 font-black text-2xl">R$ 18,50</span>
                                                <p className="text-xs text-white/40">~15min</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-premium card-hover opacity-80 hover:opacity-100">
                                        <div className="card-premium-inner flex justify-between items-center cursor-pointer">
                                            <div className="flex items-center gap-4">
                                                <span className="text-4xl">🚐</span>
                                                <div>
                                                    <h4 className="font-bold text-lg text-white">Multi Pet</h4>
                                                    <p className="text-xs text-white/50">Até 3 animais • Cintos especiais • Espaçoso</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-white/70 font-black text-2xl">R$ 25,00</span>
                                                <p className="text-xs text-white/40">~15min</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-premium card-hover opacity-80 hover:opacity-100">
                                        <div className="card-premium-inner flex justify-between items-center cursor-pointer">
                                            <div className="flex items-center gap-4">
                                                <span className="text-4xl">🏍️</span>
                                                <div>
                                                    <h4 className="font-bold text-lg text-white flex items-center gap-2">
                                                        Express Pet
                                                        <span className="tag-neon tag-pink text-[8px]">NOVO</span>
                                                    </h4>
                                                    <p className="text-xs text-white/50">Pets pequenos • Ultra-rápido • Baú especial</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-white/70 font-black text-2xl">R$ 15,00</span>
                                                <p className="text-xs text-white/40">~8min</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <button className="btn-neon w-full py-6 text-lg">
                                    🚀 Confirmar PetDriver
                                </button>

                                {/* Info Footer */}
                                <div className="flex gap-6 text-xs text-white/40 justify-center flex-wrap">
                                    <span className="flex items-center gap-1">✓ Rastreamento GPS</span>
                                    <span className="flex items-center gap-1">✓ Seguro Incluído</span>
                                    <span className="flex items-center gap-1">✓ Cashback 5%</span>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* ASSINATURAS TAB */}
                {activeTab === 'assinaturas' && (
                    <section className="animate-in space-y-8">
                        <div className="text-center space-y-4 mb-12">
                            <h2 className="text-5xl font-black text-white leading-tight">
                                Planos <span className="text-gradient-neon">Mensais</span>
                            </h2>
                            <p className="text-white/60 text-lg">Garanta economia e rotina para seu melhor amigo</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {plans.map((plan) => (
                                <div key={plan.id} className={`card-premium card-hover relative ${
                                    plan.popular ? 'scale-105 z-10' : ''
                                }`}>
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                                            <span className="bg-gradient-to-r from-neon-pink-500 to-neon-orange-500 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                                                ⭐ Mais Popular
                                            </span>
                                        </div>
                                    )}
                                    
                                    <div className="card-premium-inner h-full flex flex-col justify-between p-8 space-y-6">
                                        {/* Header */}
                                        <div>
                                            <h3 className={`text-3xl font-black mb-2 ${
                                                plan.color === 'cyan' ? 'text-neon-cyan-400' :
                                                plan.color === 'pink' ? 'text-neon-pink-400' :
                                                'text-neon-lime-400'
                                            }`}>
                                                {plan.name}
                                            </h3>
                                            <p className="text-white/60 font-medium">{plan.description}</p>
                                        </div>

                                        {/* Features */}
                                        <ul className="space-y-3 flex-grow">
                                            {plan.features.map(feature => (
                                                <li key={feature} className="flex items-start gap-2 text-sm text-white/80">
                                                    <span className={`mt-0.5 ${
                                                        plan.color === 'cyan' ? 'text-neon-cyan-400' :
                                                        plan.color === 'pink' ? 'text-neon-pink-400' :
                                                        'text-neon-lime-400'
                                                    }`}>✓</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Price & CTA */}
                                        <div className="space-y-4 pt-6 border-t border-white/10">
                                            <div className="flex items-end gap-2">
                                                <span className="text-4xl font-black text-white">
                                                    R$ {plan.price}
                                                </span>
                                                <span className="text-sm font-bold text-white/50 pb-1">/mês</span>
                                            </div>
                                            <button className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg ${
                                                plan.color === 'cyan' ? 'btn-neon-cyan' :
                                                plan.color === 'pink' ? 'btn-neon-pink' :
                                                'btn-neon bg-gradient-to-r from-neon-lime-600 to-neon-lime-400 text-dark-900'
                                            }`}>
                                                Assinar Agora
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Guarantee Badge */}
                        <div className="max-w-2xl mx-auto mt-12 text-center space-y-4">
                            <div className="inline-block card-premium">
                                <div className="card-premium-inner px-8 py-4">
                                    <p className="text-white/80 text-sm">
                                        <span className="text-neon-lime-400 font-bold">🛡️ Garantia 30 dias</span> • Cancele quando quiser
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            {/* Footer */}
            <footer className="mt-32 p-12 bg-dark-900/50 backdrop-blur-xl border-t border-white/5 text-center space-y-6">
                <div className="flex justify-center gap-8 text-2xl mb-6">
                    <a href="#" className="hover:scale-125 transition-transform">📱</a>
                    <a href="#" className="hover:scale-125 transition-transform">📧</a>
                    <a href="#" className="hover:scale-125 transition-transform">💬</a>
                </div>
                <p className="text-white/40 text-sm">
                    © 2026 <span className="text-gradient-neon font-bold">ZeloPet</span> por Ana Elisa Ferraz
                </p>
                <p className="text-white/30 text-xs">Governador Valadares, MG • Feito com 💛 para pets</p>
            </footer>
        </div>
    );
}

export default App;
