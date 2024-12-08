// pages/api/obtener-conversaciones.ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma"; // Ajusta la ruta según tu configuración
import { NextResponse } from "next/server";

export  async function GET(request: Request) {

  try {

    // Obtiene el id de la URL de busqueda
    const url = new URL(request.url)
    const idParam = url.searchParams.get('id_usuario')


    if (!idParam) {
      throw new Error("El id proporcionado no es válido")
    }

    const conversaciones = await prisma.conversaciones_IA.findMany({
      include: {
        Notas: {
          where: {
            usuario_id: Number(idParam), // Asegúrate de convertirlo si es necesario
          },
        },
      },
    });

    return NextResponse.json(conversaciones)
  } catch (error) {
    return NextResponse.json(
        { message: "Ocurrió un error inesperado"},
        { status: 500 }
    )
  }
}
