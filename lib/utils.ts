import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { prisma } from "./prisma"
import { Cursos } from "@prisma/client"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Función para obtener todos los cursos
export async function obtenerTodosCursos() {
  const cursos: Cursos[] = await prisma.cursos.findMany();

  return cursos
}