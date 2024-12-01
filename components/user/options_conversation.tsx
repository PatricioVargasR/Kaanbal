'use client'

import { Button } from "@/components/ui/button"
import { Trash2, FileText } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react'

export default function Options() {
  const [isDocumentOpen, setIsDocumentOpen] = useState(false)

    return(
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
    )
}