export { default } from "next-auth/middleware"

// Configuración de rutas
export const config = {

    // Rutas protegidas
    matcher: [
        '/dashboard/:path*'
    ]
}