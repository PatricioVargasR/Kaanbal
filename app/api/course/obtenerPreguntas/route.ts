import { obtenerPreguntasCurso } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {

        // Obtener el ID de la url
        const url = new URL(request.url)
        const idParam = url.searchParams.get('id')

        // Parsear los datos
        const id = idParam ? parseInt(idParam, 10) : null

        // Verificar el tipo de dato
        if (id === null || isNaN(id)) {
            throw new Error("El ID no es válido")
        }

        // Obtener las preguntas
        const preguntas = await obtenerPreguntasCurso(id)

        // Verificar respuesta
        if (!preguntas) {
            return NextResponse.json(
                { message: "No se encontraron las preguntas" },
                { status: 204}
            )
        }

        return NextResponse.json(preguntas)

    } catch(error) {
        return NextResponse.json(
            { message: "Ocurrió un error al obtener el documento" },
            { status: 500 }
        )
    }
}