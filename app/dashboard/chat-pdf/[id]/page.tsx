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
import { useChat } from "ai/react"
import { toast } from "@/hooks/use-toast"
import DeleteConversationDialog from "@/components/user/DeleteConversationDialog"
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export default function ConversationPage() {

  // Obtener datos del chat
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  // Obtener ID de la ruta
  const [id, setId] = useState<string | null>(null)
  const [mensajes, setMensajes] = useState<any[]>([]); // Estado para almacenar los mensajes
  const [documento, setDocumento] = useState<any>(null); // Estado para almacenar el documento
  const [seleccionado, setSeleccionado] = useState<string>(""); // Estado para la selección de texto
  const [isDocumentOpen, setIsDocumentOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState<number | null>(null);
  const [page, setPage] = useState(1); // Página actual para la paginación
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Obtener el ID solo en el cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryString = window.location.href
      const extractedId = queryString.split('/')[5]
      setId(extractedId)
    }
  }, [])

  // Función para obtener los mensajes
  // Función para obtener los mensajes paginados
  async function obtenerMensajes(pagina = 1) {
    try {
      const response = await fetch(
        `/api/conversation/mensajes?id=${id}&page=${pagina}`,
        {
          method: "GET",
        }
      );
      const nuevosMensajes = await response.json();
      return nuevosMensajes;
    } catch (error) {
      console.error("Ocurrió un error: ", error);
      return [];
    }
  }

    // Cargar más mensajes
    const cargarMasMensajes = async () => {
      if (isLoadingMore) return; // Evitar múltiples cargas al mismo tiempo
      setIsLoadingMore(true);
    
      const nuevosMensajes = await obtenerMensajes(page + 1);
    
      setMensajes((prev) => {
        const mensajesUnicos = [
          ...prev,
          ...nuevosMensajes.filter(
            (mensaje: any) => !prev.some((m) => m.id === mensaje.id) // Filtrar duplicados
          ),
        ];
        return mensajesUnicos;
      });
    
      setPage((prev) => prev + 1);
      setIsLoadingMore(false);
    };

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

  const handleDeleteClick = (id_conversacion: number) => {
    setConversationToDelete(id_conversacion);
    setIsDeleteDialogOpen(true);
  };

  // Función para eliminar la conversación
  const handleDelete = async () => {
    if (!id) return;

    try {
      const res = await fetch(`/api/conversation/eliminar?id_conversacion=${conversationToDelete}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setIsDeleteDialogOpen(false);
        // Redirigir o actualizar estado para reflejar la eliminación
        toast({
          title: "Se eliminó correctamente",
          description: "Se ha eliminado la conversación.",
          variant: "default",
        });

        setTimeout(() => {
          // Redirigir a otra página o actualizar estado para eliminar la conversación de la UI
          window.location.href = "/dashboard/chat-pdf";  // Redirige a la página de dashboard
        }, 1000)
      } else {
        toast({
          title: "Error al eliminar",
          description: "Ocurrió un error, inténtalo de nuevo.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error fatal al eliminar",
        description: "No se pudo completar la solicitud, por favor intenta nuevamente.",
        variant: "destructive",
      });
    }
  };

    // Combinar mensajes de useChat con los mensajes de la base de datos
    const todosLosMensajes = [...mensajes, ...messages];

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 mb-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0f4c81] break-words">
          Conversación: {" "}
          {documento ? documento.nombre_archivo.split('.')[0] : 'Cargando...'}
        </h1>
        <div className="flex space-x-2">
          <Button
              variant="outline"
              size="icon"
              className="self-end sm:self-auto"
              onClick={() => handleDeleteClick(Number(id))}
            >
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
                {documento !== null ? (
                <iframe
                  src={`${documento?.contenido_pdf}`}
                  width="100%"
                  height="100%"
                  title={documento?.nombre_archivo}
                  onClick={manejarSeleccion}
                />

              ) : (
                <p className="text-center text-gray-500">Cargando...</p>
              ) }
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
            <div className="text-center mb-4">
              {mensajes.length > 10 && (
                <Button
                  variant="outline"
                  onClick={cargarMasMensajes}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? "Cargando..." : "Cargar más"}
                </Button>
              )}
            </div>
            <div className="space-y-4">
              {todosLosMensajes.map((m) => (
                <div
                  key={m.id}
                  className={`p-2 rounded-lg ${
                    m.role === "user" ? "bg-[#98bee0] text-right" : "bg-gray-100"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <ReactMarkdown
                      className="prose"
                      rehypePlugins={[rehypeHighlight, rehypeRaw]}
                      remarkPlugins={[remarkGfm]}
                    >
                      {m.content}
                    </ReactMarkdown>
                  ) : (
                    m.content
                  )}
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
            {documento !== null ? (
              <iframe
                src={`${documento?.contenido_pdf}`}
                width="100%"
                height="100%"
                title={documento?.nombre_archivo}
                onClick={manejarSeleccion}
              />

            ) : (
              <p className="text-center text-gray-500">Cargando...</p>
            ) }
          </CardContent>
        </Card>
      </div>

      <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Pregunta algo..."
          className="flex-grow"
          value={input}
          onChange={handleInputChange}
        />
        <Button className="bg-[#0f4c81] hover:bg-[#98bee0] w-full sm:w-auto">
          Enviar
        </Button>
      </form>

      <DeleteConversationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDelete}
      />
    </div>
  )
}
