import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu } from 'lucide-react'
import NavLinks from "@/components/user/nav_links";

export default function Aside() {
    return(
      <>
        <aside className="w-64 bg-white p-4 hidden md:block">
            <NavLinks />
        </aside>
        <Sheet>
            <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-40">
                <Menu className="h-4 w-4" />
            </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle className="hidden">Menú de navegación</SheetTitle>
              </SheetHeader>
              <NavLinks />
            </SheetContent>
        </Sheet>
      </>
    )
}