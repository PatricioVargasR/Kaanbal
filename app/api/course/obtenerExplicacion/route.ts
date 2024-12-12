import { obtenerExplicacionCurso } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {

        // Obtener el ID de la URL
        const url = new URL(request.url)
        const idParam = url.searchParams.get('id')

        // Verificar su tipo
        const id = idParam ? parseInt(idParam, 10) : null

        // Verficar valor
        if (id === null || isNaN(id)) {
            throw new Error("El ID no es válido")
        }

        // Obtener la explicación
        const explicacion = await obtenerExplicacionCurso(id)

        // Verificar
        if (!explicacion) {
            return NextResponse.json(
                { message: "No se encontró el documento" },
                { status: 204}
            )
        }

        return NextResponse.json(explicacion)

    } catch(error) {
        return NextResponse.json(
            { message: "Ocurrió un error" },
            { status: 500 }
        )
    }
}