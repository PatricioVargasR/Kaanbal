import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { prisma } from "./prisma"
import { Cursos, Materias, Temas, Nivel_educativo, Notas, Conversaciones_IA, Mensajes_conversacion } from "@prisma/client"
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
export async function obtenerCursosRecientes(limite: number = 5, id_usuario: any) {
  try {
    const cursos = await prisma.cursos.findMany({
      where: {
        usuario_id: id_usuario
      },
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

// Función para crear una nueva nota
export async function crearNuevaNota(data: any) {

  // Crear la nueva nota
  const nuevaNota = await prisma.notas.create({
    data: data
  })

  return nuevaNota
}


// Función para crear una nueva conversacion
export async function crearNuevaConversacion(id_nota: number) {

  const conversacion = {
    nota_id: id_nota
  }

  // Crear nueva conversacion
  const nuevaConversacion = await prisma.conversaciones_IA.create({
    data: conversacion
  })

  if (nuevaConversacion !== undefined) {
    await crearNuevoMensaje(nuevaConversacion.id_conversacion)
  }

  return nuevaConversacion
}

// Función para crear un primer mensaje
export async function crearNuevoMensaje(id_conversacion: number) {

  const primerMensaje = {
    conversacion_id: id_conversacion,
    role: "assistant",
    content: "¡Hola! Soy tu asistente AI. Estoy aquí para ayudarte a explorar y entender el contenido del documento. Puedes seleccionarlo y preguntarme sobre cualquier parte, o pedirme resúmenes y explicaciones. Si tienes alguna duda, ¡solo pregúntame! Y recuerda, tus preguntas no serán almacenadas. ¡Comencemos!"
  }

  const confirmacion = await prisma.mensajes_conversacion.create({
    data: primerMensaje
  })

  return confirmacion
}

// Función para guardar un mensaje en la base de datos
export async function guardarNuevoMensaje(mensaje: any) {

  // Método para guardar el mensjae
  const nuevoMensaje = await prisma.mensajes_conversacion.create({
    data: mensaje
  })

  return nuevoMensaje
}

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
      conversacion_id: id_conversacion,
    },
    orderBy: {
      id: 'desc', // Ordenar por el campo de creación en orden descendente
    },
  });
  return mensajes;
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

// Obtieen los nivels educativos
export async function obtenerNivelesEducativos() {

  // Obtiene todos los niveles
  const niveles: Nivel_educativo[] = await prisma.nivel_educativo.findMany()

  return niveles
}

// Obtener todas las materias de un nivel educativo
export async function obtenerMateriasNivel(id_nivel_educativo: any) {

  // Obtiene las materias filtrandolas
  const materias: Materias[] = await prisma.materias.findMany({
    where: {
      nivel_educativo_id: id_nivel_educativo
    }
  })

  return materias
}

// Obtiene los temas de una materia en especifico
export async function obtenerTemasMateria(id_materia: any) {

  // Obtiene los temas filrtandolos
  const temas: Temas[] = await prisma.temas.findMany({
    where: {
      materia_id: id_materia
    }
  })

  return temas
}

// Función para eliminar una conversación (junto a su nota)
export async function eliminarConversacion(id_conversacion: any)  {

  // Elimina un elemento
  const conversacion = await prisma.conversaciones_IA.delete({
    where: {
      id_conversacion: id_conversacion
    }
  })

  if ( conversacion !== undefined ) {
    await prisma.notas.delete({
      where: {
        id_nota: Number(conversacion.nota_id)
      }
    })
  }

  return conversacion
}