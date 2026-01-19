import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

export default function MainLayout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Check if we are on home page to handle transparency
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen flex flex-col selection:bg-zen-lavender-200 selection:text-stone-800">

            {/* Zen Header - Floating and adaptive */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || !isHome
                        ? 'bg-white/70 backdrop-blur-xl border-b border-white/50 py-4'
                        : 'bg-transparent py-6'
                    }`}
            >
                <div className="container-custom flex items-center justify-between">
                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className={`
                            p-2 rounded-xl transition-all duration-500
                            ${scrolled || !isHome ? 'bg-zen-lavender-100 text-stone-800' : 'bg-white/30 text-stone-800 backdrop-blur-md'}
                        `}>
                            <span className="text-lg">🐾</span>
                        </div>
                        <h1 className="text-2xl font-outfit font-medium text-stone-800 tracking-tight">
                            Zelo<span className="font-bold">Pet</span>
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {[
                            { path: '/', label: 'Início' },
                            { path: '/search', label: 'Explorar' },
                            { path: '/driver', label: 'PetDriver' },
                            { path: '/plans', label: 'Planos' },
                        ].map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`
                                    px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                                    ${location.pathname === link.path
                                        ? 'bg-stone-800 text-white shadow-md'
                                        : 'text-stone-500 hover:text-stone-900 hover:bg-white/50'
                                    }
                                `}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <button className="p-2 text-stone-400 hover:text-red-400 transition-colors">
                            <Heart size={20} />
                        </button>
                        <Link
                            to="/login"
                            className={`
                                px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                                ${scrolled || !isHome
                                    ? 'bg-stone-800 text-white hover:bg-stone-700 shadow-lg shadow-stone-200'
                                    : 'bg-white/80 backdrop-blur-md text-stone-800 hover:bg-white shadow-lg shadow-stone-800/5'
                                }
                            `}
                        >
                            Entrar
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-stone-600"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow pt-0">
                {children}
            </main>

            {/* Minimalist Zen Footer */}
            {!isHome && (
                <footer className="bg-white border-t border-stone-100 py-12 mt-20">
                    <div className="container-custom text-center">
                        <p className="text-stone-400 font-light text-sm">
                            © 2026 ZeloPet • Feito com paciência e carinho.
                        </p>
                    </div>
                </footer>
            )}
        </div>
    );
}
