"use client";

import React from "react";
import Image from "next/image";

const members = [
    {
        name: "Sergio Daniel",
        role: "Coach",
        image: "/sergio.webp",
    },
    {
        name: "Ana Claúdia",
        role: "Nutricionista",
        image: "/Ana.webp",
    },
];

export default function TeamSection() {
    return (
        <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="font-condensed text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white">
                    Team{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                        Sergio Daniel
                    </span>
                </h2>
                <p className="text-gray-300 mt-4">
                    Conheça a equipe que fará você transformar o seu shape!
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                {members.map((member) => (
                    <div key={member.name} className="text-center">
                        <div className="mx-auto w-44 h-44 rounded-full p-[3px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 shadow-lg shadow-blue-500/30">
                            <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={176}
                                    height={176}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <h3 className="mt-6 text-2xl font-bold italic text-white">
                            {member.name}
                        </h3>
                        <span className="text-gray-300">{member.role}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
