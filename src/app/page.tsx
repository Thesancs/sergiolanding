"use client";

import ScrollMarqueeLogos from "@/components/ScrollMarqueeLogos";
import MethodologyScroll from "@/components/MethodologyScroll";
import DeliverablesSection from "@/components/DeliverablesSection";
import ResultsSection from "@/components/ResultsSection";
import TargetAudienceSection from "@/components/TargetAudienceSection";
import TeamSection from "@/components/TeamSection";
import PlansSection from "@/components/PlansSection";
import Button from "@/components/Button";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Users,
  Monitor,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Menu,
  X,
  Instagram
} from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILS ---
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// --- COMPONENTS ---

const Section = ({
  children,
  className,
  id
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <section id={id} className={cn("py-20 px-4 md:px-8 max-w-7xl mx-auto", className)}>
    {children}
  </section>
);

const GlassCard = ({
  children,
  className,
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className={cn(
      "glass-card p-8 rounded-3xl",
      className
    )}
  >
    {children}
  </motion.div>
);

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="text-center mb-16">
    {subtitle && (
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4 block"
      >
        {subtitle}
      </motion.span>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="font-condensed text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase"
    >
      {children}
    </motion.h2>
  </div>
);

const AccordionItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className={cn("text-xl font-medium transition-colors duration-300", isOpen ? "text-blue-400" : "text-white group-hover:text-blue-300")}>
          {question}
        </span>
        <div className={cn("p-2 rounded-full transition-all duration-300", isOpen ? "bg-blue-600/20 rotate-180" : "bg-white/5 group-hover:bg-white/10")}>
          <ChevronDown className={cn("w-5 h-5", isOpen ? "text-blue-400" : "text-gray-400")} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-300 leading-relaxed font-light">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- MAIN PAGE ---

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const parallaxRafRef = useRef<number | null>(null);
  const parallaxTargetRef = useRef({ x: 0, y: 0 });
  const parallaxCurrentRef = useRef({ x: 0, y: 0 });

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const whatsappUrl =
    "https://wa.me/5519992483385?text=Ol%C3%A1%20S%C3%A9rgio%2C%20tenho%20interesse%20na%20sua%20consultoria";
  const whatsappDoubtUrl =
    "https://wa.me/5519992483385?text=Ol%C3%A1%20S%C3%A9rgio%2C%20tenho%20uma%20duvida%20quanto%20a%20sua%20consultoria%21";

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const update = () => {
      const current = parallaxCurrentRef.current;
      const target = parallaxTargetRef.current;
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      heroEl.style.setProperty("--parallax-x", current.x.toFixed(4));
      heroEl.style.setProperty("--parallax-y", current.y.toFixed(4));
      parallaxRafRef.current = window.requestAnimationFrame(update);
    };

    update();

    return () => {
      if (parallaxRafRef.current) {
        window.cancelAnimationFrame(parallaxRafRef.current);
      }
    };
  }, []);

  const handleHeroMove = (event: React.MouseEvent<HTMLElement>) => {
    const heroEl = heroRef.current;
    if (!heroEl) {
      return;
    }
    const rect = heroEl.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    parallaxTargetRef.current = { x, y };
  };

  const handleHeroLeave = () => {
    parallaxTargetRef.current = { x: 0, y: 0 };
  };

  return (
    <div className="relative min-h-screen text-white font-sans overflow-x-hidden selection:bg-blue-500 selection:text-white">

      {/* Background Ambience */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4">
        <div className="max-w-7xl mx-auto glass rounded-full px-6 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Sergio Daniel Logo"
              width={180}
              height={50}
              className="h-12 w-auto object-contain"
              priority
            />
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium uppercase tracking-wider text-gray-300">
            <a href="#metodo" className="hover:text-white transition-colors">Como Funciona</a>
            <a href="#resultados" className="hover:text-white transition-colors">Resultados</a>
            <a href="#planos" className="hover:text-white transition-colors">Planos</a>
            <Button variant="primary" className="px-6 py-2 text-sm" href={whatsappUrl}>Começar Agora</Button>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-40 glass rounded-3xl p-6 md:hidden flex flex-col space-y-4"
          >
            <a href="#metodo" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium p-2">Como Funciona</a>
            <a href="#resultados" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium p-2">Resultados</a>
            <a href="#planos" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium p-2">Planos</a>
            <Button variant="primary" className="w-full" href={whatsappUrl}>Chamar no WhatsApp</Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMove}
        onMouseLeave={handleHeroLeave}
        style={{ "--parallax-x": 0, "--parallax-y": 0 } as React.CSSProperties}
        className="relative pt-28 md:pt-32 pb-12 min-h-screen flex items-center"
      >
        {/* Background Marquee - Wrapped to prevent page overflow but allow image overlap if needed */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute top-[28%] md:top-[30%] left-1/2 w-[140%] -rotate-12 opacity-30 mix-blend-overlay"
              style={{ transform: "translate(-50%, -50%) rotate(-12deg)" }}
            >
              <ScrollMarqueeLogos baseVelocity={10} logoCount={6} scrollInfluence={false} />
              <div className="my-8" />
              <ScrollMarqueeLogos baseVelocity={-10} logoCount={6} scrollInfluence={false} />
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

          {/* Left Content: Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-4 order-2 md:order-1 text-center md:text-left relative z-10 md:z-30 overflow-hidden md:overflow-visible"
          >
            {/* Shadow for Text Readability & Depth */}
            <div className="absolute top-1/2 left-1/2 md:left-[60%] -translate-x-1/2 -translate-y-1/2 hidden md:block w-[170%] h-[170%] bg-black/95 blur-[190px] -z-10 rounded-full pointer-events-none" />

            <div className="inline-block px-3 py-1 rounded-full glass border-blue-500/30 text-blue-300 font-bold tracking-widest text-[10px] uppercase mb-4">
              Consultoria Esportiva Premium
            </div>
            <h1 className="font-condensed text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9] uppercase mb-4 text-white">
              Transforme <br />
              <span className="text-white">Seu Corpo</span>
            </h1>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed border-l-2 border-blue-500 pl-4 max-w-xs mx-auto md:mx-0">
              Alcance sua melhor versão com acompanhamento personalizado, ciencia e estratégia.
            </p>

            <div className="mt-8 flex items-center justify-center md:justify-start space-x-3 text-xs text-gray-500">
              <div className="flex -space-x-2">
                {[
                  { src: "/aluno.webp", alt: "Aluno 1" },
                  { src: "/aluno2.webp", alt: "Aluno 2" },
                  { src: "/aluno3.webp", alt: "Aluno 3" },
                ].map((item) => (
                  <div
                    key={item.src}
                    className="w-6 h-6 rounded-full overflow-hidden border-2 border-slate-900 bg-slate-700"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p>+500 alunos transformados</p>
            </div>
          </motion.div>

          {/* Center Content: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="md:col-span-4 order-1 md:order-2 relative flex justify-center items-center"
          >
            <div className="relative w-full flex items-center justify-center">
              {/* Circle Background */}
              <div
                className="absolute top-1/2 left-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-white/5 opacity-50"
                style={{
                  transform:
                    "translate(-50%, -50%) translate3d(calc(var(--parallax-x) * 12px), calc(var(--parallax-y) * 10px), 0)",
                }}
              />
              <div
                className="absolute top-1/2 left-1/2 w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full border border-blue-500/10 opacity-60"
                style={{
                  transform:
                    "translate(-50%, -50%) translate3d(calc(var(--parallax-x) * 18px), calc(var(--parallax-y) * 14px), 0)",
                }}
              />

              <div className="relative z-10 w-full flex justify-center">
                <div style={{
                  maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                  transform:
                    "translate3d(calc(var(--parallax-x) * 16px), calc(var(--parallax-y) * 20px), 0)",
                }}>
                  <Image
                    src="/nova_foto.png"
                    alt="Sergio Daniel"
                    width={1800}
                    height={1800}
                    className="max-w-none h-[50vh] md:h-[85vh] w-auto object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content: CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-4 order-3 md:order-3 flex flex-col items-center md:items-end justify-end h-full gap-4 relative z-20 md:z-30"
          >
            <div className="text-right hidden md:block mb-4">
              <h3 className="text-white font-condensed font-bold text-xl uppercase">Comece Hoje</h3>
              <p className="text-gray-400 text-xs">Vagas limitadas para o próximo mês</p>
            </div>
            <Button href={whatsappUrl} className="group w-full md:w-auto shadow-blue-600/20">
              Chamar no WhatsApp
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" href="#metodo" className="w-full md:w-auto">
              Saiba Mais
            </Button>
          </motion.div>
        </div>
        <div
          className="pointer-events-none fixed inset-x-0 bottom-0 h-32 md:hidden z-40 backdrop-blur-3xl bg-gradient-to-t from-black/85 via-black/40 to-transparent [mask-image:linear-gradient(to_top,black,transparent)]"
        />
      </section>

      {/* Trust Bar */}
      <div className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4 opacity-70">
            {[
              { icon: <Award className="w-6 h-6 text-blue-500" />, text: "Atleta Profissional" },
              { icon: <Check className="w-6 h-6 text-blue-500" />, text: "Árbitro IFBB" },
              { icon: <Users className="w-6 h-6 text-blue-500" />, text: "Equipe Multidisciplinar" },
              { icon: <Monitor className="w-6 h-6 text-blue-500" />, text: "Online & Presencial" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3 group">
                <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  {item.icon}
                </div>
                <span className="text-sm md:text-base font-medium tracking-wide uppercase">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Target Audience */}
      <TargetAudienceSection SectionTitle={SectionTitle} />

      {/* Methodology */}
      {/* Methodology (Scroll Driven) */}
      <MethodologyScroll />
      {/* Deliverables */}
      <DeliverablesSection cta={<Button href={whatsappUrl}>Quero me inscrever</Button>} />
      {/* Testimonials */}
      <ResultsSection SectionTitle={SectionTitle} GlassCard={GlassCard} />
      <TeamSection />
      <PlansSection />

      {/* FAQ */}
      <Section className="max-w-3xl">
        <SectionTitle subtitle="DÃºvidas">Perguntas Frequentes</SectionTitle>
        <div className="glass p-8 rounded-3xl">
          {[
            { q: "Como funciona a consultoria online?", a: "Tudo é feito através do nosso aplicativo. Você recebe seu treino, dieta e tem acesso ao chat direto comigo para tirar dúvidas e enviar vídeos das execuções." },
            { q: "Tenho suporte para dúvidas?", a: "Sim! O suporte é direto comigo via WhatsApp. Você não falará com robôs." },
            { q: "Preciso de academia ou posso treinar em casa?", a: "Adapto o treino é  sua realidade. Se você treina em casa, montarei o treino com o que você tem disponí­vel." },
            { q: "A dieta está inclusa?", a: "Sim, trabalhamos com nutricionista esportivo parceiro para garantir que sua alimentação esteja alinhada ao treino." },
            { q: "Qual a forma de pagamento?", a: "Aceitamos PIX, cartão de crédito e boleto bancário." },
          ].map((item, idx) => (
            <AccordionItem
              key={idx}
              question={item.q}
              answer={item.a}
              isOpen={openFaq === idx}
              onClick={() => toggleFaq(idx)}
            />
          ))}
        </div>
      </Section>
      {/* Footer CTA */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto glass-card rounded-[3rem] p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 text-center flex flex-col items-center">
            <h2 className="font-condensed text-4xl md:text-5xl font-bold uppercase mb-4">
              Ficou alguma dúvida?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Entre em contato conosco
            </p>
            <Button
              className="px-10"
              onClick={() => window.open(whatsappDoubtUrl, '_blank')}
            >
              Entrar em contato
            </Button>
            <a
              href="https://www.instagram.com/sergiodanieltreinador/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center text-blue-400 hover:text-blue-300 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-gray-600 text-sm">
        <p>&copy; 2024 Sergio Daniel Consultoria. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}











