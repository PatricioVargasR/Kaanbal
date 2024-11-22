import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { obtenerIdUsuario, obtenerTodosCursos } from "@/lib/utils";
import { Cursos } from "@prisma/client";

const units = [
  { title: "Algebra Basica", subject: "Matematicas", progress: 75 },
  { title: "Reacciones Químicas", subject: "Ciencia", progress: 50 },
  { title: "Obras de Shakespeare", subject: "Literatura", progress: 30 },
  { title: "Segunda Guerra Mundial", subject: "Historia", progress: 90 },
  { title: "Verbos de Español", subject: "Languajes", progress: 60 },
]

export default async function LibraryPage() {

  // Obtiene el id_usuario de la sesión
  const id_usuario = await obtenerIdUsuario();

  // Obtiene todos los cursos del usuario
  const cursos = await obtenerTodosCursos(id_usuario);

  return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#0f4c81]">Biblioteca</h1>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ver" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="units">Unidades</SelectItem>
              <SelectItem value="folders">Carpetas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex space-x-4">
          <Input type="search" placeholder="Buscar Unidad..." className="max-w-sm" />
          <Select>
            <SelectTrigger className="w-[180px]">
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
                <CardTitle>{curso.nombre_curso}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Cantidad de preguntas: {curso.cantidad_preguntas}</p>
                {/* Convertir la fecha a cadena de texto */}
                <p>
                  Creado:{" "}
                  {curso.fecha_creacion ?
                    new Date(curso.fecha_creacion).toLocaleDateString() :
                    "Fecha no disponible"}
                </p>
              </CardContent>
            </Card>
          ))}
          </div>
        ) : (
          <p>No hay cursos</p>
        )}
      </div>
  )
}