import { obtenerIdUsuarioEmail, obtenerTodosCursos } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {

        // Obtener el ID de la URL
        const url = new URL(request.url)
        const user = url.searchParams.get('id')

        // Verificar el user
        if (user === null || user === undefined) {
            throw new Error("El usuaro no es válido")
        }

        // Obtener el id del usuario
        const id = await obtenerIdUsuarioEmail(user)

        // Obtener todos los cursos del usuario
        const cursos = await obtenerTodosCursos(id)

        // Verificar la respuesta
        if (!cursos) {
            return NextResponse.json(
                { message: "No se encontraron datos" },
                { status: 500 }
            )
        }

        return NextResponse.json(cursos)

    } catch(error) {

        return NextResponse.json(
            { message: "Ocurrió un error al obtener los datos" },
            { status: 500 }
        )
    }
}