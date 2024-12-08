import { eliminarConversacion } from "@/lib/utils";
import { NextResponse } from "next/server";

// Endpoint para eliminar una conversación con su documento
export async function DELETE(request: Request) {

    try {

        // Obtiene la id de la URL de busqueda
        const url = new URL(request.url)
        const idParam = url.searchParams.get('id_conversacion')

        // Convierte el id a número
        const id_conversacion = idParam ? parseInt(idParam, 10) : null;

        // Valida el tipo
        if ( id_conversacion === null || isNaN(id_conversacion) ){
            throw new Error("El ID proporcionado no es válido")
        }

        // Elimina la conversación correspondiente
        const conversacion_eliminada = await eliminarConversacion(id_conversacion)

        // Confirma que se haya eliminado correctamente
        if (conversacion_eliminada === null || conversacion_eliminada === undefined) {
            throw new Error("Falló al eliminar la conversación")
        }

        return NextResponse.json({ message: "Se eliminó correctamente la conversación"})

    } catch (error) {

        return NextResponse.json(
            { message: "Ocurrió un error al obtener el documento" },
            { status: 500 }
        )
    }
}