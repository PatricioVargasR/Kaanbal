"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"
import { Cursos, Preguntas } from "@prisma/client"
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"

export default function CoursePage() {
  const router = useRouter()
  // Estados
  const [id, setId] = useState<string | null>(null)
  const [curso, setCurso] = useState<Cursos | null>(null);
  const [preguntas, setPreguntas] = useState<Preguntas[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [explicacion, setExplicacion] = useState<string | null>(null)
  const [isExplanationOpen, setIsExplanationOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Obtener el ID solo del curso
  useEffect(() => {
    if(typeof window !== "undefined") {
      const queryString = window.location.href
      const extractedId = queryString.split('/')[5]
      setId(extractedId)
    }
  }, [])

  // Función para obtener el documento
  async function obtenerCurso() {
    try {
      const response = await fetch(`/api/course/obtenerCurso?id=${id}`, {
        method: 'GET'
      })

      const documento = await response.json()
      return documento

    } catch(error) {
      console.error("Ocurrió un error")
    }
  }

  // Función para obtener las pregnuntas
  async function obtenerPreguntas() {
    try {
      const response = await fetch(`/api/course/obtenerPreguntas?id=${id}`, {
        method: 'GET'
      })

      const documento = await response.json()
      return documento

    } catch (error) {
      console.error("Ocurrió un error")
    }
  }

  // Función para obtener la explicación
  async function obtenerExplicacion() {
    try {
      const response = await fetch(`/api/course/obtenerExplicacion?id=${id}`, {
        method: 'GET'
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error al obtener la explicación")
    }
  }

  // Obtiene dinamicamente los datos del curso con base al id
  useEffect(() =>{
    if (!id) return

    // Obtener la función
    async function fetchData() {
      try {
        const curso = await obtenerCurso()
        const preguntas = await obtenerPreguntas()
        const explicacion = await obtenerExplicacion()
        setCurso(curso)
        setPreguntas(preguntas)
        setExplicacion(explicacion)

      } catch(error) {
        console.error("Error al cargar los datos")
      }
    }

    fetchData()
  }, [id])

  function filtroTipo(value: any) {
    return value.completada === true
  }

  const completadas = preguntas.filter(filtroTipo)

  // Funciones para navegar entre preguntas
  const goToNextQuestion = () => {
    if (currentQuestionIndex < preguntas.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  // Obtener la pregunta actual
  const currentQuestion = preguntas[currentQuestionIndex]

  // Función para iniciar el curso
  const iniciarCurso = () => {
    setIsLoading(true)
    window.location.href = `/dashboard/curso/${id}/pregunta`
  }

  // Función para calcular el promedio basado en preguntas completadas correctamente la primera vez
  const calcularPromedio = () => {
    if (completadas.length === 0) return 0

    const completadasPrimeraVez = completadas.filter(pregunta => pregunta.completada_primera_vez === true)
    const promedio = (completadasPrimeraVez.length / completadas.length) * 100

    return Math.round(promedio)
  }

  // Función para mostrar la explicación
  const showExplanation = async () => {
      setIsExplanationOpen(true)
    }

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0f4c81] break-words">
          {" "}
          {curso ? curso.nombre_curso : 'Cargando...'}
        </h1>
        <p className="text-sm sm:text-base mt-2">
          {" "}
          { curso ?
            `Progeso: ${completadas.length}/${curso?.cantidad_preguntas} ejercicios completados`
            : 'Cargando...'
          }
        </p>
        <Progress
          value={( completadas.length / preguntas.length) * 100}
          className="mt-2"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-sm sm:text-base">Total de preguntas</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0 sm:pt-2 text-lg sm:text-xl font-semibold">
            {" "}
            {curso ? curso?.cantidad_preguntas : 'Cargando...'}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-sm sm:text-base">Preguntas completadas</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0 sm:pt-2 text-lg sm:text-xl font-semibold">
            {" "}
            {curso ? completadas.length : 'Cargando...'}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-sm sm:text-base">Preguntas restantes</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0 sm:pt-2 text-lg sm:text-xl font-semibold">
            {" "}
            {curso ? preguntas.length - completadas.length : 'Cargando...'}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-sm sm:text-base">Promedio</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0 sm:pt-2 text-lg sm:text-xl font-semibold">
            {curso ? `${calcularPromedio()}%` : 'Cargando...'}
          </CardContent>
        </Card>
      </div>

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="p-6 bg-gray-50 border-b">
          <CardTitle className="text-xl font-semibold text-center text-[#0f4c81]">
            Pregunta {currentQuestionIndex + 1} de {preguntas.length}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-lg mb-8 text-center">
            {currentQuestion ? currentQuestion.pregunta : 'Cargando...'}
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button
              variant="outline"
              className="w-full sm:w-32"
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              ← Anterior
            </Button>
            <div className="flex-1 w-full sm:px-4">
              <Progress
                value={((currentQuestionIndex + 1) / preguntas.length) * 100}
                className="w-full"
              />
            </div>
            <Button
              variant="outline"
              className="w-full sm:w-32"
              onClick={goToNextQuestion}
              disabled={currentQuestionIndex === preguntas.length - 1}
            >
              Siguiente →
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-8 space-x-4">
        <Button
          onClick={iniciarCurso}
          disabled={isLoading}
          className="w-full sm:w-auto px-8 py-3 text-lg font-semibold bg-[#0f4c81] hover:bg-[#0d3d68] text-white"
        >
          {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando...
                </>
              ) : (
                "Iniciar curso"
						)}
        </Button>
        <Dialog open={isExplanationOpen} onOpenChange={setIsExplanationOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={showExplanation}
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-3 text-lg font-semibold bg-[#0f4c81] hover:bg-[#0d3d68] text-white rounded-md shadow-md transition-all"
            >
            {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mostrar explicación
                </>
              ) : (
                "Mostrar explicación"
						)}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#0f4c81] text-center">
                Explicación Detallada
              </DialogTitle>
              <DialogDescription className="mt-4 text-gray-700 text-sm sm:text-base leading-6">
                {explicacion ? (
                  explicacion
                ) : (
                  <span className="text-gray-400 italic">Cargando explicación...</span>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setIsExplanationOpen(false)}
                className="px-6 py-2 text-sm font-medium text-[#0f4c81] border border-[#0f4c81] hover:bg-gray-100 rounded-md transition"
              >
                Cerrar
              </Button>
            </div>
          </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}

