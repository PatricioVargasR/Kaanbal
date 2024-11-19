'use client'

import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function SignUpButtons() {
    const [isLoading, setIsLoading] = useState({
        github: false,
        google: false
    })

    const handleSignIn = async (provider: 'github' | 'google') => {

        if (isLoading.github || isLoading.google) return

        setIsLoading(prev => ({ ...prev, [provider]: true}))
        try {
            await signIn(provider, {
                callbackUrl: '/login',
                redirect: false
            })
        } catch (error) {
            console.error(`Ocurrió un error al iniciar sesión ${provider}:`, error)
        } finally {
            setIsLoading(prev => ({ ...prev, [provider]: false }))
        }
    }
    return(
        <CardFooter className="flex flex-col space-y-4">
            <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSignIn('github')}
                disabled={isLoading.github || isLoading.google}
                >
                    {isLoading.github ? (
                        <>
                            <Loader2 className='mr-2 h4 w-4 animate-spin' />
                            Registrandose e iniciando sesión...
                        </>
                    ) : (
                        'Registrate con Github'
                    )}
            </Button>
            <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSignIn('google')}
                disabled={isLoading.github || isLoading.google}
                >
                    {isLoading.google ? (
                        <>
                            <Loader2 className='mr-2 h4 w-4 animate-spin' />
                            Registrandose e iniciando sesión...
                        </>
                    ) : (
                        'Registrate con Google'
                    )}
            </Button>
            <p className="text-xs text-center text-gray-500">
            Al registrarte, aceptas nuestros Términos de Servicio y Política de Privacidad.
            </p>
      </CardFooter>

    )
}
