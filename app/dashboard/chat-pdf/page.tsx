"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Trash2 } from "lucide-react";
import { obtenerConversaciones, obtenerIdUsuario } from "@/lib/utils";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { Conversaciones_IA, Usuarios } from "@prisma/client";

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
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [idUsuario, setIdUsuario] = useState<Usuarios | null>(null);
  const [conversaciones, setConversaciones] = useState<Conversaciones>([]);

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
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          setFileContent(reader.result);
        }
      };

      reader.readAsText(file); // O usa readAsArrayBuffer según tus necesidades
    }
  };


  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"], // Define que solo se acepten archivos PDF
    },
  });

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0f4c81]">Chat</h1>
        <Button
          className="w-full sm:w-auto bg-[#0f4c81] hover:bg-[#98bee0]"
          onClick={() => setIsUploading(!isUploading)}
        >
          Nueva Conversación
        </Button>
      </div>

      {/* Muestra el área de subir archivo si está activado */}
      {isUploading && (
        <div
          {...getRootProps()}
          className="border-dashed border-2 border-gray-400 p-6 text-center"
        >
          <input {...getInputProps()} />
          <p>Arrastra y suelta un archivo aquí, o haz clic para seleccionarlo</p>
        </div>
      )}

      {/* Muestra detalles del archivo subido
      {uploadedFile && (
        <div className="mt-4">
          <h3 className="font-bold">Archivo subido:</h3>
          <p>Nombre: {uploadedFile.name}</p>
          <pre className="bg-gray-100 p-4 overflow-x-auto">
            {fileContent || "Cargando contenido..."}
          </pre>
        </div>
      )} */}

      {/* Lista de conversaciones */}
      {conversaciones.length > 0 ? (
        <div className="space-y-4">
          {conversaciones.map((conversacion, index) => (
            <Card key={index}>
              <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <FileText size={24} />
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
        <p className="text-center text-gray-500">No hay conversaciones</p>
      )}
    </div>
  );
}
