import Link from "next/link";
import Image from "next/image";

const links = [
  { name: "Acerca de nosotros", href: "/acerca" },
  { name: "Contacto", href: "/acerca" },
  { name: "UTec", href: "https://www.utectulancingo.edu.mx/" },
  { name: "Code challenge", href: "https://code-challenge-and-quiz.vercel.app/" },
];

export default function FooterPublic() {
  return (
    <footer className="bg-[#0f4c81] text-white p-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Sección del logo y descripción */}
        <div className="text-center md:text-left">
          <Image
            src="/icon.png"
            width={85}
            height={85}
            className="mb-4 rounded-full"
            alt="Logo de Kaanbal"
          />
          <p className="text-sm md:text-base leading-relaxed">
            <span className="font-semibold">Nuestra misión</span> es proporcionar una educación
            gratuita de primera clase en cualquier lugar.
          </p>
        </div>

        {/* Sección de enlaces */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-sm md:text-base text-center md:text-left">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              aria-label={`Ir a ${link.name}`}
              className="hover:underline"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
