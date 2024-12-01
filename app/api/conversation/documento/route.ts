import { obtenerDocumento } from "@/lib/utils";
import { NextResponse } from "next/server";

// Ednpoint para obtener el documento
export async function GET(request: Request) {

    try {

        // Obitiene el id de la URL de busqueda
        const url = new URL(request.url)
        const idParam = url.searchParams.get('id')

        // Convierte el id a n+umero, asegurando de manear el caso de que sea null
        const id = idParam ? parseInt(idParam, 10) : null;

        // Validar tipo
        if (id === null || isNaN(id)) {
            throw new Error("El ID proporcionado no es válido")
        }

        const documento = await obtenerDocumento(id)

        if (!documento) {
            return NextResponse.json(
                { message: "No se encontró un documento " },
                { status: 204 }
            )
        }

        return NextResponse.json(documento)

    } catch (error) {

        return NextResponse.json(
            { message: "Ocurrió un error al obtener el documento" },
            { status: 500 }
        )
    }
    
}