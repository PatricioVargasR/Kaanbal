import localFont from "next/font/local";
import type { Metadata } from "next";
import "../globals.css";
import Footer from "@/components/user/footer";
import Aside from "@/components/user/aside";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Últimas actividades'
  },
  description: "Sitio oficial de Kaanbal, tu plataforma de estudio favorito",
  generator: 'Next.js',
  applicationName: 'Kaanbal',
  keywords: ['Kaanbal', 'Estudio', 'IA'],
  authors: [
    { name: 'José Alonso', url: 'https://github.com/Alonso-Dominguez' },
    { name: 'Patricio de Jesús', url: 'https://github.com/PatricioVargasR' },
    { name: 'Jorge Alfonso', url: 'https://github.com/JorgeAlfonsoLDiaz' }
  ],
  creator: 'Patricio de Jesús',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <div className="flex min-h-screen bg-[#f3f3f3] text-[#434343]">
        <Aside />
        <div className="flex-1 flex flex-col">
            <main className="flex-1 p-8 pt-16 md:pt-8">
              {children}
            </main>
            <Footer />
          </div>
      </div>
      <Toaster />
    </body>
  </html>
  )
}