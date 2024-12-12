import { obtenerQuizz } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {

        // Obtiene el ID de la URL
        const url = new URL(request.url)
        const idParam = url.searchParams.get('id')

        // Convierte el id a número
        const id = idParam ? parseInt(idParam, 10) : null

        // Validar tipo
        if (id === null || isNaN(id)) {
            throw new Error("El ID proporcionado no es válido")
        }

        // Obtener quizz
        const quiz = await obtenerQuizz(id)

        // Verificar
        if (!quiz) {
            return NextResponse.json(
                { message: "No se encontraron datos" },
                { status: 204}
            )
        }

        return NextResponse.json(quiz)

    } catch(error) {
        return NextResponse.json(
            { message: "Ocurrió un error al obtener el documento" },
            { status: 500 }
        )
    }
}