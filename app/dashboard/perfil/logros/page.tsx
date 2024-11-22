import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { obtenerIdUsuario, obtenerSesion, obtenerUnUsuario, obtenreProgresoLogros } from "@/lib/utils"
import { Trophy, Star, Clock, Book, Target, Zap } from 'lucide-react'

export default async function AchievementsPage() {

  // Obtiene la sesión del usuario
  const sesion = await obtenerSesion()


  // Obtiene el id_usuario con base a su email
  const usuario = await obtenerUnUsuario(sesion?.user?.email?.toString())

  // Obtiene todos los logros
  const logros = await obtenreProgresoLogros(usuario?.id_usuario)

  // Obtiene el progreso de los logros
  const progreso = logros.flatMap((logros) => (
    logros.Progreso_logros.flatMap((progreso) => (
      progreso.progreso
    ))
  ))

  return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-[#0f4c81]">Logros</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {logros.map((logro, indice) => (
            <Card key={indice}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {/* <logro.icon className="h-6 w-6" /> */}
                  <span>{logro.nombre_logro}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{logro.descripcion}</p>
                <div className="flex justify-between mb-1">
                  <span>Progreso</span>
                  {logro.Progreso_logros.map((progreso, indice) => (
                      <span key={indice}>{progreso.progreso}%</span>
                    ))}
                </div>
                <Progress value={progreso[indice]} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
  )
}