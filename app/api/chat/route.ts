import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Permite el streaming de respuestas a max 30 seg
export const dureacionMaxima = 30

export async function POST(request: Request) {

    // Obtiene los mensajes enviados
    const { messages } = await request.json()

    // Resultado de la respuesta
    const result = await streamText({
        model: google('gemini-1.5-flash'),
        messages,
        onFinish({ text }) {
            console.log(text)
        }
    });

    // Devolver el mensaje
    return result.toDataStreamResponse();
}