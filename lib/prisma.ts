import { PrismaClient } from "@prisma/client"

// Crea una nueva instancia del cliente de Prisma
const prismaClientSingleton = () => {
    return new PrismaClient();
}

// Declaramos el tipo
declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Creamos una única instancia de Prisma
export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// Evitamos crear múltiples instancias en modo de desarrollo
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;