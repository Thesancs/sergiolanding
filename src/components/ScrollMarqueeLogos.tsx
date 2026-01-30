"use client";

import React, { useRef, useEffect, useState } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for classes
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

function wrapValue(min: number, max: number, value: number) {
    const range = max - min;
    if (range === 0) {
        return min;
    }
    return ((((value - min) % range) + range) % range) + min;
}

interface ScrollMarqueeLogosProps {
    baseVelocity?: number;
    className?: string;
    logoCount?: number; // How many times to repeat the set visually to fill width
    scrollInfluence?: boolean;
}

export default function ScrollMarqueeLogos({
    baseVelocity = 3,
    className,
    logoCount = 4,
    scrollInfluence = true
}: ScrollMarqueeLogosProps) {
    const [setContentWidth, setSetContentWidth] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    // Transform velocity to a factor (-1 or 1 mostly) varies by speed
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const baseSpeed = Math.abs(baseVelocity);
    const directionFactor = useRef<number>(baseVelocity >= 0 ? 1 : -1);

    // Measure one set width for wrapping
    useEffect(() => {
        if (contentRef.current) {
            // We assume the first child is one "set" or we measure the total scrollWidth / duplicates
            // Let's adopt a logic where we render the content once ref-ed, measure it, then wrap based on that.
            // SImpler: Measure the width of the container holding *one* set of logos.
            setSetContentWidth(contentRef.current.offsetWidth);
        }
    }, []);

    // Recalculate on resize
    useEffect(() => {
        const handleResize = () => {
            if (contentRef.current) {
                setSetContentWidth(contentRef.current.offsetWidth);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseSpeed * (delta / 1000);

        /**
         * Scroll Interaction:
         * If user is scrolling down (positive velocity), we want to move right?
         * User said: "moves right when user goes down, left when goes up".
         * Down scroll -> positive velocityFactor. 
         */
        if (scrollInfluence) {
            if (velocityFactor.get() < 0) {
                directionFactor.current = -1; // Moving Left (scrolling up)
            } else if (velocityFactor.get() > 0) {
                directionFactor.current = 1; // Moving Right (scrolling down)
            }

            // Add scroll velocity influence
            moveBy += directionFactor.current * baseSpeed * velocityFactor.get();
        }

        // Increment X
        baseX.set(baseX.get() + moveBy);
    });

    // Dynamic transform
    const x = useTransform(baseX, (v) => {
        const wrapWidth = setContentWidth || 1000;
        return `${wrapValue(-wrapWidth, 0, v)}px`;
    });

    // Create sets of logos
    // We need enough copies to cover the screen width + buffer. 
    // If we wrap at 'setContentWidth', we need the total rendered width to be at least 2 * setContentWidth + screenWidth.
    // We'll render 4 copies to be safe.

    return (
        <div className={cn("overflow-hidden flex flex-nowrap py-4 user-select-none", className)}>
            <motion.div
                className="flex flex-nowrap items-center gap-16 md:gap-32 flex-shrink-0"
                style={{ x }}
            >
                {/* Render multiple sets. The first one is measured for 'wrapWidth'. */}
                {[...Array(logoCount)].map((_, i) => (
                    <div key={i} className="flex items-center gap-16 md:gap-32 shrink-0" ref={i === 0 ? contentRef : null}>
                        {/* LOGOS SET */}
                        <LogoItem />
                        <LogoItem />
                        <LogoItem />
                        <LogoItem />
                        <LogoItem />
                        <LogoItem />
                        <LogoItem />
                        <LogoItem />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

// Single Logo Component (Repeated)
function LogoItem() {
    return (
        <div className="relative flex items-center justify-center opacity-25 grayscale">
            <img
                src="/logo.svg"
                alt="Sergio Daniel Logo"
                className="h-16 md:h-24 w-auto object-contain brightness-200"
            />
        </div>
    );
}
