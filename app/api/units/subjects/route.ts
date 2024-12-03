import { obtenerMateriasNivel } from "@/lib/utils";
import { Materias } from "@prisma/client";
import { NextResponse } from "next/server";

// Endpoint para obtener los datos de la materia
export async function GET(request: Request) {

    try {

        // Obtiene el nivel de la URL de busqueda
        const url  = new URL(request.url)
        const levelParam = url.searchParams.get('level')

        //Conviernte el id a número, asegurando de manejar el caso de que sea null
        const level = levelParam ? parseInt(levelParam, 10) : null

        // Validar tipo
        if (level === null || isNaN(level)) {
            throw new Error("El nivel proporcionado no es válido")
        }

        // Obtiene los niveles educativos
        const materias: Materias[] = await obtenerMateriasNivel(level)

        // Verificar la cantidad
        if (!materias) {
            return NextResponse.json(
                { message: "No se encontraron materias " },
                { status: 204}
            )
        }

        return NextResponse.json(materias)

    } catch (error) {

        return NextResponse.json(
            { message: "Ocurrió un error al obtener las materias" },
            { status: 500 }
        )
    }
}