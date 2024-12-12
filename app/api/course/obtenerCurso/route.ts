import { obtenerCurso } from "@/lib/utils";
import { NextResponse } from "next/server";


export async function GET(request: Request) {

    try {

        // Obtiene el id de la URL de búsqueda
        const url = new URL (request.url)
        const idParam = url.searchParams.get("id")

        // Convierte el id a número
        const id = idParam ? parseInt(idParam, 10) : null

        // Validar tipo
        if (id === null || isNaN(id)) {
            throw new Error("El ID proporcionado no es válido")
        }

        // Obtiene el curso
        const curso = await obtenerCurso(id)

        // Verificar curso
        if(!curso) {
            return NextResponse.json(
                { message: "No se encontró un documento" },
                { status: 204 }
            )
        }

        return NextResponse.json(curso)

    } catch (error) {
        return NextResponse.json(
            { message: "Ocurrió un error al obtener el documento"},
            { status: 500 }
        )
    }
}