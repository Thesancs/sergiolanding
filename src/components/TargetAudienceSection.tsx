"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { Activity, Award, Dumbbell, Star } from "lucide-react";

type TargetAudienceSectionProps = {
    SectionTitle: React.ComponentType<{ subtitle?: string; children: React.ReactNode }>;
};

const audiences = [
    {
        title: "Iniciantes",
        desc: "Quem busca começar do zero com segurança.",
        icon: <Star className="w-7 h-7" />,
    },
    {
        title: "Atletas",
        desc: "Para quem busca uma melhor perfomance e preparação",
        icon: <Award className="w-7 h-7" />,
    },
    {
        title: "Perda de Peso",
        desc: "Para você que busca emagrecer de maneira segura",
        icon: <Activity className="w-7 h-7" />,
    },
    {
        title: "Hipertrofia",
        desc: "Para você que busca ganhar massa muscular de maneira eficiente",
        icon: <Dumbbell className="w-7 h-7" />,
    },
];

const tvOnAnimation: Variants = {
    hidden: {
        opacity: 0,
        scaleY: 0.05,
        scaleX: 1.08,
        filter: "blur(10px)",
    },
    show: {
        opacity: 1,
        scaleY: [0.05, 1.05, 1],
        scaleX: [1.08, 1, 1],
        filter: ["blur(10px)", "blur(2px)", "blur(0px)"],
        transition: {
            duration: 0.65,
            times: [0, 0.7, 1],
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    },
};

export default function TargetAudienceSection({ SectionTitle }: TargetAudienceSectionProps) {
    return (
        <section id="para-quem" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <SectionTitle subtitle="Público Alvo">Para quem é a consultoria?</SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {audiences.map((item, idx) => (
                    <motion.div
                        key={item.title}
                        variants={tvOnAnimation}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                        className="glass-card p-8 rounded-3xl text-center group hover:bg-blue-900/20 cursor-default"
                        style={{ transformOrigin: "center" }}
                        transition={{ delay: idx * 0.08 }}
                    >
                        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-transform shadow-lg shadow-blue-500/20">
                            <span className="text-white w-8 h-8 flex justify-center items-center">
                                {item.icon}
                            </span>
                        </div>
                        <h3 className="text-2xl font-condensed font-bold uppercase mb-3">
                            {item.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
