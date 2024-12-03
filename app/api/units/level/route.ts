import { obtenerNivelesEducativos } from "@/lib/utils";
import { Nivel_educativo } from "@prisma/client";
import { NextResponse } from "next/server";

// Endpoint para obtener los datos del nivel educativo
export async function GET(request: Request) {

    try {

        // Obtiene los niveles educativos
        const niveles: Nivel_educativo[] = await obtenerNivelesEducativos()

        // Verificar la cantidad
        if (!niveles) {
            return NextResponse.json(
                { message: "No se encontraron niveles educativos " },
                { status: 204}
            )
        }

        return NextResponse.json(niveles)

    } catch (error) {

        return NextResponse.json(
            { message: "Ocurrió un error al obtener el nivel educativo" },
            { status: 500 }
        )
    }
}