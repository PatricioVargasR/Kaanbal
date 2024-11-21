'use client'

import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { CardFooter } from "@/components/ui/card"
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useLoading } from './LoadingContext'

export default function SignUpButtons() {
    const { isLoading, setLoading} = useLoading()


    const handleSignIn = async (provider: 'github' | 'google') => {

        if (isLoading) return

        setLoading(true)

        try {
            await signIn(provider, {
                callbackUrl: '/dashboard',
                redirect: false
            })
        } catch (error) {
            console.error(`Ocurrió un error al iniciar sesión ${provider}:`, error)
        } finally {
            setLoading(false)
        }
    }
    return(
        <CardFooter className="flex flex-col space-y-4">
            <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSignIn('github')}
                disabled={isLoading}
                >
                    {isLoading ? (
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
                disabled={isLoading}
                >
                    {isLoading ? (
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
