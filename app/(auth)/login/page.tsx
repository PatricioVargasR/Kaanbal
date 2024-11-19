import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Registrate'
}

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f3f3]">
      <Link
        href="/"
        className="absolute top-4 left-4 text-[#0f4c81] flex items-center gap-2 hover:underline"
      >
        <ArrowLeft size={20}>
        </ArrowLeft>
          <span>Volver</span>
      </Link>
      <Link href="/signup" className="absolute top-4 right-4 text-[#0f4c81] hover:underline">Registrate</Link>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-[#0f4c81]">Inicia sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <Input type="email" placeholder="Correo" />
              <Input type="password" placeholder="Contraseña" />
              <Button className="w-full bg-[#0f4c81] hover:bg-[#98bee0]">Inicia sesión</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button variant="outline" className="w-full">Inicia sesión con Google</Button>
          <Button variant="outline" className="w-full">Inicia sesión con GitHub</Button>
          <p className="text-xs text-center text-gray-500">
            Al registrarte, aceptas nuestros Términos de Servicio y Política de Privacidad.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}