import { obtenerRutaDocumento, guardarNuevoMensaje } from "@/lib/utils";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Permite el streaming de respuestas a max 30 seg
export const dureacionMaxima = 30
const fs = require('fs')

export async function POST(request: Request) {

    // Obtiene los mensajes enviados
    const { messages } = await request.json()

    // Obtiene la URL
    const url = request.headers.get('referer')

    // Obtiene el ID de la conversacion
    const conversacion_id = Number(url?.split('/')[5])

    // Obtener la ruta del documento
    const ruta_documento = await obtenerRutaDocumento(conversacion_id)

    const ruta_proceso = process.cwd()

    messages.forEach((mensaje: any) => {
        if (mensaje.role === 'user') {
          mensaje.content = [
            {
                type: 'text',
                text: mensaje.content,
            },
            {
              type: 'file',
              data: fs.readFileSync(`${ruta_proceso}/public${ruta_documento}`),
              mimeType: 'application/pdf',
            }
          ]; // Agregar el campo pdf al mensaje de usuario
        }
      });

      const systemInstructions = `The AI assistant is a powerful, human-like artificial intelligence that acts in a natural manner. 
      The traits of the AI include expert knowledge, helpfulness, cleverness, and articulateness. 
      The AI is always friendly, polite, and inspiring, eager to provide vivid and thoughtful responses to the user. 
      The AI assistant will take into account any document provided for the user. 
      When referencing information from the document, the AI will exclusively use Markdown format as follows:

      1. Use **underline** styling to indicate the AI's interpretation or paraphrase of the information, using _underscores_ around the relevant text.
      2. Include the page number in square brackets right after the underlined portion, like this: _[Page X]_.
      3. If the information spans multiple pages or comes from different pages, reference each page individually with the corresponding Markdown notation.
      4. Always ensure that entire paragraphs, sentences, or meaningful phrases are wrapped in underscores for clarity.
      5. When no information exists in the document to answer a user's query, the AI will indicate that the information is not in the document but will provide it based on its own knowledge.

      Example:
      "The document discusses language learning difficulty. _[Page 3]_ It suggests that English is relatively simple for many learners to acquire. In contrast, _[Page 5]_ Mandarin Chinese is described as particularly challenging for English speakers, largely due to its tonal aspects and intricate writing system."

      The AI assistant must ensure that the text extracted from the document is accurately reflected, but can paraphrase when necessary. The AI will answer based on the document’s content without adding new information or inventing anything beyond what is provided in the document.
      The assistant will respond primarily in Spanish and use only Markdown formatting for the response, without mixing it with HTML.

      Additionally, if the user starts a conversation with a greeting or message in Spanish, such as "hola", the AI must respond in a natural manner in Spanish, as a person would.`;

      // Resultado de la respuesta
      const result = await streamText({
          model: google('gemini-1.5-flash'),
          messages,
          system: systemInstructions,
          async onFinish({ text }) {
            // Obtener ultimo mensaje enviado por el usuario
            const ultimoMensajeUsuario = messages.filter((mensaje: any) => mensaje.role === 'user').pop();

            // Filtra el contenido para obtener solo los mensajes de tipo 'text'
            const contenidoTexto = ultimoMensajeUsuario.content
            .filter((item: any) => item.type === 'text')
            .map((item: any) => item.text)
            .join(' ');  // Une todos los textos con un espacio

            // Crea el nuevo objeto con solo el contenido de texto
            const mensajeSimplificado = { role: 'user', content: contenidoTexto };


            // Lista de mensajes
            const mensajes = [
                { ...mensajeSimplificado, conversacion_id },
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