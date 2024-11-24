import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { obtenerIdUsuario, obtenerTodosCursos } from "@/lib/utils"
import { Cursos } from "@prisma/client"

export default async function LibraryPage() {
  // Obtiene el id_usuario de la sesión
  const id_usuario = await obtenerIdUsuario();

  // Obtiene todos los cursos del usuario
  const cursos = await obtenerTodosCursos(id_usuario);

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0f4c81]">Biblioteca</h1>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Ver" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="units">Unidades</SelectItem>
            <SelectItem value="folders">Carpetas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Input type="search" placeholder="Buscar Unidad..." className="w-full sm:max-w-sm" />
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtro" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recientes</SelectItem>
            <SelectItem value="progress">En progreso</SelectItem>
            <SelectItem value="completed">Completado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {cursos.length > 0 ? (
        <div className="space-y-4">
          {cursos.map((curso, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">{curso.nombre_curso}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base">Cantidad de preguntas: {curso.cantidad_preguntas}</p>
                <p className="text-sm sm:text-base">
                  Creado:{" "}
                  {curso.fecha_creacion
                    ? new Date(curso.fecha_creacion).toLocaleDateString()
                    : "Fecha no disponible"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No hay cursos</p>
      )}
    </div>
  )
}

