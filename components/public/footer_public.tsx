import Link from "next/link"
import Image from "next/image"

const links = [
  { name: "Acerca de nosotros", href: "/acerca" },
  { name: "Contacto", href: "/acerca" },
  { name: "UTec", href: "https://www.utectulancingo.edu.mx/" },
  { name: "Code challange", href: "https://code-challenge-and-quiz.vercel.app/" }
]


export default function FooterPublic() {
    return(
        <footer className="bg-[#0f4c81] text-white p-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Image
              src="/icon.png"
              width={85}
              height={85}
              className="mb-2"
              alt="Logo de Kaanbal"
            />
            {/* <img src="/placeholder.svg?height=40&width=40" alt="Kaanbal logo" className="h-10 w-10 mb-2" /> */}
            <p>Nuestra misión es proporcionar una educación gratuita de primera clase en cualquier lugar.</p>
          </div>
          <div className="flex space-x-4">
            {links.map((link) => {
                  return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={"hover:underline"}
                      >
                        {link.name}
                      </Link>
                  )
              })}
          </div>
        </div>
      </footer>
    )
}