import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { prisma } from "./prisma"
import { Cursos, Logros, Usuarios, Materias, Temas } from "@prisma/client"
import { getServerSession } from "next-auth";

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

// Función para obtener los cursos ordenados por fecha más reciente
export async function obtenerCursosRecientes(limite: number = 5) {
  try {
    const cursos = await prisma.cursos.findMany({
      orderBy: {
        fecha_creacion: 'desc',
      },
      take: limite, // Limita a los cursos más recientes
    });
    return cursos;
  } catch (error) {
    console.error("Error al obtener los cursos más recientes:", error);
    throw new Error("No se pudieron obtener los cursos más recientes.");
  }
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

// Función que obtiene todos los logros del usuario
export async function obtenreProgresoLogros(id_usuario: any) {

  // Obtiene todos los logros
  const logros = await prisma.logros.findMany({
    include: {
      Progreso_logros: {
        where: {
          usuario_id: id_usuario
        }
      }
    }
  })

  return logros
}

// Obtener cantidad de cursos de un usuario
export async function obtenerCantidadCursos(id_usuario: any) {

  // Obtener todos los cursos de un usuario
  const cursos: Cursos[] = await prisma.cursos.findMany({
    where: {
      usuario_id: id_usuario
    }
  })

  return cursos.length
}

// Obtener todos las preguntas de un curso
export async function obtenerCantidadPreguntas(id_usuario: any) {

  // Obtener todas las preguntas de los cursos
  const preguntas = await prisma.preguntas.findMany({
    include: {
      Cursos: {
        where: {
          usuario_id: id_usuario
        }
      }
    }
  })

  // Regresar la cantidad total
  return preguntas.length
}

// Función para obtener todas las materias
export async function obtenerTodasMaterias() {
  const materias: Materias[] = await prisma.materias.findMany();
  return materias;
}

// Función para obtener todos los temas
export async function obtenerTodosTemas() {
  const temas: Temas[] = await prisma.temas.findMany();
  return temas;
}

// Obtener todas las conversaciones de un usuario
export async function obtenerConversaciones(id_usuario: any) {
  // Obtiene las conversaciones
  const conversaciones = await prisma.conversaciones_IA.findMany({
    include: {
      Notas: {
        where: {
          usuario_id: id_usuario
        }
      }
    }
  })
  // Regresa las conversaciones
  return conversaciones
}

// Función para obtener los datos de una conversacion
export async function obtenerMensajesConversacion(id_conversacion: any) {
  // Obtiene los mensajes de la conversacion
  const mensajes = await prisma.mensajes_conversacion.findMany({
    where: {
      conversacion_id: id_conversacion
    }
  })
 return mensajes
}
// Función que obtiene el archivo pdf de la conversacion
export async function obtenerDocumento(conversacion_id: any) {
  // Obtener la conversacion correspondiente
  const conversacion = await prisma.conversaciones_IA.findUnique({
    where: {
      id_conversacion: conversacion_id
    }
  })
  // Obtener id de la nota correspondiente
  const nota_id = conversacion?.nota_id ?? undefined
  // Obtener el documento
  const documento = await prisma.notas.findUnique({
    where: {
      id_nota: nota_id
    }
  })
  return documento
}