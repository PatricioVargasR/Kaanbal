import Image from "next/image"
import { Button } from "@/components/ui/button"
import NavLinksPublic from "@/components/public/nav_links_publics"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import Link from "next/link"

export function HeaderPublic() {
  return (
    <header className="bg-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Image
          src='/icon.png'
          // Medidas iniciales 40, 40
          width={85}
          height={85}
          // className="h-25 w-35 mr-2"
          className="mr-2"
          alt="Logo de Kaanbal"
        />
      </div>

      {/* Navegación en computadora o tablet  */}
      <nav className="hidden md:flex space-x-4">
        <NavLinksPublic />
      </nav>
      <Link href="/login" passHref>
        <Button className="hidden md:block bg-[#0f4c81] text-white hover:bg-[#0f4c81]/90">
          Iniciar ahora
        </Button>
      </Link>

      {/* Navegación en el télefono */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-8' w-8" />
            <span className="sr-only">Menú hamburguesa</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="hidden">Menú de navegación</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-4">
            <NavLinksPublic />
            <Link href="/login" passHref>
              <Button className="bg-[#0f4c81] text-white hover:bg-[#0f4c81]/90 w-full">
                Iniciar ahora
              </Button>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}