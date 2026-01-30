"use client";

import React, { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ResultsSectionProps = {
    SectionTitle: React.ComponentType<{ subtitle?: string; children: React.ReactNode }>;
    GlassCard: React.ComponentType<{
        children: React.ReactNode;
        className?: string;
        delay?: number;
    }>;
};

type TestimonialVideo = {
    name: string;
    result: string;
    src?: string;
    poster?: string;
};

const testimonials: TestimonialVideo[] = [
    {
        name: "João Silva",
        result: "-15kg em 3 meses",
        src: "/videos/depoimento-01.mp4",
    },
    {
        name: "Ana Souza",
        result: "Ganho de massa",
        src: "/videos/depoimento-02.mp4",
    },
    {
        name: "Carlos Oliveira",
        result: "Preparação Atleta",
        src: "/videos/depoimento-03.mp4",
    },
];

const WaveDividerTop = () => (
    <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-12 md:h-16 pointer-events-none"
    >
        <svg
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            className="w-full h-full"
        >
            <defs>
                <linearGradient id="waveBlendTop" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="rgba(15,23,42,0)" />
                    <stop offset="55%" stopColor="rgba(15,23,42,0.55)" />
                    <stop offset="100%" stopColor="rgba(2,6,23,0.9)" />
                </linearGradient>
            </defs>
            <path
                d="M0,40 C240,10 480,70 720,50 C960,30 1200,70 1440,50 L1440,0 L0,0 Z"
                fill="url(#waveBlendTop)"
            />
        </svg>
    </div>
);

export default function ResultsSection({ SectionTitle, GlassCard }: ResultsSectionProps) {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const cardRefs = useRef<HTMLDivElement[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const setCardRef = (el: HTMLDivElement | null, index: number) => {
        if (!el) {
            return;
        }
        cardRefs.current[index] = el;
    };

    const scrollToIndex = useCallback(
        (nextIndex: number) => {
            const clamped = Math.max(0, Math.min(testimonials.length - 1, nextIndex));
            setActiveIndex(clamped);
            const target = cardRefs.current[clamped];
            if (target) {
                target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
            }
        },
        []
    );

    return (
        <section
            id="resultados"
            className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden"
        >
            <WaveDividerTop />
            <div className="flex flex-col items-center">
                <SectionTitle subtitle="Depoimentos">Resultados Reais</SectionTitle>
                <div className="flex items-center gap-3 mb-6">
                    <button
                        type="button"
                        onClick={() => scrollToIndex(activeIndex - 1)}
                        className="w-10 h-10 rounded-full border border-white/10 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                        aria-label="Voltar depoimento"
                        disabled={activeIndex === 0}
                    >
                        <ChevronLeft className="w-5 h-5 mx-auto" />
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollToIndex(activeIndex + 1)}
                        className="w-10 h-10 rounded-full border border-white/10 text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                        aria-label="Próximo depoimento"
                        disabled={activeIndex === testimonials.length - 1}
                    >
                        <ChevronRight className="w-5 h-5 mx-auto" />
                    </button>
                </div>
                <div
                    ref={trackRef}
                    className="w-full flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 px-2"
                    aria-label="Carrossel de depoimentos em vídeo"
                >
                    {testimonials.map((t, idx) => (
                        <div
                            key={t.name}
                            ref={(el) => setCardRef(el, idx)}
                            className="snap-center shrink-0"
                        >
                            <GlassCard delay={idx * 0.05} className="p-0 overflow-hidden">
                                <div className="w-[240px] sm:w-[260px] md:w-[280px] lg:w-[300px] aspect-[9/16] bg-slate-900/60">
                                    {t.src ? (
                                        <video
                                            src={t.src}
                                            poster={t.poster}
                                            controls
                                            playsInline
                                            preload="metadata"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                                            Vídeo em breve
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 text-left">
                                    <h4 className="font-bold text-white text-lg">{t.name}</h4>
                                    <span className="text-blue-400 text-sm font-medium">{t.result}</span>
                                </div>
                            </GlassCard>
                        </div>
                    ))}
                </div>
            </div>
            <p className="text-center text-gray-500 text-sm mt-8">
                * Os resultados podem variar de pessoa para pessoa.
            </p>
        </section>
    );
}
