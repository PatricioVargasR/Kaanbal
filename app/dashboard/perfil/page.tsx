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
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Avatar className="w-20 h-20">
          {usuario?.avatar ? (
            <AvatarImage src={usuario.avatar.toString()} alt={`Imagen del usuario: ${usuario?.nombre}`} />
          ) : (
            <AvatarImage src={usuario?.imagen_usuario?.toString()} alt={`Imagen del usuario: ${usuario?.nombre}`}/>
          )}
          <AvatarFallback>{usuario?.nombre.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0f4c81]">{usuario?.nombre}</h1>
          <p className="text-sm text-muted-foreground">{usuario?.proveedor_auth}</p>
        </div>
        <Button variant="outline" className="w-full sm:w-auto mt-4 sm:mt-0">Cambiar icono</Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <CardTitle>Estadísticas</CardTitle>
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/dashboard/perfil/estadisticas">Ver más</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div key="Estadistica_usuario1" className="text-center">
              <p className="text-sm text-muted-foreground">Cursos completados</p>
              <p className="text-2xl font-bold">{cantidadCursos}</p>
            </div>
            <div key="Estadistica_usuario2" className="text-center">
              <p className="text-sm text-muted-foreground">Logros obtenidos</p>
              <p className="text-2xl font-bold">{logros.length}</p>
            </div>
            <div key="Estadistica_usuario3" className="text-center">
              <p className="text-sm text-muted-foreground">Total de preguntas</p>
              <p className="text-2xl font-bold">{cantidadPreguntas}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <CardTitle>Logros</CardTitle>
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/dashboard/perfil/logros">Ver más</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logros.slice(0, 3).map((logro, indice) => (
              <div key={indice}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{logro.nombre_logro}</span>
                  {logro.Progreso_logros.map((progreso, indice) => (
                    <span key={indice} className="text-sm">{progreso.progreso}%</span>
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