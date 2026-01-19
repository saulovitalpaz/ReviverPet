import React, { useState } from 'react';
import { Check, X, MessageSquare, User, Calendar } from 'lucide-react';

const INITIAL_TESTIMONIALS = [
    {
        id: 101,
        author: "Carlos Alberto",
        pet: "Bento (Pug)",
        text: "O melhor serviço de pet driver que já usei em GV. Pontualidade britânica!",
        status: "pending",
        date: "2026-01-18"
    },
    {
        id: 102,
        author: "Fernanda Costa",
        pet: "Mia (Gata)",
        text: "A Mia adora os passeios, volta sempre feliz e cansada. Recomendo!",
        status: "pending",
        date: "2026-01-18"
    }
];

export default function AdminPanel() {
    const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);

    const handleAction = (id, newStatus) => {
        setTestimonials(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-stone-50">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-light text-stone-800 mb-2 tracking-tight">Painel Admin</h1>
                        <p className="text-stone-500">Gerencie a comunidade e modere depoimentos.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="glass-panel px-6 py-4 flex items-center gap-4 border-stone-200">
                            <div className="w-10 h-10 rounded-full bg-zen-lavender-100 flex items-center justify-center text-zen-lavender-500">
                                <MessageSquare size={20} />
                            </div>
                            <div>
                                <span className="block text-xl font-bold text-stone-800">
                                    {testimonials.filter(t => t.status === 'pending').length}
                                </span>
                                <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Pendentes</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6">
                    <h2 className="text-lg font-semibold text-stone-700 flex items-center gap-2 mb-2">
                        <Calendar size={18} className="text-stone-400" />
                        Moderação de Comentários
                    </h2>

                    {testimonials.filter(t => t.status === 'pending').length === 0 ? (
                        <div className="glass-panel p-12 text-center border-dashed border-stone-300">
                            <p className="text-stone-400">Nenhum depoimento pendente no momento.</p>
                        </div>
                    ) : (
                        testimonials.filter(t => t.status === 'pending').map(testimonial => (
                            <div key={testimonial.id} className="glass-panel p-6 md:p-8 flex flex-col md:flex-row gap-6 animate-fade-in">
                                <div className="shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-石-400">
                                        <User size={24} />
                                    </div>
                                </div>
                                <div className="grow">
                                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                        <div>
                                            <h4 className="font-bold text-stone-800">{testimonial.author}</h4>
                                            <p className="text-xs text-stone-400">Tutor de {testimonial.pet} • {testimonial.date}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleAction(testimonial.id, 'rejected')}
                                                className="p-2 rounded-xl bg-white border border-stone-100 text-stone-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm"
                                                title="Rejeitar"
                                            >
                                                <X size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleAction(testimonial.id, 'approved')}
                                                className="p-2 rounded-xl bg-stone-800 text-white hover:bg-zen-mint-500 transition-all shadow-lg"
                                                title="Aprovar"
                                            >
                                                <Check size={20} />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-stone-600 leading-relaxed italic">
                                        "{testimonial.text}"
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
