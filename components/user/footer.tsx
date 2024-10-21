import Link from "next/link"

export default function Footer() {
    return(
        <footer className="fixed bottom-0 w-full bg-white p-4 text-center text-sm">
        <Link href="/privacy" className="mx-2">Privacy Policy</Link>
        <Link href="/terms" className="mx-2">Terms</Link>
        <Link href="/about" className="mx-2">About</Link>
      </footer>
    )
}