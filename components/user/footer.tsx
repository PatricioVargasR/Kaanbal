import Link from "next/link"

export default function Footer() {
    return(
      <footer className="bg-white p-4 text-center text-sm">
        <Link href="/privacy" className="mx-2">Política de privacidad</Link>
        <Link href="/terms" className="mx-2">Términos</Link>
        <Link href="/about" className="mx-2">Acerca</Link>
      </footer>
    )
}