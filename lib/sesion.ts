import { getServerSession } from "next-auth";

// Función para obtener la sesión
export async function obtenerSesion() {

    // Utilizando getServerSession obtiene la sesión iniciada
    const sesion = await getServerSession()
    return sesion;
}