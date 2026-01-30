"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

type DeliverablesSectionProps = {
    cta?: React.ReactNode;
};

const features = [
    "Acesso a App Exclusivo de Treino",
    "Vídeos demonstrativos dos exercícios",
    "Planejamento Alimentar (Nutricionista)",
    "Suporte direto via WhatsApp",
    "Análise de técnica de execução",
    "Ajustes periódicos no plano",
];

const WaveDivider = () => (
    <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-12 md:h-16 pointer-events-none"
    >
        <svg
            viewBox="0 0 1440 160"
            preserveAspectRatio="none"
            className="w-full h-full"
        >
            <defs>
                <linearGradient id="deliverablesWaveBottom" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(15,23,42,0)" />
                    <stop offset="55%" stopColor="rgba(15,23,42,0.55)" />
                    <stop offset="100%" stopColor="rgba(2,6,23,0.9)" />
                </linearGradient>
            </defs>
            <path
                d="M0,120 C240,150 480,90 720,110 C960,130 1200,90 1440,110 L1440,160 L0,160 Z"
                fill="url(#deliverablesWaveBottom)"
            />
        </svg>
    </div>
);

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
                <linearGradient id="deliverablesWaveTop" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="rgba(15,23,42,0)" />
                    <stop offset="55%" stopColor="rgba(15,23,42,0.55)" />
                    <stop offset="100%" stopColor="rgba(2,6,23,0.9)" />
                </linearGradient>
            </defs>
            <path
                d="M0,40 C240,10 480,70 720,50 C960,30 1200,70 1440,50 L1440,0 L0,0 Z"
                fill="url(#deliverablesWaveTop)"
            />
        </svg>
    </div>
);

export default function DeliverablesSection({ cta }: DeliverablesSectionProps) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const pinRef = useRef<HTMLDivElement | null>(null);
    const itemsRef = useRef<HTMLDivElement[]>([]);
    const ctaRef = useRef<HTMLDivElement | null>(null);
    const scrollVh = 100 + (features.length - 1) * 45;

    const setItemRef = (el: HTMLDivElement | null, index: number) => {
        if (!el) {
            return;
        }
        itemsRef.current[index] = el;
    };

    useLayoutEffect(() => {
        if (!sectionRef.current || !pinRef.current) {
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const items = itemsRef.current.filter(Boolean);
            if (!items.length) {
                return;
            }

            gsap.set(items, {
                autoAlpha: 0,
                y: -160,
                rotation: -10,
                rotationX: 18,
                scale: 0.96,
                transformOrigin: "top center",
                transformPerspective: 900,
                transformStyle: "preserve-3d",
                filter: "blur(6px)",
            });

            if (ctaRef.current) {
                gsap.set(ctaRef.current, { autoAlpha: 0, y: 20 });
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.7,
                    pin: pinRef.current,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            items.forEach((item, index) => {
                const pos = index;
                tl.to(
                    item,
                    {
                        autoAlpha: 1,
                        y: 0,
                        rotation: 0,
                        rotationX: 0,
                        scale: 1,
                        filter: "blur(0px)",
                        duration: 0.75,
                        ease: "back.out(1.2)",
                        force3D: true,
                    },
                    pos + 0.1
                );
            });

            if (ctaRef.current) {
                tl.to(
                    ctaRef.current,
                    {
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.4,
                        ease: "power2.out",
                    },
                    items.length + 0.2
                );
            }
        }, sectionRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            style={{ minHeight: `${scrollVh}vh` }}
            className="relative bg-slate-950 overflow-hidden"
        >
            <div
                ref={pinRef}
                className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
            >
                <div className="absolute inset-6 md:inset-10 rounded-[3rem] glass-card border border-white/10 shadow-[0_30px_120px_-60px_rgba(0,0,0,0.85)]" />
                <div className="relative w-full max-w-7xl mx-auto py-20 px-4 md:px-8 flex flex-col items-center justify-center text-center">
                    <h2 className="font-condensed text-5xl font-bold uppercase mb-6 leading-tight">
                        O que você <br /><span className="text-blue-500">recebe?</span>
                    </h2>
                    <div className="w-full max-w-3xl space-y-4 mt-4">
                        {features.map((feature, idx) => (
                            <div
                                key={feature}
                                ref={(el) => setItemRef(el, idx)}
                                className="flex items-center justify-center gap-4 p-4 glass rounded-xl bg-white/[0.03]"
                            >
                                <div className="bg-green-500/20 p-1 rounded-full">
                                    <Check className="w-5 h-5 text-green-400" />
                                </div>
                                <span className="font-medium text-gray-200">{feature}</span>
                            </div>
                        ))}
                    </div>

                    {cta && (
                        <div ref={ctaRef} className="mt-10">
                            {cta}
                        </div>
                    )}
                </div>
            </div>
            <WaveDividerTop />
            <WaveDivider />
        </section>
    );
}
