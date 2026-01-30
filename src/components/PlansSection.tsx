"use client";

import React from "react";
import Button from "@/components/Button";

const plans = [
    {
        price: "R$297",
        label: "1 mês",
        href: "https://wa.me/5519992483385?text=Ol%C3%A1%20S%C3%A9rgio%2C%20tenho%20interesse%20na%20consultoria%20de%20R%24297",
    },
    {
        price: "R$397",
        label: "2 meses",
        href: "https://wa.me/5519992483385?text=Ol%C3%A1%20S%C3%A9rgio%2C%20tenho%20interesse%20na%20consultoria%20de%20R%24397",
    },
    {
        price: "R$497",
        label: "3 meses",
        href: "https://wa.me/5519992483385?text=Ol%C3%A1%20S%C3%A9rgio%2C%20tenho%20interesse%20na%20consultoria%20de%20R%24497",
    },
];

export default function PlansSection() {
    return (
        <section id="planos" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <span className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4 block">
                    Planos
                </span>
                <h2 className="font-condensed text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase">
                    Escolha seu plano
                </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <div
                        key={plan.label}
                        className="glass-card rounded-3xl p-8 text-center border border-white/10 hover:bg-white/5 transition-colors"
                    >
                        <div className="text-4xl font-bold text-white mb-2">
                            {plan.price}
                        </div>
                        <div className="text-blue-300 uppercase tracking-widest text-sm">
                            {plan.label}
                        </div>
                        <div className="mt-6 flex justify-center">
                            <Button href={plan.href} className="px-6 py-3 text-sm">
                                Escolher plano
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
