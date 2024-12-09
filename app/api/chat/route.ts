import { crearNuevoMensaje, guardarNuevoMensaje } from "@/lib/utils";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Permite el streaming de respuestas a max 30 seg
export const dureacionMaxima = 30

export async function POST(request: Request) {

    // Obtiene los mensajes enviados
    const { messages } = await request.json()

    // Obtiene la URL
    const url = request.headers.get('referer')

    // Obtiene el ID de la conversacion
    const conversacion_id = Number(url?.split('/')[5])

    // Resultado de la respuesta
    const result = await streamText({
        model: google('gemini-1.5-flash'),
        messages,
        async onFinish({ text }) {
            // Obtener ultimo mensaje enviado por el usuario
            const ultimoMensajeUsuario = messages.filter((mensaje:any) => mensaje.role === 'user').pop();

            // Lista de mensajes
            const mensajes = [
                { ...ultimoMensajeUsuario, conversacion_id },
                { role: 'assistant', content: text, conversacion_id }
            ];

            for (const mensaje of mensajes) {
                console.log(mensaje)
                await guardarNuevoMensaje(mensaje);
            }
        }
    });

    // Devolver el mensaje
    return result.toDataStreamResponse();
}