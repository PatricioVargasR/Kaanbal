import { NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import z from "zod";
import fs from "fs";
import path from "path";
import { generarQuizz } from "@/lib/utils";

export async function POST(request: Request) {
    try {
        // Obtener los datos de la solicitud
        const { usuario, documento } = await request.json();

        // Crear el objeto de Google
        const google = createGoogleGenerativeAI({
            apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY
        });

        // Esquema de los datos generados por la AI
        const schema = z.object({
            nombreCurso: z.string(),
            dificultad: z.enum(["facil", "medio", "dificil"]),
            general_explication: z.string(),
            quiz: z.array(
                z.object({
                    question: z.string(),
                    type: z.enum(["multiple choice", "true false", "multiple select"]),
                    numberOfCorrectAnswers: z.number(),
                    options: z.array(z.string()).min(2).max(4),
                    rightAnswer: z.array(z.string()),
                    explanation: z.string(),
                })
            ),
        });

        const prompt =  `
        Analyze the following document and create a course with the following structure:
        - Course name based on the document's main topic.
        - Difficulty level inferred from the document's complexity.
        - A quiz containing questions derived from the document.

        **Requirements:**
        * Generate questions directly related to the content of the document.
        * Provide explanations for each question.
        * The number of questions in the quiz must vary depending on the topic's depth or coverage but must be 5, 10, or 15.
        * Ensure the content is in Spanish.
        * Do not include option letters (e.g., "A", "B", "C") in the options.
        * For "true/false" type questions, use "Verdadero" or "Falso" as options.
    `
        const ruta_proceso = process.cwd()

        // Generar las preguntas con base al documento
        const { object } = await generateObject({
            model: google("gemini-1.5-pro-002"),
            system: "You generate course data based on the content of a document provided.",
            maxRetries: 2,
            schema,
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: prompt
                        },
                        {
                            type: 'file',
                            data: fs.readFileSync(`${ruta_proceso}/public${documento}`),
                            mimeType: 'application/pdf',
                        }
                    ]
                }
            ]

        });

        // Datos generales para la creación del curso
        const datosGenerales = {
            nombreCurso: object.nombreCurso,
            dificultad: object.dificultad,
            usuarioId: usuario,
        };


        // Obtener el curso creado
        const cursoCreado = await generarQuizz(object, datosGenerales);

        return NextResponse.json(cursoCreado);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Ocurrió un error inesperado" },
            { status: 500 }
        );
    }
}
