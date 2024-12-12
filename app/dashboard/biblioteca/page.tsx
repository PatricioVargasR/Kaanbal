"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Cursos } from "@prisma/client";

export default function LibraryPage() {

  const [cursos, setCursos] = useState<Cursos[]>([]);
  const [filtro, setFiltro] = useState("reciente");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session } = useSession()

  const user = session?.user?.email

  async function obtenerCursos() {
    try {
      const response = await fetch(`/api/course/obtenerTodosCursos?id=${user}`, {
        method: 'GET'
      })

      const documento = response.json()

      return documento
    } catch(error) {
      console.log("Ocurrió un error al obtener los cursos")
    }
  }

  useEffect(() => {
    async function obtenerDatos() {
      try {
        const cursos = await obtenerCursos()
        setCursos(cursos)
      } catch(error) {
        console.error("Error al obtener los datos")
      }
    }

    obtenerDatos()
  }, [])


  const aplicarFiltrosYBusqueda = (criterio: string, busqueda: string) => {
    let cursosFiltrados = [...cursos];

    // Primero aplicamos la búsqueda si existe
    if (busqueda.trim() !== "") {
      cursosFiltrados = cursosFiltrados.filter(curso =>
        curso.nombre_curso.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Luego aplicamos el ordenamiento
    switch (criterio) {
      case "reciente":
        cursosFiltrados.sort((a, b) => {
          const fechaA = a.fecha_creacion ? new Date(a.fecha_creacion) : new Date(0); // Si es null, usa la fecha mínima
          const fechaB = b.fecha_creacion ? new Date(b.fecha_creacion) : new Date(0); // Si es null, usa la fecha mínima
          return fechaB.getTime() - fechaA.getTime();
        });
        break;
      case "ascendente":
        cursosFiltrados.sort((a, b) => a.nombre_curso.localeCompare(b.nombre_curso));
        break;
      case "descendiente":
        cursosFiltrados.sort((a, b) => b.nombre_curso.localeCompare(a.nombre_curso));
        break;
      case "preguntas":
        cursosFiltrados.sort((a, b) => b.cantidad_preguntas - a.cantidad_preguntas);
        break;
      default:
        break;
    }

    setCursos(cursosFiltrados);
  };

  const filtrarCursos = (criterio: string) => {
    setFiltro(criterio);
    aplicarFiltrosYBusqueda(criterio, searchTerm);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    aplicarFiltrosYBusqueda(filtro, value);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0f4c81]">Biblioteca</h1>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Input
          type="search"
          placeholder="Buscar Unidad..."
          className="w-full sm:max-w-sm"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Select onValueChange={filtrarCursos} defaultValue={filtro}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtro" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="reciente">Recientes</SelectItem>
            <SelectItem value="descendiente">Descendiente</SelectItem>
            <SelectItem value="ascendente">Ascendente</SelectItem>
            <SelectItem value="preguntas">Por pregunta</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {cursos.length > 0 ? (
        <div className="space-y-4">
          {cursos.map((curso, index) => (
            <Link href={`/dashboard/curso/${curso.id_curso}`} key={index}>
              <Card key={curso.id_curso} className="shadow-md rounded-lg border border-gray-300 transition-transform duration-300 transform hover:scale-[1.03] hover:shadow-lg hover:shadow-gray-400 mb-5">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">
                    {" "}
                    {curso ? curso.nombre_curso : 'Cargando...'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base">
                    {" "}
                    {curso ? `Cantidad de preguntas: ${curso.cantidad_preguntas}`: 'Cargando...' }
                  </p>
                  <p className="text-sm sm:text-base">
                    {curso.fecha_creacion
                        ? new Date(curso.fecha_creacion).toLocaleDateString()
                        : "Fecha no disponible"}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No se encontraron cursos</p>
      )}
    </div>
  );
}