import { NextResponse } from "next/server";
import { obtenerUnUsuario, crearUnUsuario } from "@/lib/utils";
import { Usuarios } from "@prisma/client";

const bcrypt = require('bcrypt');

export async function POST(request: any) {
    try {
        const data: Usuarios = await request.json() ;

        const obtenerUsuario = await obtenerUnUsuario(data.email);

        if (obtenerUsuario) {
            return NextResponse.json(
                {
                    message: 'Email ya existe'
                },
                {
                    status: 400
                }
            );
        }

        const contrasenaHashed = await bcrypt.hash(data.contrasena, 10);

        data.contrasena = contrasenaHashed

        const nuevoUsuario = await crearUnUsuario(data);

        const { contrasena: _, ...usuario } = nuevoUsuario

        return NextResponse.json(usuario)

    } catch (error) {
        return NextResponse.json(
            { message: 'Ocurrió un error inesperado'},
            { status: 500 }
        )
    }
}