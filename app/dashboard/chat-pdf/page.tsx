import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Trash2 } from 'lucide-react'
import { obtenerConversaciones, obtenerIdUsuario } from "@/lib/utils"

const conversations = [
  { title: "Tarea de Matemáticas", pages: 3, size: "1.2 MB" },
  { title: "Historia Fácil", pages: 5, size: "2.1 MB" },
  { title: "Reporte de Laboratorio de Química", pages: 7, size: "3.5 MB" },
]

export  default async function UserNotesPage() {

  //Obtiene el id del uusario
  const id_usuario = await obtenerIdUsuario()

  // Obtiene las notas/conversaciones del usuario
  const conversaciones = await obtenerConversaciones(id_usuario);

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0f4c81]">Chat</h1>
        <Button className="w-full sm:w-auto bg-[#0f4c81] hover:bg-[#98bee0]">
          Nueva Conversación
        </Button>
      </div>

      {conversaciones.length > 0 ? (
      <div className="space-y-4">
        {conversaciones.map((conversacion, index) => (
          <Card key={index}>
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <FileText size={24} />
                <div>
                  <h3 className="font-semibold">{conversacion.Notas?.nombre_archivo}</h3>
                  <p className="text-sm text-gray-500">
                    Subido: {" "}
                    {conversacion.fecha_conversacion
                      ? new Date(conversacion.fecha_conversacion).toDateString()
                      : "Fecha no disponible"
                    }
                  </p>
                </div>
              </div>
              <div className="flex space-x-2 w-full sm:w-auto">
                <Button variant="outline" className="flex-1 sm:flex-initial">Abrir</Button>
                <Button variant="outline" size="icon" className="flex-none">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      ) : (
        <p className="text-center text-gray-500">No hay conversaciones</p>
      )}

    </div>
  )
}

