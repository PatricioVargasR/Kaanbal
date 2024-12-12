import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { obtenerTodasMaterias, obtenerTodosTemas, obtenerCursosRecientes, obtenerSesion, obtenerIdUsuario } from "@/lib/utils";

export default async function LearningPage() {

  // Obtener id del usuario
  const id = await obtenerIdUsuario()

  // Obtener datos de la página
  const materias = await obtenerTodasMaterias();
  const temas = await obtenerTodosTemas();
  const cursos = await obtenerCursosRecientes(5, id);
  const emojis = ["📘", "📗", "📕", "📙", "📔", "📒", "📚", "📝", "✏️", "📓"]; // Lista de emojis

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8 py-6">
      {/* Actividades Recientes */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0f4c81]">
          Actividades Recientes
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {cursos && cursos.length > 0 ? (
            cursos.map((curso, index) => (
              <Link href={`/dashboard/curso/${curso.id_curso}`} key={index}>
                <Card className="shadow-md rounded-lg border border-gray-300 transition-transform duration-300 transform hover:scale-[1.03] hover:shadow-lg hover:shadow-gray-400">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">
                      {curso.nombre_curso || "Sin título"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm sm:text-base text-gray-600">
                      {curso.fecha_creacion
                        ? new Date(curso.fecha_creacion).toLocaleDateString()
                        : "Fecha no disponible"}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <p>No hay actividades recientes disponibles.</p>
          )}
        </div>
      </section>

      {/* Nuevas funciones */}
      <section className="bg-[#c4d8e9] p-4 rounded-lg md:text-left sm:text-center">
        <h2 className="text-xl font-bold mb-2">Crea tus cursos con esta funcionalidad</h2>
        <p className="mb-4">¡Genera tus cursos de manera automatica con IA!</p>
        <Button className="w-full sm:w-auto bg-[#0f4c81] hover:bg-[#98bee0]">
          <Link href="/dashboard/crear-curso">
            Generar
          </Link>
        </Button>
      </section>

      {/* Materias */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0f4c81]">Materias</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {materias && materias.length > 0 ? (
            materias.map((materia, index) => (
              <Link href={`/materia/${materia.nombre_materia}`} key={index}>
                <Card className="shadow-md rounded-lg border border-gray-300 transition-transform duration-300 transform hover:scale-[1.03] hover:shadow-lg hover:shadow-gray-400">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">{materia.nombre_materia}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))
          ) : (
            <p>No hay materias disponibles</p>
          )}
        </div>
      </section>

      {/* Temas Populares */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0f4c81]">Temas Populares</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {temas && temas.length > 0 ? (
            temas.map((tema, index) => (
              <Link href={`/tema/${tema.nombre_tema}`} key={index}>
                <Card className="flex flex-col items-center justify-center p-4 shadow-md rounded-lg border border-gray-300 transition-transform duration-300 transform hover:scale-[1.03] hover:shadow-lg hover:shadow-gray-400">
                  <CardHeader>
                    <CardTitle className="text-3xl sm:text-4xl">
                      {emojis[index % emojis.length]} {/* Asigna el emoji de forma cíclica */}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-sm sm:text-base">{tema.nombre_tema}</p>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <p>No hay temas disponibles</p>
          )}
        </div>
      </section>
    </div>
  );
}
