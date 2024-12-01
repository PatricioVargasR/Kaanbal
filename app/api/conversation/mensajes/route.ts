import { obtenerMensajesConversacion } from "@/lib/utils";
import { NextResponse } from "next/server";

// Endpoint para devolver los mensajes
export async function GET(request: Request) {
    try {

        // Obtiene el id de la URL de busqueda
        const url = new URL(request.url)
        const idParam = url.searchParams.get('id')

        // Convierte el id a número, asegurándote de manejar el caso null
        const id = idParam ? parseInt(idParam, 10) : null;

        // Validar tipo
        if (id === null || isNaN(id)) {
        throw new Error("El ID proporcionado no es válido.");
        }

        const mensajes = await obtenerMensajesConversacion(id);

        if (!mensajes) {
            return NextResponse.json(
                { message: "No se encontraron mensajes " },
                { status: 204 }
            )
        }

        return NextResponse.json(mensajes)

    } catch (error) {
        return NextResponse.json(
            { message: "Ocurrió un error al obtener los mensajes" },
            { status: 500 }
        )
    } 
}