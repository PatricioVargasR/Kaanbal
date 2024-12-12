"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface QuizResults {
  questions: {
    question: string;
    userAnswer: string[];
    correctAnswer: string[];
    isCorrect: boolean;
    explanation: string;
  }[];
  score: number;
  totalQuestions: number;
}

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<QuizResults | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if(typeof window !== "undefined") {
      const queryString = window.location.href;
      const extractedId = queryString.split('/')[5];
      setId(extractedId);

      // Recuperar resultados del localStorage
      const storedResults = localStorage.getItem('quizResults');
      if (storedResults) {
        setResults(JSON.parse(storedResults));
        // Limpiar resultados del localStorage después de cargarlos
        localStorage.removeItem('quizResults');
      }
    }
  }, []);

  const handleReviewQuestions = () => {
    if (id) {
      router.push(`/dashboard/curso/${id}`);
    }
  };

  const handleReturnToCourse = () => {
    if (id) {
      router.push(`/dashboard/curso/${id}`);
    }
  };

  if (!results) {
    return <div>Cargando resultados...</div>;
  }

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
            <p className="text-5xl font-bold text-[#0f4c81]">
              {results.score}/{results.totalQuestions}
            </p>
            <p className="text-xl mt-2">respuestas correctas</p>
          </div>
          <Progress 
            value={(results.score / results.totalQuestions) * 100} 
            className="w-full h-4"
          />
          <p className="text-center text-lg">
            Has completado {results.totalQuestions} preguntas con un {Math.round((results.score / results.totalQuestions) * 100)}% de acierto.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Desglose de Respuestas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {results.questions.map((result, index) => (
              <li key={index} className="border-b pb-4 last:border-b-0">
                <p className="font-medium">{index + 1}. {result.question}</p>
                <p className={`mt-1 ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  Tu respuesta: {result.userAnswer.join(", ")}
                </p>
                {!result.isCorrect && (
                  <p className="mt-1 text-green-600">
                    Respuesta correcta: {result.correctAnswer.join(", ")}
                  </p>
                )}
                <p className="mt-2 text-gray-600 text-sm">
                  {result.explanation}
                </p>
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