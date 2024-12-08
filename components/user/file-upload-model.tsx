import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileText, Upload, X } from 'lucide-react'

interface FileUploadModalProps {
  isOpen: boolean
  onClose: () => void
  file: File | null
  onUpload: () => void
  onCancel: () => void
}

export function FileUploadModal({ isOpen, onClose, file, onUpload, onCancel }: FileUploadModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmar subida de archivo</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3">
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="font-medium">{file?.name}</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
          <Button onClick={onUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Subir archivo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
