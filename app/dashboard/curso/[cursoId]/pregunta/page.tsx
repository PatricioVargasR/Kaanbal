"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Question, Quiz } from "@/lib/interfaces";

export default function QuestionPage() {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null)
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswerVerified, setIsAnswerVerified] = useState(false);

  // Obtener el ID solo del curso
  useEffect(() => {
    if(typeof window !== "undefined") {
      const queryString = window.location.href
      const extractedId = queryString.split('/')[5]
      setId(extractedId)
    }
  }, [])

  // Función para obtener el quizz
  async function obtenerQuizz() {
    try {
      const response = await fetch(`/api/course/obtenerCursoCompleto?id=${id}`, {
        method: 'GET'
      })

      const documento = await response.json()
      return documento

    } catch(error) {
      console.error("Ocurrió un error")
    }

  }


  // Obtiene dinamicamente los datos del curso con base al id
  useEffect(() => {
    if(!id) return

    // Obtener los datos
    async function fetchData() {
      try {
        const quizz = await obtenerQuizz()
        setQuiz(quizz)
        console.log(quizz)
      } catch(error) {
        console.error("Error al cargar los datos")
      }
    }

    fetchData()
  }, [id])


  const currentQuestion = quiz?.quiz[currentQuestionIndex];

  const handleAnswerSelection = (answer: string) => {
    if (currentQuestion?.type === "multiple select") {
      setSelectedAnswers(prev =>
        prev.includes(answer)
          ? prev.filter(a => a !== answer)
          : [...prev, answer]
      );
    } else {
      setSelectedAnswers([answer]);
    }
    setIsAnswerVerified(false);
  };

  const handleVerify = () => {
    setIsAnswerVerified(true);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quiz?.quiz.length ?? 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswers([]);
      setShowExplanation(false);
      setIsAnswerVerified(false);
    } else {
      // Navegar a una página de resultados o finalización
      router.push("/results");
    }
  };

  const handleCancel = () => {
    // Navegar de vuelta a la página del curso
    window.location.href = `/dashboard/curso/${id}`
  };

  if (!currentQuestion) {
    return <div>Cargando preguntas...</div>;
  }

  const isCorrect = (option: string) => currentQuestion.rightAnswer.includes(option);

  return (
    <div className="space-y-6 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Progreso de la pregunta */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#0f4c81] text-center md:text-left">
          Pregunta {currentQuestionIndex + 1} de {quiz?.quiz.length}
        </h1>
        <Progress 
          value={((currentQuestionIndex + 1) / (quiz?.quiz.length ?? 1)) * 100} 
          className="mt-2"
        />
      </div>

      {/* Tarjeta con la pregunta y opciones */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl text-center md:text-left">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentQuestion.type === "multiple choice" || currentQuestion.type === "true false" ? (
            <RadioGroup 
              className="space-y-4"
              value={selectedAnswers[0]}
              onValueChange={(value) => handleAnswerSelection(value)}
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={option} 
                    id={`option-${index}`}
                    disabled={isAnswerVerified}
                  />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className={`text-sm md:text-base ${
                      isAnswerVerified && isCorrect(option)
                        ? "text-green-600 font-bold"
                        : isAnswerVerified && selectedAnswers.includes(option)
                        ? "text-red-600 font-bold"
                        : ""
                    }`}
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`option-${index}`}
                    checked={selectedAnswers.includes(option)}
                    onCheckedChange={() => handleAnswerSelection(option)}
                    disabled={isAnswerVerified}
                  />
                  <Label 
                    htmlFor={`option-${index}`}
                    className={`text-sm md:text-base ${
                      isAnswerVerified && isCorrect(option)
                        ? "text-green-600 font-bold"
                        : isAnswerVerified && selectedAnswers.includes(option)
                        ? "text-red-600 font-bold"
                        : ""
                    }`}
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          )}

          {/* Botones */}
          <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            {!isAnswerVerified ? (
              <Button 
                className="bg-[#0f4c81] hover:bg-[#98bee0] w-full sm:w-auto"
                onClick={handleVerify}
                disabled={selectedAnswers.length === 0}
              >
                Verificar
              </Button>
            ) : (
              <Button 
                className="bg-[#0f4c81] hover:bg-[#98bee0] w-full sm:w-auto"
                onClick={handleNextQuestion}
              >
                {currentQuestionIndex < (quiz?.quiz.length ?? 0) - 1 ? "Siguiente pregunta" : "Ver resultados"}
              </Button>
            )}
            <Button 
              variant="outline" 
              className="w-full sm:w-auto"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Explicación */}
      {showExplanation && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Explicación</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{currentQuestion.explanation}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

