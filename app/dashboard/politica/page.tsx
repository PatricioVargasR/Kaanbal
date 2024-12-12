// pages/privacy.js

export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
            <p className="mb-4">
                En nuestra plataforma educativa, valoramos y respetamos tu privacidad. Esta Política de Privacidad describe
                cómo recopilamos, usamos y protegemos tu información personal.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Información que recopilamos</h2>
            <ul className="list-disc ml-6 mb-4">
                <li>Datos personales básicos, como nombre, dirección de correo electrónico y nivel educativo.</li>
                <li>Notas y apuntes que subas para generar contenido personalizado.</li>
                <li>Progreso en tus actividades, estadísticas de rendimiento y respuestas en ejercicios.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Uso de la información</h2>
            <p className="mb-4">
                Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc ml-6 mb-4">
                <li>Generar contenido educativo personalizado utilizando inteligencia artificial.</li>
                <li>Proporcionar estadísticas detalladas de tu progreso y rendimiento.</li>
                <li>Ofrecer retroalimentación continua y adaptada a tus necesidades específicas.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Protección de tu información</h2>
            <p className="mb-4">
                Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos contra accesos no
                autorizados, pérdida, alteración o divulgación.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Tus derechos</h2>
            <p className="mb-4">
                Tienes derecho a acceder, rectificar o eliminar tus datos personales en cualquier momento. También puedes
                solicitar la limitación del procesamiento de tus datos o retirar tu consentimiento.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Cambios en esta política</h2>
            <p className="mb-4">
                Nos reservamos el derecho de actualizar esta Política de Privacidad para reflejar cambios en nuestras
                prácticas o en las leyes aplicables. Te notificaremos sobre cualquier cambio significativo.
            </p>

            <p className="mt-6">
                Si tienes preguntas o inquietudes acerca de esta Política de Privacidad, no dudes en contactarnos.
            </p>
        </div>
    );
}
