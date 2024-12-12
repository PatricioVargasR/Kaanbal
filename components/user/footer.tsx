import Link from "next/link"

export default function Footer() {
    return(
      <footer className="bg-white p-4 text-center text-sm">
        <Link href="/dashboard/politica" className="mx-2">Política de privacidad</Link>
        <Link href="/dashboard/terminos" className="mx-2">Términos</Link>
        <Link href="/acerca" target="_blank" className="mx-2">Acerca</Link>
      </footer>
    )
}
