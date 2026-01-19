import React from 'react';
import { MapPin, Navigation, Clock, Shield } from 'lucide-react';

export default function DriverPage() {
    return (
        <div className="container-custom py-12">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Booking Form */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">PetDriver GV</h1>
                        <p className="text-slate-500">Transporte seguro e climatizado para seu pet.</p>
                    </div>

                    <div className="card-clean p-8 shadow-lg">
                        <div className="space-y-6">
                            {/* Route Inputs */}
                            <div className="relative space-y-4">
                                <div className="absolute left-[15px] top-[40px] bottom-[40px] w-0.5 bg-slate-200 z-0"></div>

                                <div className="relative z-10">
                                    <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Origem</label>
                                    <div className="flex gap-3">
                                        <div className="mt-3 text-primary-600"><div className="w-3 h-3 rounded-full border-[3px] border-current bg-white"></div></div>
                                        <input type="text" placeholder="Endereço de retirada" className="input-field" />
                                    </div>
                                </div>

                                <div className="relative z-10">
                                    <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Destino</label>
                                    <div className="flex gap-3">
                                        <div className="mt-3 text-slate-800"><MapPin size={16} /></div>
                                        <input type="text" placeholder="Endereço de entrega (ex: Clínica Vet)" className="input-field" />
                                    </div>
                                </div>
                            </div>

                            {/* Vehicle Selection */}
                            <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                                <label className="text-xs font-bold text-slate-500 uppercase">Selecione o Veículo</label>

                                <div className="space-y-3">
                                    <label className="flex items-center p-3 bg-white border-2 border-primary-100 rounded-xl cursor-pointer hover:border-primary-500 transition-colors">
                                        <input type="radio" name="vehicle" className="accent-primary-600 w-4 h-4 mr-4" defaultChecked />
                                        <div className="flex-1">
                                            <div className="flex justify-between font-bold text-slate-800">
                                                <span>Comfort Pet</span>
                                                <span>R$ 18,90</span>
                                            </div>
                                            <p className="text-xs text-slate-500">Capa protetora • Ar condicionado</p>
                                        </div>
                                    </label>

                                    <label className="flex items-center p-3 bg-white border border-slate-100 rounded-xl cursor-pointer hover:border-slate-300 transition-colors">
                                        <input type="radio" name="vehicle" className="accent-primary-600 w-4 h-4 mr-4" />
                                        <div className="flex-1">
                                            <div className="flex justify-between font-bold text-slate-800">
                                                <span>Multi Pet (Van)</span>
                                                <span>R$ 25,00</span>
                                            </div>
                                            <p className="text-xs text-slate-500">Espaço para caixas • Até 3 pets</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <button className="btn-primary w-full py-4 text-lg font-bold shadow-lg shadow-primary-500/20">
                                Solicitar PetDriver
                            </button>
                        </div>
                    </div>
                </div>

                {/* Map Simulation */}
                <div className="hidden lg:block h-[600px] bg-slate-100 rounded-3xl relative overflow-hidden border border-slate-200">
                    {/* Placeholder Map */}
                    <div className="absolute inset-0 bg-[#e5e7eb] flex items-center justify-center">
                        <span className="text-slate-400 font-medium flex items-center gap-2">
                            🗺️ Google Maps Integration (Placeholder)
                        </span>
                    </div>

                    {/* Floating Status Card */}
                    <div className="absolute bottom-8 left-8 right-8 bg-white p-4 rounded-xl shadow-xl border border-slate-100 animate-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <Shield className="text-green-600" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">Segurança Total</h4>
                                <p className="text-xs text-slate-500">Todos os motoristas são treinados em manejo animal e primeiros socorros.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
