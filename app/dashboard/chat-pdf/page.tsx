"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Trash2, Upload } from "lucide-react";
import { obtenerConversaciones, obtenerIdUsuario } from "@/lib/utils";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { Conversaciones_IA, Usuarios } from "@prisma/client";
import { FileUploadModal } from "@/components/user/file-upload-model"

export default function UserNotesPage() {

  // Definimos el tipo Conversaciones
  type Conversaciones = {
    Notas: {
      usuario_id: number | null;
      id_nota: number;
      nombre_archivo: string;
      contenido_pdf: string;
      fecha_subida: Date | null;
    } | null;
    id_conversacion: number;
    nota_id: number | null;
    fecha_conversacion: Date | null;
  }[];

  // Estado para manejar el archivo subido y el contenido
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false); // Controla si se muestra el área de carga
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [idUsuario, setIdUsuario] = useState<Usuarios | null>(null);
  const [conversaciones, setConversaciones] = useState<Conversaciones>([]);
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Obtener el ID del usuario
  useEffect(() => {
    const fetchIdUsuario = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        if (res.ok) {
          setIdUsuario(data.id_usuario);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error obteniendo el ID del usuario:", error);
      }
    };

    fetchIdUsuario();
  }, []);

  // Obtener las conversaciones del usuario
  useEffect(() => {
    if (!idUsuario) return;

    const fetchConversaciones = async () => {
      try {
        const res = await fetch(`/api/conversations?id_usuario=${idUsuario}`);
        const data = await res.json();
        if (res.ok) {
          setConversaciones(data);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error obteniendo las conversaciones:", error);
      }
    };

    fetchConversaciones();
  }, [idUsuario]);

  // Configuración para subir archivo
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setUploadedFile(file)
      setIsModalOpen(true)
      const reader = new FileReader()

      reader.onload = () => {
        if (typeof reader.result === "string") {
          setFileContent(reader.result)
        }
      }

      reader.readAsText(file)
    }
  }

  const handleUpload = async () => {
    if (!uploadedFile || !idUsuario) return

    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append('idUsuario', idUsuario.toString());

    try {
      const res = await fetch("/api/pdf", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (res.ok) {
        alert("Archivo subido con éxito")
        setIsModalOpen(false)
        setUploadedFile(null)
        // Here you can update the conversations list
      } else {
        // console.error(data.error)
        alert("Error al subir el archivo")
      }
    } catch (error) {
      // console.error("Error al hacer la solicitud:", error)
      alert("Error al subir el archivo")
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
  })

  const handleNewConversation = () => {
    setIsUploading(true)
  }

  const handleCancelUpload = () => {
    setIsModalOpen(false)
    setUploadedFile(null)
  }


  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0f4c81]">Chat</h1>
        <Button
          className="w-full sm:w-auto bg-[#0f4c81] hover:bg-[#98bee0]"
          onClick={handleNewConversation}
        >
          Nueva Conversación
        </Button>
      </div>

      {isUploading && (
        <div
          {...getRootProps()}
          className="border-dashed border-2 border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">Arrastra y suelta un archivo PDF aquí, o haz clic para seleccionarlo</p>
        </div>
      )}

      <FileUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        file={uploadedFile}
        onUpload={handleUpload}
        onCancel={handleCancelUpload}
      />

      {/* Lista de conversaciones */}
      {conversaciones.length > 0 ? (
        <div className="space-y-4">
          {conversaciones.map((conversacion, index) => (
            <Card key={index}>
              <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <FileText size={24} className="text-[#0f4c81]" />
                  <div>
                    <h3 className="font-semibold">
                      {conversacion.Notas?.nombre_archivo.split(".")[0]}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Subido:{" "}
                      {conversacion.fecha_conversacion
                        ? new Date(conversacion.fecha_conversacion).toDateString()
                        : "Fecha no disponible"}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2 w-full sm:w-auto">
                  <Button variant="outline" className="flex-1 sm:flex-initial">
                    <Link href={`/dashboard/chat-pdf/${conversacion.id_conversacion}`}> Abrir </Link>
                  </Button>
                  <Button variant="outline" size="icon" className="flex-none">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Cargando...</p>
      )}
    </div>
  )
}

