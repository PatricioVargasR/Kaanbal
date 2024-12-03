import { obtenerTemasMateria } from "@/lib/utils";
import { Temas } from "@prisma/client";
import { NextResponse } from "next/server";

// Endpoint para obtener los datos  de los temas
export async function GET(request: Request) {

    try {

        // Obtiene el nivel de la URL de busqueda
        const url  = new URL(request.url)
        const subjectParam = url.searchParams.get('subject')

        //Conviernte el id a número, asegurando de manejar el caso de que sea null
        const subject = subjectParam ? parseInt(subjectParam, 10) : null

        // Validar tipo
        if (subject === null || isNaN(subject)) {
            throw new Error("El nivel proporcionado no es válido")
        }

        // Obtiene los niveles educativos
        const temas: Temas[] = await obtenerTemasMateria(subject)

        // Verificar la cantidad
        if (!temas) {
            return NextResponse.json(
                { message: "No se encontraron materias " },
                { status: 204}
            )
        }

        return NextResponse.json(temas)

    } catch (error) {

        return NextResponse.json(
            { message: "Ocurrió un error al obtener las materias" },
            { status: 500 }
        )
    }
}