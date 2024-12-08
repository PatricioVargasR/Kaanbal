// pages/api/obtener-id-usuario.ts
import { NextApiRequest, NextApiResponse } from "next";
import { obtenerSesion, obtenerUnUsuario } from "@/lib/utils"; // Ajusta la ruta según tu proyecto
import { NextResponse } from "next/server";

export  async function GET(req: Request) {
  try {
    const sesion = await obtenerSesion(); // Obtener la sesión
    const email = sesion?.user?.email; // Email del usuario

    if (!email) {
        throw new Error("El email proporcionado no es válido")
    }

    const usuario = await obtenerUnUsuario(email.toString());

    if (!usuario) {
        return NextResponse.json(
            { message: "Usuario no encontrado"},
            { status: 404 }
        )
    }

    return NextResponse.json({id_usuario: usuario.id_usuario})
  } catch (error) {
        return NextResponse.json(
            { message: "Ocurrió un error inesperado"},
            { status: 500 }
        )
  }
}
