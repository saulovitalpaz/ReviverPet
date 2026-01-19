import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// New Components
import ServiceRequestCard from '../components/ServiceRequestCard';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import FAQSection from '../components/FAQSection';

export default function HomePage() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-white">
            {/* Aurora Background (Global for Home) */}
            <div className="aurora-bg">
                <div className="aurora-blob blob-1"></div>
                <div className="aurora-blob blob-2"></div>
                <div className="aurora-blob blob-3"></div>
            </div>

            <div className="relative z-10 pt-24 md:pt-32 pb-12 md:pb-20">

                {/* Service Request Card (Quick Entry, clean & collapsible) */}
                <ServiceRequestCard />

                {/* Zen Hero Section - Refined for softer entry */}
                <section className="container-custom text-center max-w-4xl mx-auto mb-16 md:mb-24 animate-fade-in px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/50 text-stone-500 text-xs md:text-sm font-medium mb-6 md:mb-8 shadow-sm">
                        <span className="flex h-2 w-2 rounded-full bg-zen-mint-400"></span>
                        Disponível em Governador Valadares
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-stone-800 mb-6 md:mb-8 tracking-tight leading-[1.1]">
                        Um refúgio de <br />
                        <span className="font-semibold bg-gradient-to-r from-stone-700 via-stone-500 to-stone-400 bg-clip-text text-transparent italic">
                            carinho e confiança.
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed text-balance px-2 font-light">
                        Proporcionamos experiências que respeitam o tempo do seu pet e a sua tranquilidade. Cuidado especializado, de alma para alma.
                    </p>
                </section>

                {/* Discovery Cards (Journey focus) */}
                <section className="container-custom grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4 mb-24 md:mb-32">
                    {/* Card 1: Passeio */}
                    <Link to="/search" className="group">
                        <div className="glass-panel h-auto md:h-96 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 active:scale-95">
                            <div className="absolute top-0 right-0 p-12 bg-zen-lavender-200 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
                            <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 mb-4 md:mb-6">
                                <div className="bg-white/50 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-sm md:mb-6 group-hover:scale-110 transition-transform duration-500">
                                    🌿
                                </div>
                                <h3 className="text-2xl md:text-3xl font-light text-stone-800 md:hidden tracking-tight">Explorar</h3>
                            </div>
                            <div className="mb-4 md:mb-0">
                                <h3 className="text-3xl font-light mb-3 text-stone-800 hidden md:block tracking-tight">Explorar</h3>
                                <p className="text-stone-500 leading-relaxed text-sm md:text-base font-light">
                                    Encontre passeadores e cuidadores que compartilham do nosso propósito.
                                </p>
                            </div>
                            <div className="flex items-center gap-4 text-stone-400 font-medium group-hover:text-stone-800 transition-colors mt-auto pt-4 md:pt-0">
                                <span className="text-xs md:text-sm uppercase tracking-widest font-semibold">Ver Profissionais</span>
                                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                            </div>
                        </div>
                    </Link>

                    {/* Card 2: Transporte */}
                    <Link to="/driver" className="group">
                        <div className="glass-panel h-auto md:h-96 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 active:scale-95">
                            <div className="absolute top-0 right-0 p-12 bg-zen-mint-200 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
                            <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 mb-4 md:mb-6">
                                <div className="bg-white/50 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-sm md:mb-6 group-hover:scale-110 transition-transform duration-500">
                                    🚗
                                </div>
                                <h3 className="text-2xl md:text-3xl font-light text-stone-800 md:hidden tracking-tight">Viajar</h3>
                            </div>
                            <div className="mb-4 md:mb-0">
                                <h3 className="text-3xl font-light mb-3 text-stone-800 hidden md:block tracking-tight">Viajar</h3>
                                <p className="text-stone-500 leading-relaxed text-sm md:text-base font-light">
                                    PetDriver especializado com segurança e conforto para ir onde precisar.
                                </p>
                            </div>
                            <div className="flex items-center gap-4 text-stone-400 font-medium group-hover:text-stone-800 transition-colors mt-auto pt-4 md:pt-0">
                                <span className="text-xs md:text-sm uppercase tracking-widest font-semibold">Chamar Motorista</span>
                                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                            </div>
                        </div>
                    </Link>

                    {/* Card 3: Assinatura */}
                    <Link to="/plans" className="group">
                        <div className="glass-panel h-auto md:h-96 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 active:scale-95">
                            <div className="absolute top-0 right-0 p-12 bg-stone-200 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
                            <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 mb-4 md:mb-6">
                                <div className="bg-white/50 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-sm md:mb-6 group-hover:scale-110 transition-transform duration-500">
                                    ✨
                                </div>
                                <h3 className="text-2xl md:text-3xl font-light text-stone-800 md:hidden tracking-tight">Pertencer</h3>
                            </div>
                            <div className="mb-4 md:mb-0">
                                <h3 className="text-3xl font-light mb-3 text-stone-800 hidden md:block tracking-tight">Pertencer</h3>
                                <p className="text-stone-500 leading-relaxed text-sm md:text-base font-light">
                                    Clube de benefícios exclusivos para quem busca rotina e cuidado integral.
                                </p>
                            </div>
                            <div className="flex items-center gap-4 text-stone-400 font-medium group-hover:text-stone-800 transition-colors mt-auto pt-4 md:pt-0">
                                <span className="text-xs md:text-sm uppercase tracking-widest font-semibold">Ver Planos</span>
                                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                            </div>
                        </div>
                    </Link>
                </section>

                {/* Testimonials Section */}
                <TestimonialsCarousel />

                {/* FAQ Section */}
                <FAQSection />

                {/* Brand Promise - Subtle Footer for Home */}
                <div className="mt-20 md:mt-32 text-center opacity-60 px-4">
                    <p className="text-xs md:text-sm text-stone-400 uppercase tracking-[0.2em] font-light">
                        Feito com amor em Governador Valadares • MG
                    </p>
                </div>

            </div>
        </div>
    );
}
