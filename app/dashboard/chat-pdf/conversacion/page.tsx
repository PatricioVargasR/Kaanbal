"use client"

import { useState } from "react"
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

const messages = [
  { sender: "user", text: "Can you explain the concept of photosynthesis?" },
  { sender: "ai", text: "Photosynthesis is the process by which plants use sunlight, water and carbon dioxide to produce oxygen and energy in the form of sugar. It's a complex process that occurs in the chloroplasts of plant cells, particularly in the leaves." },
  { sender: "user", text: "What are the main steps of photosynthesis?" },
  { sender: "ai", text: "The main steps of photosynthesis are:\n1. Light Absorption\n2. Water Splitting\n3. Carbon Dioxide Fixation\n4. Sugar Formation" },
]

export default function ConversationPage() {
  const [isDocumentOpen, setIsDocumentOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 mb-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0f4c81] break-words">
          Conversación: Reporte de Laboratorio de Química
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
              <div className="max-h-[60vh] overflow-y-auto">
                <p>Aquí es donde se mostraría el contenido de su documento. Puede seleccionar texto aquí para hacer preguntas sobre partes específicas del documento.</p>
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
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`p-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-[#98bee0] text-right' 
                      : 'bg-gray-100'
                  }`}
                >
                  {message.text}
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

