"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, FileText } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
export default function ConversationPage() {

  // Obtener ID de la ruta
  const [id, setId] = useState<string | null>(null)
  const [mensajes, setMensajes] = useState<any[]>([]); // Estado para almacenar los mensajes
  const [documento, setDocumento] = useState<any>(null); // Estado para almacenar el documento
  const [seleccionado, setSeleccionado] = useState<string>(""); // Estado para la selección de texto
  const [isDocumentOpen, setIsDocumentOpen] = useState(false)

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
  async function obtenerDocumento() {
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
    if (!id) return

    async function fetchData() {
      try {
        const mensajes = await obtenerMensajes()
        const documento = await obtenerDocumento()
        setMensajes(mensajes)
        setDocumento(documento)
      } catch (error) {
        console.error("Error al cargar los datos:", error)
      }
    }

    fetchData()
  }, [id])

  // TODO: Corregir función de manejar selección
  // Función para manejar la selección de texto en el documento
  const manejarSeleccion = () => {
    if (window.getSelection) {
      const textoSeleccionado = window.getSelection()?.toString();
      if (textoSeleccionado) {
        setSeleccionado(textoSeleccionado);
        const confirmar = window.confirm("¿Deseas enviar este texto a la IA?");
        if (confirmar) {
          // Puedes implementar el código para enviar el texto a la IA aquí
          console.log("Texto enviado a la IA:", textoSeleccionado);
        }
      }
    }
  }

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 mb-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0f4c81] break-words">
          Conversación: {" "}
          {documento ? documento.nombre_archivo.split('.')[0] : 'Cargando...'}
        </h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" className="self-end sm:self-auto">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Eliminar conversación</span>
          </Button>
          <Dialog open={isDocumentOpen} onOpenChange={setIsDocumentOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <FileText className="h-4 w-4" />
                <span className="sr-only">Ver documento</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Documento</DialogTitle>
              </DialogHeader>
              {/* TODO: Corregir modo movil del documento */}
              <div className="max-h-[60vh] overflow-y-auto">
                <iframe
                  src={`data:application/pdf;base64,${documento?.contenido_pdf}`}
                  width="100%"
                  height="600px"
                  title={documento?.nombre_archivo}
                  onClick={manejarSeleccion}
              />
              </div>
            </DialogContent>
          </Dialog>
      </div>
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
            <iframe
              src={`data:application/pdf;base64,${documento?.contenido_pdf}`}
              width="100%"
              height="600px"
              title={documento?.nombre_archivo}
              onClick={manejarSeleccion}
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
        <Input
          placeholder="Pregunta algo..."
          className="flex-grow"
          value={seleccionado}
          onChange={(e) => setSeleccionado(e.target.value)}
        />
        <Button className="bg-[#0f4c81] hover:bg-[#98bee0] w-full sm:w-auto">
          Enviar
        </Button>
      </div>
    </div>
  )
}
