import Link from "next/link"; // Importar el componente Link
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  obtenerTodasMaterias,
  obtenerTodosTemas,
  obtenerCursosRecientes,
} from "@/lib/utils";

  export default async function LearningPage() {
    const materias = await obtenerTodasMaterias();
    const temas = await obtenerTodosTemas();
    const cursos = await obtenerCursosRecientes();
  
    return (
      <div className="min-h-screen bg-gray-100 space-y-8 px-4 sm:px-6 lg:px-8">
        {/* Actividades recientes */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0f4c81]">
            Actividades Recientes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cursos && cursos.length > 0 ? (
              cursos.map((curso, index) => (
                <Link href={`/curso/${curso.nombre_curso}`} key={index}> {/*Link con ruta del curso por su id*/}
                  <Card
                    className="shadow-lg shadow-red-300 rounded-lg border border-red-300 hover:scale-105 transition-transform duration-300"
                  >
                    <CardHeader>
                      <CardTitle>{curso.nombre_curso || "Sin título"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
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
  
        {/* Materias */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0f4c81]">
            Materias
          </h2>
          {materias.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {materias.map((materia, index) => (
                <Link href={`/materia/${materia.nombre_materia}`} key={index}> {/*Link con ruta de la materia por su id*/}
                  <Card
                    className="shadow-lg shadow-red-300 rounded-lg border border-red-300 hover:scale-105 transition-transform duration-300"
                  >
                    <CardHeader>
                      <CardTitle>{materia.nombre_materia}</CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p>No hay materias disponibles</p>
          )}
        </section>
  
        {/* Temas */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0f4c81]">
            Temas
          </h2>
          {temas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {temas.map((tema, index) => (
                <Link href={`/tema/${tema.nombre_tema}`} key={index}> {/*Link con ruta del tema por su id*/}
                  <Card
                    className="shadow-lg shadow-red-300 rounded-lg border border-red-300 hover:scale-105 transition-transform duration-300"
                  >
                    <CardHeader>
                      <CardTitle>{tema.nombre_tema}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Materia asociada: {tema.materia_id || "No disponible"}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p>No hay temas disponibles</p>
          )}
        </section>
  
        {/* Nuevas funciones */}
        <section className="bg-[#c4d8e9] p-4 rounded-lg text-center md:text-left">
          <h2 className="text-xl font-bold mb-2">Nuevas funciones</h2>
          <p>¡Prueba nuestra nueva asistente de estudios impulsada por IA!</p>
          <Button className="mt-2 bg-[#0f4c81] hover:bg-[#98bee0]">Saber más</Button>
        </section>
      </div>
    );
  }
  
