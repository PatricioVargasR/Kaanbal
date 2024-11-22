import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { prisma } from "./prisma"
import { Cursos } from "@prisma/client"
import { getServerSession } from "next-auth";
import { Session } from "inspector/promises";

// Función para obtener la sesión
export async function obtenerSesion() {

    // Utilizando getServerSession obtiene la sesión iniciada
    const sesion = await getServerSession()
    return sesion;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Función para obtener todos los cursos
export async function obtenerTodosCursos(id_usuario: any) {

  // Obtiene todos los cursos de un usuario
  const cursos: Cursos[] = await prisma.cursos.findMany({
    where: {
      usuario_id: id_usuario
    }
  });

  return cursos
}

// Función para obtener un usuario
export async function obtenerUnUsuario(email?: string) {

  const usuario = await prisma.usuarios.findUnique({
    where: {
      email: email
    }
  })

  return usuario
}

// Función para agregar un usuario
export async function crearUnUsuario(data: any) {

  const nuevoUsuario = await prisma.usuarios.create({
    data: {
      nombre: data.nombre,
      email: data.email,
      contrasena: data.contrasena,
      imagen_usuario: data.imagen_usuario ? data.imagen_usuario : null,
      proveedor_auth: data.proveedor_auth ? data.proveedor_auth : 'credentials'
    }
  })

  return nuevoUsuario
};

// Función para extrear el id_usuario de la sesión
export async function obtenerIdUsuario() {

  // Obtener la sesión
  const sesion = await obtenerSesion()

  // Obtenemos el email del usuario de la sesión
  const email = sesion?.user?.email

  // Obtenemos el usuario en base al email
  const usuario = await obtenerUnUsuario(email?.toString())

  // Regresamos el id_usuario
  return usuario?.id_usuario
}