"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Question } from "@/lib/interfaces";

interface Result {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<Result[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Simular la carga de resultados desde una API o estado global
    const fetchResults = async () => {
      // Reemplazar esto con una llamada real a la API o recuperación del estado
      const mockResults: Result[] = [
        {
          question: "¿Cuál es la solución de la ecuación 2x + 5 = 13?",
          userAnswer: "x = 4",
          correctAnswer: "x = 4",
          isCorrect: true,
        },
        {
          question: "¿Cuál es el valor de π (pi) redondeado a dos decimales?",
          userAnswer: "3.15",
          correctAnswer: "3.14",
          isCorrect: false,
        },
        // Añadir más resultados aquí
      ];
      setResults(mockResults);
      setScore(mockResults.filter(result => result.isCorrect).length);
    };

    fetchResults();
  }, []);

  const handleReviewQuestions = () => {
    // Implementar la lógica para revisar las preguntas
    console.log("Revisando preguntas");
  };

  const handleReturnToCourse = () => {
    router.push("/course");
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 max-w-4xl mx-auto py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-[#0f4c81] text-center">
        Resultados del Curso
      </h1>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Resumen de tu desempeño
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-5xl font-bold text-[#0f4c81]">{score}/{results.length}</p>
            <p className="text-xl mt-2">respuestas correctas</p>
          </div>
          <Progress 
            value={(score / results.length) * 100} 
            className="w-full h-4"
          />
          <p className="text-center text-lg">
            Has completado {results.length} preguntas con un {Math.round((score / results.length) * 100)}% de acierto.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Desglose de Respuestas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {results.map((result, index) => (
              <li key={index} className="border-b pb-4 last:border-b-0">
                <p className="font-medium">{index + 1}. {result.question}</p>
                <p className={`mt-1 ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  Tu respuesta: {result.userAnswer}
                </p>
                {!result.isCorrect && (
                  <p className="mt-1 text-green-600">
                    Respuesta correcta: {result.correctAnswer}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          onClick={handleReviewQuestions}
          className="bg-[#0f4c81] hover:bg-[#98bee0] text-white"
        >
          Revisar Preguntas
        </Button>
        <Button
          onClick={handleReturnToCourse}
          variant="outline"
        >
          Volver al Curso
        </Button>
      </div>
    </div>
  );
}

