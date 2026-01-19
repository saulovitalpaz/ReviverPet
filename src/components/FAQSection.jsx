import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ_DATA = [
    {
        question: "Como os passeadores são selecionados?",
        answer: "Todos os nossos parceiros passam por um rigoroso processo de verificação de identidade, antecedentes e, o mais importante, uma avaliação prática de comportamento animal com nossos especialistas."
    },
    {
        question: "Qual a área de cobertura para o PetDriver?",
        answer: "Atualmente operamos em toda a região metropolitana de Governador Valadares. Estamos expandindo para cidades vizinhas em breve."
    },
    {
        question: "Os serviços possuem seguro?",
        answer: "Sim! Todos os serviços agendados através da nossa plataforma contam com a Proteção Zelo, que cobre incidentes veterinários emergenciais durante o período do cuidado."
    },
    {
        question: "Posso cancelar uma solicitação?",
        answer: "Cancelamentos feitos com até 4 horas de antecedência são totalmente gratuitos. Após esse período, uma pequena taxa de deslocamento pode ser aplicada."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="py-24 relative">
            {/* Cute Pet background pattern */}
            <div className="absolute inset-0 pet-pattern-bg opacity-40 z-0"></div>
            <div className="absolute inset-0 pet-cute-overlay z-10"></div>

            <div className="container-custom max-w-3xl relative z-20">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-sm mb-6">
                        <HelpCircle className="text-zen-lavender-500" size={24} />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-light text-stone-800 mb-4">Dúvidas Frequentes</h2>
                    <p className="text-stone-500">Tudo o que você precisa saber para se sentir em paz.</p>
                </div>

                <div className="space-y-4">
                    {FAQ_DATA.map((item, index) => (
                        <div
                            key={index}
                            className="glass-panel overflow-hidden border-white/80"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 md:px-8 py-6 flex items-center justify-between text-left faq-trigger"
                            >
                                <span className="text-base md:text-lg font-medium text-stone-700 pr-8">
                                    {item.question}
                                </span>
                                <div className="faq-icon transition-all duration-300 text-stone-400">
                                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                </div>
                            </button>
                            <div className={`faq-content ${openIndex === index ? 'open' : ''}`}>
                                <div className="px-6 md:px-8 pb-8 text-stone-500 leading-relaxed">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-sm text-stone-400">
                        Ainda tem perguntas? <button className="text-stone-800 font-semibold underline underline-offset-4">Fale conosco pelo WhatsApp</button>
                    </p>
                </div>
            </div>
        </section>
    );
}
