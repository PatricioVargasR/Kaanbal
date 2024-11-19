'use client'

import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"

export default function SignInButtons() {
    return(
        <CardFooter className="flex flex-col space-y-4">
            <Button
                variant="outline"
                className="w-full"
                onClick={async () => {
                    await signIn("github", {
                        callbackUrl: "/dashboard",
                        redirect: false
                    });
                }}
                >
                Inicia sesión con Github
            </Button>
            <Button variant="outline" className="w-full">Inicia sesión con Google</Button>
            <p className="text-xs text-center text-gray-500">
            Al registrarte, aceptas nuestros Términos de Servicio y Política de Privacidad.
            </p>
      </CardFooter>

    )
}
