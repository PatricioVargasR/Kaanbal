import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2 } from 'lucide-react'

const messages = [
  { sender: "user", text: "Can you explain the concept of photosynthesis?" },
  { sender: "ai", text: "Photosynthesis is the process by which plants use sunlight, water and carbon dioxide to produce oxygen and energy in the form of sugar. It's a complex process that occurs in the chloroplasts of plant cells, particularly in the leaves." },
  { sender: "user", text: "What are the main steps of photosynthesis?" },
  { sender: "ai", text: "The main steps of photosynthesis are:\n1. Light Absorption\n2. Water Splitting\n3. Carbon Dioxide Fixation\n4. Sugar Formation" },
]

export default function ConversationPage() {
  return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#0f4c81]">Conversación: Reporte de Laboratorio de Química</h1>
          <Button variant="outline" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="h-[calc(100vh-200px)] overflow-y-auto">
            <CardHeader>
              <CardTitle>Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`p-2 rounded-lg ${message.sender === 'user' ? 'bg-[#98bee0] text-right' : 'bg-gray-100'}`}>
                    {message.text}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="h-[calc(100vh-200px)] overflow-y-auto">
            <CardHeader>
              <CardTitle>Documento</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Aquí es donde se mostraría el contenido de su documento. Puede seleccionar texto aquí para hacer preguntas sobre partes específicas del documento.</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex space-x-2">
          <Input placeholder="Ask a question..." className="flex-grow" />
          <Button className="bg-[#0f4c81] hover:bg-[#98bee0]">Enviar</Button>
        </div>
      </div>
  )
}