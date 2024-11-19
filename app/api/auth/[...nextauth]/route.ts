import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

// Función para manejar el registro
const handler =  NextAuth({

    // Define todos los proovedores
    providers: [

        // Proovedor de Github
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
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