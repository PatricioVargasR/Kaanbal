import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"

// Función para manejar el registro
const handler =  NextAuth({

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