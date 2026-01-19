import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Send, Check } from 'lucide-react';

export default function ServiceRequestCard() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className={`
            fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-lg
            transition-all duration-700 ease-in-out
            ${isCollapsed ? 'translate-y-[calc(100%-4rem)]' : 'translate-y-0'}
        `}>
            <div className="glass-panel overflow-hidden border-stone-200/50 shadow-2xl shadow-stone-200/40">
                {/* Header / Trigger */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left group"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zen-mint-100 flex items-center justify-center text-sm">
                            ✨
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-stone-800">Solicitação Rápida</h4>
                            <p className="text-xs text-stone-500">Precisa de algo agora? Comece aqui.</p>
                        </div>
                    </div>
                    <div className="text-stone-400 group-hover:text-stone-800 transition-colors">
                        {isCollapsed ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                </button>

                {/* Content */}
                <div className="px-6 pb-8 pt-2">
                    {submitted ? (
                        <div className="py-8 text-center animate-fade-in">
                            <div className="w-16 h-16 bg-zen-mint-100 text-zen-mint-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check size={32} />
                            </div>
                            <h3 className="text-lg font-medium text-stone-800 mb-2">Pedido Recebido!</h3>
                            <p className="text-sm text-stone-500">Em instantes um cuidador entrará em contato.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-stone-400 uppercase tracking-wider mb-1.5 ml-1">
                                    O que seu pet precisa?
                                </label>
                                <select className="w-full bg-white/50 border border-stone-100 rounded-2xl px-4 py-3 text-stone-700 focus:outline-none focus:ring-2 focus:ring-zen-lavender-200 transition-all text-sm outline-none">
                                    <option>Passeio relaxante</option>
                                    <option>Transporte seguro</option>
                                    <option>Hospedagem com carinho</option>
                                    <option>Outro serviço</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-stone-400 uppercase tracking-wider mb-1.5 ml-1">
                                    Mensagem adicional (opcional)
                                </label>
                                <textarea
                                    className="w-full bg-white/50 border border-stone-100 rounded-2xl px-4 py-3 text-stone-700 focus:outline-none focus:ring-2 focus:ring-zen-lavender-200 transition-all text-sm h-24 outline-none resize-none"
                                    placeholder="Conte um pouco sobre o temperamento dele..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full btn-zen-primary py-4 flex items-center justify-center gap-2 text-sm"
                            >
                                <Send size={16} />
                                Enviar Solicitação
                            </button>
                            <p className="text-[10px] text-center text-stone-400">
                                Você será redirecionado para os detalhes após o envio.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
