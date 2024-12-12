export interface Question {
    question: string;
    type: "multiple choice" | "true false" | "multiple select";
    numberOfCorrectAnswers: number;
    options: string[]; //Minimo de 2 y máximo de 4 strings
    rightAnswer: string[]; // Arrayde respuestas correctas
    explanation: string; // Explicación de las pregunta 
  }

export interface Quiz {
    general_explication: string; // Explicación general del tema
    quiz: Question[]; // Array de preguntas
  }


export interface QuizCourse {
  nombreCurso: string;
  dificultad: string;
  general_explication: string;
  quiz: Question[]
}