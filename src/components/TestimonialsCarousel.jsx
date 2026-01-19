import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const MOCK_TESTIMONIALS = [
    {
        id: 1,
        text: "O ZeloPet mudou minha rotina. O Max fica super tranquilo com os passeadores e eu recebo atualizações constantes.",
        author: "Ana Flávia",
        pet: "Max (Border Collie)",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop"
    },
    {
        id: 2,
        text: "A atenção aos detalhes é impressionante. Sente-se o amor em cada serviço prestado. Recomendo muito!",
        author: "Ricardo Mendes",
        pet: "Luna (Persa)",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop"
    },
    {
        id: 3,
        text: "O transporte para as consultas veterinárias deixou de ser um estresse. O carro é super adaptado e cheiroso.",
        author: "Beatriz Silva",
        pet: "Thor (Golden Retriever)",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&auto=format&fit=crop"
    }
];

export default function TestimonialsCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % MOCK_TESTIMONIALS.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container-custom max-w-4xl">
                <div className="text-center mb-16">
                    <span className="text-xs font-semibold text-zen-lavender-500 uppercase tracking-widest mb-4 block">Comunidade Zelo</span>
                    <h2 className="text-3xl md:text-5xl font-light text-stone-800">O que dizem sobre nós</h2>
                </div>

                <div className="relative h-80 md:h-64">
                    {MOCK_TESTIMONIALS.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`
                                absolute inset-0 testimonial-card
                                ${index === activeIndex ? 'active delay-300' : 'pointer-events-none'}
                            `}
                        >
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="relative shrink-0">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.author}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -top-2 -right-2 bg-stone-800 text-white w-8 h-8 rounded-full flex items-center justify-center z-20 shadow-lg">
                                        <Quote size={14} />
                                    </div>
                                </div>
                                <div className="text-center md:text-left">
                                    <p className="text-lg md:text-xl text-stone-600 italic mb-6 leading-relaxed">
                                        "{testimonial.text}"
                                    </p>
                                    <div>
                                        <h4 className="text-base font-semibold text-stone-800">{testimonial.author}</h4>
                                        <p className="text-sm text-stone-400">Tutor(a) do {testimonial.pet}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-3 mt-12">
                    {MOCK_TESTIMONIALS.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`
                                w-2 h-2 rounded-full transition-all duration-500
                                ${activeIndex === index ? 'w-8 bg-stone-800' : 'bg-stone-300 hover:bg-stone-400'}
                            `}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
