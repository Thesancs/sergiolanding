"use client";

import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "outline";
    className?: string;
    onClick?: () => void;
    href?: string;
};

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export default function Button({
    children,
    variant = "primary",
    className,
    onClick,
    href,
}: ButtonProps) {
    const baseStyles =
        "inline-flex items-center justify-center px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg shadow-lg cursor-pointer";
    const variants = {
        primary:
            "bg-blue-600 text-white hover:bg-blue-500 hover:shadow-blue-500/25 border border-transparent",
        secondary:
            "bg-white text-blue-900 hover:bg-gray-100 border border-transparent",
        outline:
            "bg-transparent border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm",
    };

    const Component = href ? motion.a : motion.button;
    const props = href
        ? { href, target: "_blank", rel: "noopener noreferrer" }
        : { onClick };

    return (
        // @ts-ignore
        <Component
            className={cn(baseStyles, variants[variant], className)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {children}
        </Component>
    );
}
