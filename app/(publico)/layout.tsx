import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { HeaderPublic } from "@/components/public/header_public";
import FooterPublic  from "@/components/public/footer_public";

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
    default: 'Principal'
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
        <div
          className="min-h-screen bg-[#f3f3f3] text-[#434343]"
        >
          <HeaderPublic />
            {children}
          <FooterPublic />
        </div>
      </body>
    </html>
  );
}
