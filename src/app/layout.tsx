import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sergio Daniel | Consultoria Esportiva & Personal Trainer",
  description: "Transforme seu corpo com a consultoria online e presencial de Sergio Daniel. Treinos personalizados, acompanhamento nutricional e resultados reais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="antialiased overflow-x-hidden selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
