import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { obtenerCantidadCursos, obtenerCantidadPreguntas, obtenerSesion, obtenerUnUsuario, obtenreProgresoLogros } from "@/lib/utils"
import Link from "next/link"

export default async function ProfilePage() {

  // Obtiene la sesión del usuario
  const sesion = await obtenerSesion()

  // Obtiene el usuario
  const usuario = await obtenerUnUsuario(sesion?.user?.email?.toString())

  // Obtiene la cantidad de cursos
  const cantidadCursos = await obtenerCantidadCursos(usuario?.id_usuario)

  // Obtiene la cantidad de preguntas
  const cantidadPreguntas = await obtenerCantidadPreguntas(usuario?.id_usuario)

  // Obtiene los logros
  const logros = await obtenreProgresoLogros(usuario?.id_usuario)

  // Obtener los valores del progreso
  const progreso = logros.flatMap((logros) => (
    logros.Progreso_logros.flatMap((progreso) => (
      progreso.progreso
    ))
  ))


  return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            {usuario?.avatar ? (
              <AvatarImage src={usuario.avatar.toString()} alt={`Imagen del usuario: ${usuario?.nombre}`} />

            ) : (
              <AvatarImage src={usuario?.imagen_usuario?.toString()} alt={`Imagen del usuario: ${usuario?.nombre}`}/>
            )}
            <AvatarFallback>{usuario?.nombre.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-[#0f4c81]">{usuario?.nombre}</h1>
            <p>{usuario?.proveedor_auth}</p>
          </div>
          <Button variant="outline">Cambiar icono</Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Estadísticas</CardTitle>
            <Button variant="outline" asChild>
              <Link href="/dashboard/perfil/estadisticas">Ver más</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div key="Estadistica_usuario1"className="text-center">
                <p className="text-sm text-muted-foreground">Cursos completados</p>
                <p className="text-2xl font-bold">{cantidadCursos}</p>
              </div>

              <div key="Estadistica_usuario2"className="text-center">
                <p className="text-sm text-muted-foreground">Logros obtenidos</p>
                <p className="text-2xl font-bold">{logros.length}</p>
              </div>

              <div key="Estadistica_usuario3"className="text-center">
                <p className="text-sm text-muted-foreground">Total de preguntas</p>
                <p className="text-2xl font-bold">{cantidadPreguntas}</p>
              </div>
            </div>
        </CardContent>
      </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Logros</CardTitle>
            <Button variant="outline" asChild>
              <Link href="/dashboard/perfil/logros">Ver más</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {logros.slice(0, 3).map((logro, indice) => (
                <div key={indice}>
                  <div className="flex justify-between mb-1">
                    <span>{logro.nombre_logro}</span>
                    {logro.Progreso_logros.map((progreso, indice) => (
                      <span key={indice}>{progreso.progreso}%</span>
                    ))}
                  </div>
                  <Progress value={progreso[indice]} />
                </div>
              ))}
            </div>
        </CardContent>
      </Card>
      </div>
  )
}