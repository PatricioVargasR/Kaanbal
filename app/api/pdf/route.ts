import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { crearNuevaConversacion, crearNuevaNota } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    // Obtener el FormData de la petición
    const formData = await req.formData();
    
    // Obtener el archivo del FormData
    const file = formData.get('file') as File;
    const idUsuario = formData.get('idUsuario') as string;
    
    if (!file) {
      return NextResponse.json(
        { message: 'No se proporcionó ningún archivo' },
        { status: 400 }
      );
    }

    // Crear el nombre único del archivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = `${uniqueSuffix}-${file.name}`;
    
    // Convertir el archivo a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Definir la ruta donde se guardará el archivo
    const uploadDir = join(process.cwd(), 'public', 'pdfs');
    const filePath = join(uploadDir, fileName);

    // Guardar el archivo
    await writeFile(filePath, buffer);

    // Crear el objeto para la nueva nota
    const nuevaNota = {
      usuario_id: Number(idUsuario),
      nombre_archivo: file.name.replace(/\.[^/.]+$/, ''), // Quitar extensión
      contenido_pdf: `/pdfs/${fileName}` // Ruta relativa para acceso público
    };

    // Guardar la nota en la base de datos
    const confirmacionNota = await crearNuevaNota(nuevaNota);

    if (!confirmacionNota.id_nota) {
      throw new Error("Ocurrió un error al guardar la nota");
    }

    // Crear la conversación
    const confirmacionConversacion = await crearNuevaConversacion(confirmacionNota.id_nota);

    if (!confirmacionConversacion.id_conversacion) {
      throw new Error("Ocurrió un error al guardar la conversación");
    }

    return NextResponse.json(confirmacionConversacion);

  } catch (error) {
    console.error('Error al procesar el archivo:', error);
    return NextResponse.json(
      { message: `Ocurrió un error inesperado: ${error}` },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};