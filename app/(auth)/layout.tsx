import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Provider from "@/context/Provider";
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
    default: 'Inicia sesión'
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
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <Provider>
            {children}
          </Provider>
          <Toaster />
      </body>
    </html>
  )
}
