"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Monitor, Activity } from "lucide-react";

type Step = {
    step: string;
    title: string;
    desc: string;
    icon: React.ReactNode;
};

const steps: Step[] = [
    {
        step: "01",
        title: "Avaliação",
        desc: "Fazemos a análise completa do seu perfil, rotina e objetivos via anamnese detalhada.",
        icon: <Calendar className="w-6 h-6" />,
    },
    {
        step: "02",
        title: "Planejamento",
        desc: "Elaboramos do treino e estratégia nutricional personalizada para você baseado na sua rotina.",
        icon: <Monitor className="w-6 h-6" />,
    },
    {
        step: "03",
        title: "Evolução",
        desc: "Acompanhamos constantemente, fazemos ajustes e suporte via WhatsApp.",
        icon: <Activity className="w-6 h-6" />,
    },
];

export default function MethodologyScroll() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const cardOffsetRef = useRef(260);
    const [lineBottom, setLineBottom] = useState(40);

    const setCardRef = (el: HTMLDivElement | null, index: number) => {
        if (!el) {
            return;
        }
        cardsRef.current[index] = el;
    };

    const updateLineBounds = () => {
        const firstCard = cardsRef.current[0];
        if (!firstCard) {
            return;
        }
        const cardHeight = firstCard.getBoundingClientRect().height;
        const bottom = Math.max(24, (window.innerHeight - cardHeight) / 2);
        setLineBottom(bottom);
        cardOffsetRef.current = cardHeight + 56;
    };

    useLayoutEffect(() => {
        if (!sectionRef.current || !pinRef.current) {
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const cards = cardsRef.current.filter(Boolean);
            if (!cards.length) {
                return;
            }

            gsap.set(cards, { autoAlpha: 0, y: 0, visibility: "hidden" });
            gsap.set(cards[0], { autoAlpha: 1, y: 0, visibility: "visible" });
            gsap.set(cards.slice(1), {
                autoAlpha: 0,
                y: () => cardOffsetRef.current,
                visibility: "hidden",
            });

            if (lineRef.current) {
                gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top" });
            }

            const totalSegments = Math.max(1, steps.length - 1);
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${window.innerHeight * (steps.length - 1)}`,
                    scrub: 0.6,
                    pin: pinRef.current,
                    pinSpacing: false,
                    invalidateOnRefresh: true,
                },
            });

            if (titleRef.current) {
                tl.to(
                    titleRef.current,
                    { autoAlpha: 0, y: -20, duration: 0.25, ease: "power2.out" },
                    0.15
                );
            }

            for (let i = 0; i < totalSegments; i += 1) {
                const pos = i;
                if (lineRef.current) {
                    tl.to(
                        lineRef.current,
                        { scaleY: (i + 1) / totalSegments, duration: 1, ease: "none" },
                        pos
                    );
                }

                tl.to(
                    cards[i],
                    {
                        y: () => -cardOffsetRef.current,
                        autoAlpha: 0,
                        visibility: "hidden",
                        duration: 0.5,
                        ease: "power2.inOut",
                    },
                    pos + 0.2
                );

                tl.fromTo(
                    cards[i + 1],
                    {
                        y: () => cardOffsetRef.current,
                        autoAlpha: 0,
                        visibility: "visible",
                    },
                    {
                        y: 0,
                        autoAlpha: 1,
                        visibility: "visible",
                        duration: 0.5,
                        ease: "power2.out",
                    },
                    pos + 0.55
                );
            }

            updateLineBounds();

            return () => {
                tl.kill();
            };
        }, sectionRef);

        const handleResize = () => {
            updateLineBounds();
            ScrollTrigger.refresh();
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            ctx.revert();
        };
    }, []);

    return (
        <section
            id="metodo"
            ref={sectionRef}
            style={{ height: `${steps.length * 100}vh` }}
            className="relative"
        >
            <div ref={pinRef} className="relative h-screen overflow-visible">
                <div
                    ref={titleRef}
                    className="absolute inset-x-0 top-0 z-20 px-4 pt-10 md:pt-16 pb-6 text-center"
                >
                    <span className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-2 block">
                        Metodologia
                    </span>
                    <h2 className="font-condensed text-3xl md:text-5xl lg:text-6xl font-bold text-white uppercase">
                        Como Funciona
                    </h2>
                </div>

                <div className="absolute inset-0 flex items-center justify-center px-4">
                    <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
                        <div
                            className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 w-1 bg-white/5 z-0 rounded-full"
                            style={{ bottom: lineBottom }}
                        />
                        <div
                            ref={lineRef}
                            className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-600 z-10 rounded-full shadow-[0_0_45px_10px_rgba(59,130,246,0.6)] drop-shadow-[0_0_18px_rgba(59,130,246,0.9)] origin-top will-change-transform"
                            style={{ bottom: lineBottom }}
                        />

                        <div className="relative z-20 w-full max-w-2xl">
                            {steps.map((step, index) => (
                                <div
                                    key={step.step}
                                    ref={(el) => setCardRef(el, index)}
                                    className="absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none"
                                >
                                    <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md md:min-h-[220px] flex flex-col justify-between shadow-[0_20px_80px_-40px_rgba(0,0,0,0.6)]">
                                        <div className="flex items-center justify-between mb-6">
                                            <span className="text-5xl font-condensed font-bold text-white/10">
                                                {step.step}
                                            </span>
                                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-300">
                                                {step.icon}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-2xl font-bold uppercase mb-3 text-white">
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-300/80 leading-relaxed text-sm md:text-base">
                                                {step.desc}
                                            </p>
                                        </div>

                                        <div className="mt-6 flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-blue-300/70">
                                            <span>Etapa {step.step}</span>
                                            <span>
                                                {index + 1} / {steps.length}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
