import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { obtenerTodosCursos } from "@/lib/utils";
import { Cursos } from "@prisma/client";

const units = [
  { title: "Algebra Basics", subject: "Mathematics", progress: 75 },
  { title: "Chemical Reactions", subject: "Science", progress: 50 },
  { title: "Shakespeare's Plays", subject: "Literature", progress: 30 },
  { title: "World War II", subject: "History", progress: 90 },
  { title: "Spanish Verbs", subject: "Languages", progress: 60 },
]

export default async function LibraryPage() {
  const cursos = await obtenerTodosCursos();

  return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#0f4c81]">Library</h1>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="units">Units</SelectItem>
              <SelectItem value="folders">Folders</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex space-x-4">
          <Input type="search" placeholder="Search units..." className="max-w-sm" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
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