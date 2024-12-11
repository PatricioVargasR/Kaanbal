import { NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { generateObject } from "ai"
import z from "zod"
import { generarQuizz } from "@/lib/utils";

export async function POST(request: Request) {
    try {
        // Obtener los datos de la solicitud
        const { nivelEducativo, materia, tema, preguntas, dificultad, usuario } = await request.json()

        // Crea el objeto de google
        const google = createGoogleGenerativeAI({
            apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY
        })

        // Esquema de las preguntas
        const questionSchema = z.object({
            question: z.string(),
            type: z.enum(["multiple choice", "true false", "multiple select"]),
            numberOfCorrectAnswers: z.number(),
            options: z.array(z.string()).min(2).max(4),
            rightAnswer: z.array(z.string()),
            explanation: z.string(),
        })

        // Se genera el objecto
        const { object } = await generateObject({
            model: google("gemini-1.5-pro"),
            system: "You generate questions depending on the level, topic and the difficulty selected.",
            maxRetries: 2,
            schema: z.object({
                general_explication: z.string(),
                quiz: z.array(questionSchema).length(preguntas),
            }),
            prompt: `Generate ${preguntas} questions based on the selected topic: ${tema}

                **Configuration**
                * Level: ${nivelEducativo}
                * Subject: ${materia}
                * Topic: ${tema}
                * Difficulty: ${dificultad}

                **Requirements:**
                * Generate exactly ${preguntas} questions.
                * The questions are about the selected topic.
                * The questions must be in Spanish.
                * Do not include option letters (e.g., "A", "B", "C") in the options.
                * The questions should focus on the concepts and specifics of the topic, not exercises.
                * For "true/false" type questions, use "Verdadero" or "Falso" as options.
                * Only provide options if the question type is "true/false" or "multiple choice".
                * Ensure that the answer is not embedded in the question.
                * Always include a clear and concise explanation of the topic related to the difficulty level.
                * If the selected 'topic' and 'subject' are not logically related, create questions about the selected technology instead.
                `,
        })

        // Datos generales para la creación del curso
        const datos_generales = {
            nombreCurso: tema,
            dificultad: dificultad,
            temaId: tema,
            usuarioId: usuario
        }

        // Obtener el curso creado
        const curso_creado = await generarQuizz(object, datos_generales)

        return NextResponse.json(curso_creado)
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { message: 'Ocurrió un error inesperado' },
            { status: 500 }
        )
    }
}

