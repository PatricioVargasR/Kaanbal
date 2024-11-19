'use client'

import { useState } from 'react'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import SignInButtons from '@/components/user/signInButtons'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

// TODO: Crear un estado global para manejar el inicio de sesión
export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      const res = await signIn('credentials', {
        email: data.email,
        contrasena: data.contrasena,
        redirect: false,
        callbackUrl: '/dashboard'
      })

      if (res?.error) {
        toast({
          title: 'Error al iniciar sesión',
          description: res.error || 'Credenciales incorrectas, inténtalo nuevamente.',
          variant: 'destructive',
        })
      } else if (res?.url) {

        window.location.href = res.url
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudo completar la solicitud, por favor intenta nuevamente.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f3f3]">
      <Link
        href="/"
        className="absolute top-4 left-4 text-[#0f4c81] flex items-center gap-2 hover:underline"
      >
        <ArrowLeft size={20} />
        <span>Volver</span>
      </Link>
      <Link href="/signup" className="absolute top-4 right-4 text-[#0f4c81] hover:underline">Registrate</Link>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-[#0f4c81]">
            Inicia sesión
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Correo"
                {...register('email', { required: { value: true , message: 'El correo es obligatorio.' }})}
                disabled={isLoading}
              />
              {errors.email && typeof errors.email.message === "string" && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              <Input
                type="password"
                placeholder="Contraseña"
                {...register('contrasena', { required: { value: true, message: 'La contraseña es obligatoria.' }})}
                disabled={isLoading}
              />
              {errors.contrasena && typeof errors.contrasena.message === "string" && <p className="text-red-500 text-sm">{errors.contrasena.message}</p>}
              <Button
                type="submit"
                className="w-full bg-[#0f4c81] hover:bg-[#98bee0] text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Inicia sesión'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <SignInButtons />
      </Card>
    </div>
  )
}