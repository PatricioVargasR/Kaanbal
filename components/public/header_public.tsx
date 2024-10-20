import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeaderPublic() {
    return(
        <header className="bg-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/placeholder.svg?height=40&width=40" alt="Kaanbal logo" className="h-10 w-10 mr-2" />
          <span className="text-[#0f4c81] font-bold text-xl">Kaanbal</span>
        </div>
        <nav className="space-x-4">
          <Link href="/" className="text-[#0f4c81] font-bold">Principal</Link>
          <Link href="/precios" className="text-[#0f4c81]">Precios</Link>
          <Link href="/acerca" className="text-[#0f4c81]">Nosotros</Link>
        </nav>
        <Button className="bg-[#0f4c81] text-white hover:bg-[#0f4c81]/90">Iniciar ahora</Button>
      </header>
    )
}