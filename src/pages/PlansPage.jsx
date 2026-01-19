import React from 'react';
import { Check } from 'lucide-react';

export default function PlansPage() {
    return (
        <div className="container-custom py-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Assinaturas e Fidelidade</h1>
                <p className="text-slate-500 text-lg">Garanta uma rotina saudável para seu pet e economia para você com nossos planos mensais.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-start">

                {/* Basic Plan */}
                <div className="card-clean p-8">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Básico</h3>
                    <p className="text-slate-500 text-sm mb-6">Para quem precisa de ajuda pontual.</p>
                    <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-4xl font-bold text-slate-900">R$ 220</span>
                        <span className="text-slate-400">/mês</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                        <li className="flex gap-3 text-sm text-slate-600"><Check size={16} className="text-green-500" /> 2 Passeios por semana</li>
                        <li className="flex gap-3 text-sm text-slate-600"><Check size={16} className="text-green-500" /> Relatório básico</li>
                        <li className="flex gap-3 text-sm text-slate-600"><Check size={16} className="text-green-500" /> Suporte via App</li>
                    </ul>
                    <button className="btn-secondary w-full">Escolher Plano</button>
                </div>

                {/* Pro Plan (Highlighted) */}
                <div className="card-clean p-8 border-primary-500 shadow-xl relative transform md:-translate-y-4">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                        Mais Popular
                    </div>
                    <h3 className="text-xl font-bold text-primary-700 mb-2">Premium</h3>
                    <p className="text-slate-500 text-sm mb-6">A rotina ideal para saúde e bem-estar.</p>
                    <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-4xl font-bold text-slate-900">R$ 550</span>
                        <span className="text-slate-400">/mês</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                        <li className="flex gap-3 text-sm text-slate-600"><Check size={16} className="text-green-500" /> <b>5 Passeios</b> por semana (Seg-Sex)</li>
                        <li className="flex gap-3 text-sm text-slate-600"><Check size={16} className="text-green-500" /> Relatório com fotos e GPS</li>
                        <li className="flex gap-3 text-sm text-slate-600"><Check size={16} className="text-green-500" /> 1 Check-up mensal</li>
                        <li className="flex gap-3 text-sm text-slate-600"><Check size={16} className="text-green-500" /> Prioridade no PetDriver</li>
                    </ul>
                    <button className="btn-primary w-full shadow-lg shadow-primary-500/20">Assinar Agora</button>
                </div>

                {/* VIP Plan */}
                <div className="card-clean p-8">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">VIP Elite</h3>
                    <p className="text-slate-500 text-sm mb-6">Cuidado total e exclusivo.</p>
                    <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-4xl font-bold text-slate-900">R$ 890</span>
                        <span className="text-slate-400">/mês</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                        <li className="flex gap-3 text-sm text-slate-600"><Check size={16} className="text-green-500" /> Passeios Ilimitados</li>
                        <li className="flex gap-3 text-sm text-slate-600"><Check size={16} className="text-green-500" /> Veterinário dedicado</li>
                        <li className="flex gap-3 text-sm text-slate-600"><Check size={16} className="text-green-500" /> Grooming Mensal</li>
                        <li className="flex gap-3 text-sm text-slate-600"><Check size={16} className="text-green-500" /> Transporte Incluso (4x)</li>
                    </ul>
                    <button className="btn-secondary w-full">Contatar Consultor</button>
                </div>

            </div>
        </div>
    );
}
