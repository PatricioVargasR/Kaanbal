'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

// Links del espacio público
const links = [
    { name: 'Principal', href: '/' },
    { name: 'Precios', href: '/precios' },
    { name: 'Acerca', href: '/acerca' },
  ]

export default function NavLinksPublic() {

    // Obtenemos el nombre de la ruta, es decir https://localhost/hola -> /hola
    const pathname = usePathname();

    return(
        <>
            {links.map((link) => {
                return (
                    <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(
                        'text-[#0f4c81]',
                        {
                        'font-bold': pathname == link.href
                        },
                    )}>{link.name}</Link>
                )
            })}
        </>
    )
}
