'use client';

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Materias, Nivel_educativo, Temas } from "@prisma/client";
import { useToast } from "@/hooks/use-toast"; // Asegúrate de tener esta utilidad

export default function CreateUnitPage() {
  const [levels, setLevels] = useState<Nivel_educativo[]>([]); // Niveles educativos
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const [subjects, setSubjects] = useState<Materias[]>([]); // Materias según el nivel
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);

  const [topics, setTopics] = useState<Temas[]>([]); // Temas según la materia
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  const [numQuestions, setNumQuestions] = useState("10"); // Número de preguntas

  const { toast } = useToast();

  // 1. Fetch inicial para niveles educativos
  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await fetch("/api/units/level"); // Ruta de tu API para niveles
        const data: Nivel_educativo[] = await response.json();
        setLevels(data);
      } catch (error) {
        console.error("Error fetching levels:", error);
      }
    };

    fetchLevels();
  }, []);

  // 2. Manejar selección de nivel educativo y cargar materias
  const handleLevelChange = async (value: any) => {
    setSelectedLevel(Number(value));
    setSelectedSubject(null); // Reinicia la materia seleccionada
    setSelectedTopic(null); // Reinicia el tema seleccionado
    setTopics([]); // Limpia temas

    try {
      const response = await fetch(`/api/units/subjects?level=${value}`); // API para obtener materias por nivel
      const data: Materias[] = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  // 3. Manejar selección de materia y cargar temas
  const handleSubjectChange = async (value: any) => {
    setSelectedSubject(Number(value));
    setSelectedTopic(null); // Reinicia el tema seleccionado

    try {
      const response = await fetch(`/api/units/topics?subject=${value}`); // API para obtener temas por materia
      const data: Temas[] = await response.json();
      setTopics(data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  // 4. Enviar datos al servidor
  const handleSubmit = async () => {

    console.log(typeof selectedLevel, typeof selectedSubject, typeof selectedTopic)

    // Obtener los nombres correspondientes de nivel, materia y tema
    const selectedLevelName = levels.find(level => level.id_nivel_educativo === selectedLevel)?.nombre_nivel;
    const selectedSubjectName = subjects.find(subject => subject.id_materia === selectedSubject)?.nombre_materia;
    const selectedTopicName = topics.find(topic => topic.id_tema === selectedTopic)?.nombre_tema;

    console.log(selectedLevelName, selectedSubjectName, selectedTopicName)

    if (!selectedLevelName || !selectedSubjectName || !selectedTopicName) {
      toast({
        title: "Error",
        description: "No se encontraron los nombres seleccionados.",
        variant: "destructive",
      });
      return;
    }

    const data = {
      nivelEducativo: selectedLevelName,  // Enviar el nombre del nivel
      materia: selectedSubjectName,       // Enviar el nombre de la materia
      tema: selectedTopicName,           // Enviar el nombre del tema
      preguntas: numQuestions,
    };

    try {
      const response = await fetch("/api/units/start", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Los datos han sido enviados correctamente.",
          variant: "default",
        });
        // Aquí puedes redirigir al usuario o hacer alguna acción adicional
      } else {
        toast({
          title: "Error",
          description: "Ocurrió un error al enviar los datos.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo completar la solicitud, por favor intenta nuevamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl font-bold text-center text-[#0f4c81]">
            Configura y comienza
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4 sm:p-6">
          {/* Nivel educativo */}
          <Select onValueChange={handleLevelChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Nivel educativo" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level.id_nivel_educativo} value={level.id_nivel_educativo.toString()}>
                  {level.nombre_nivel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Materia */}
          <Select
            onValueChange={handleSubjectChange}
            disabled={!subjects.length}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona una materia" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject.id_materia} value={subject.id_materia.toString()}>
                  {subject.nombre_materia}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Tema */}
          <Select
            onValueChange={(value) => setSelectedTopic(Number(value))}
            disabled={!topics.length}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona un tema" />
            </SelectTrigger>
            <SelectContent>
              {topics.map((topic) => (
                <SelectItem key={topic.id_tema} value={topic.id_tema.toString()}>
                  {topic.nombre_tema}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Número de preguntas */}
          <Select onValueChange={(value) => setNumQuestions(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Número de preguntas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
            </SelectContent>
          </Select>

          <Button
            className="w-full bg-[#0f4c81] hover:bg-[#98bee0] text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
            onClick={handleSubmit}
          >
            Comenzar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
