"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Datos estáticos para los cursos
const datosCursos = [
  { id_curso: 1, nombre_curso: "Curso A", fecha_creacion: new Date("2023-01-01"), cantidad_preguntas: 10 },
  { id_curso: 2, nombre_curso: "Curso B", fecha_creacion: new Date("2023-03-01"), cantidad_preguntas: 20 },
  { id_curso: 3, nombre_curso: "Curso C", fecha_creacion: new Date("2023-02-01"), cantidad_preguntas: 5 },
  { id_curso: 4, nombre_curso: "Curso D", fecha_creacion: new Date("2023-04-01"), cantidad_preguntas: 15 },
];

export default function LibraryPage() {
  const [cursos, setCursos] = useState([...datosCursos]);
  const [filtro, setFiltro] = useState("reciente");
  const [searchTerm, setSearchTerm] = useState("");

  const aplicarFiltrosYBusqueda = (criterio: string, busqueda: string) => {
    let cursosFiltrados = [...datosCursos];

    // Primero aplicamos la búsqueda si existe
    if (busqueda.trim() !== "") {
      cursosFiltrados = cursosFiltrados.filter(curso =>
        curso.nombre_curso.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Luego aplicamos el ordenamiento
    switch (criterio) {
      case "reciente":
        cursosFiltrados.sort((a, b) => b.fecha_creacion.getTime() - a.fecha_creacion.getTime());
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
          {cursos.map((curso) => (
            <Card key={curso.id_curso}>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">{curso.nombre_curso}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base">Cantidad de preguntas: {curso.cantidad_preguntas}</p>
                <p className="text-sm sm:text-base">
                  Creado: {curso.fecha_creacion.toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No se encontraron cursos</p>
      )}
    </div>
  );
}