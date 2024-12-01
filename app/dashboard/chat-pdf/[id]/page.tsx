"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import  Options from "@/components/user/options_conversation"


const messages = [
  { sender: "user", text: "Can you explain the concept of photosynthesis?" },
  { sender: "ai", text: "Photosynthesis is the process by which plants use sunlight, water and carbon dioxide to produce oxygen and energy in the form of sugar. It's a complex process that occurs in the chloroplasts of plant cells, particularly in the leaves." },
  { sender: "user", text: "What are the main steps of photosynthesis?" },
  { sender: "ai", text: "The main steps of photosynthesis are:\n1. Light Absorption\n2. Water Splitting\n3. Carbon Dioxide Fixation\n4. Sugar Formation" },
]

export default function ConversationPage() {

  // Obtener ID de la ruta
  const [id, setId] = useState<string | null>(null)
  const [mensajes, setMensajes] = useState<any[]>([]); // Estado para almacenar los mensajes
  const [documento, setDocumento] = useState<any>(null); // Estado para almacenar el documento

  // Obtener el ID solo en el cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryString = window.location.href
      const extractedId = queryString.split('/')[5]
      setId(extractedId)
    }
  }, [])


  // Función para obtener los mensajes
  async function obtenerMensajes() {

    // Realiza la solicitud
    try {
      const response = await fetch(`/api/conversation/mensajes?id=${id}`, {
        method: 'GET'
      })

      const mensajes = await response.json()

      return mensajes
    } catch (error) {
      console.error('Ocurrió un error: ', error)
    }
  }

  // Función para obtener el documento
  async function  obtenerDocumento() {

    // Realiza la solicitud
    try {
      const response = await fetch(`/api/conversation/documento?id=${id}`, {
        method: 'GET'
      })

      const documento = await response.json()

      return documento
    } catch (error) {
      console.error('Ocurrió un error: ', error)
    }

  }

  // Fetch data dynamically when the ID is available
  useEffect(() => {
    if (!id) return // Evita ejecutar si el ID aún no está disponible

    async function fetchData() {
      try {

        // Obtener los datos
        const mensajes = await obtenerMensajes()
        const documento = await obtenerDocumento()

        // Actualiza los estados con los datos obtenidos
        setMensajes(mensajes);
        setDocumento(documento);

      } catch (error) {
        console.error("Error al cargar los datos:", error)
      }
    }

    fetchData()
  }, [id])

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 mb-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0f4c81] break-words">
          Conversación: {" "}
          {documento ? documento.nombre_archivo.split('.')[0] : 'Nombre no disponible'}
        </h1>
        <Options />
      </div>

      <div className="flex flex-col md:flex-row gap-4 flex-grow overflow-hidden">
        <Card className="flex-1 overflow-hidden flex flex-col">
          <CardHeader className="bg-white z-10">
            <CardTitle>Chat</CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto flex-grow">
            <div className="space-y-4">
              {mensajes.map((mensaje, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg ${
                    mensaje.tipo === 'usuario'
                      ? 'bg-[#98bee0] text-right'
                      : 'bg-gray-100'
                  }`}
                >
                  {mensaje.contenido}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 overflow-hidden flex-col hidden md:flex">
          <CardHeader className="bg-white z-10">
            <CardTitle>Documento</CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto flex-grow">
            <p>Aquí es donde se mostraría el contenido de su documento. Puede seleccionar texto aquí para hacer preguntas sobre partes específicas del documento.</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
        <Input 
          placeholder="Ask a question..."
          className="flex-grow"
        />
        <Button className="bg-[#0f4c81] hover:bg-[#98bee0] w-full sm:w-auto">
          Enviar
        </Button>
      </div>
    </div>
  )
}

