import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider  from "next-auth/providers/credentials";
import { obtenerUnUsuario } from "@/lib/utils";

const bcrypt = require('bcrypt');

// Función para manejar el registro
const handler = NextAuth({

    // Define todos los proovedores
    providers: [

        // Proveedor de Github
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }),

        // Proveedor de Google
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),

        // Proveedor de credenciales
        CredentialsProvider({
            name: 'Credentials',

            credentials: {
              email: { label: "Email", type: "text", placeholder: "Email" },
              contrasena: { label: "contraseña", type: "password", placeholder: "Contraseña" }
            },

            async authorize(credentials, req) {

                // Verificar que los datos estén presentes
                if (!credentials?.email || !credentials.contrasena) {
                    throw new Error('Email y contraseña son requeridos')
                }

                // Buscar el usuario por el email
                const usuarioEncontrado = await obtenerUnUsuario(credentials.email);

                // Verificar que exista
                if (!usuarioEncontrado) throw new Error('No se eoncotró el usaurio');

                // Verificar la contraseña
                const esContrasenaValida = await bcrypt.compare(credentials.contrasena, usuarioEncontrado.contrasena)

                // Si la contraseña es incorrecta, lanza un error
                if (!esContrasenaValida) throw new Error('Contraseña incorrecta')

                // Si el usuario y la contraseña son válidos
                return { id: usuarioEncontrado.id_usuario.toString(), email: usuarioEncontrado.email }

            }
        })
    ],

    // Define el tipo de sesión
    session: {
        strategy: "jwt",
    },

    // Redirige a la página roote después de cerrar sesión
    pages: {
        signIn: '/login',
    },

    // Carga el secret de nextjs
    secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST }