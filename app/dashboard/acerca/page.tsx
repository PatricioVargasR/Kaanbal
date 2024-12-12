import React from "react";

export default function AboutUs() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Acerca de Nosotros</h1>
      <p className="mb-4">
        Somos una plataforma educativa dedicada a transformar la manera en que las
        personas aprenden. Nuestra misión es brindar contenido personalizado y
        adaptado a las necesidades de cada usuario mediante el uso de tecnologías
        avanzadas como la inteligencia artificial.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Nuestra Visión</h2>
      <p className="mb-4">
        Imaginamos un futuro donde la educación sea accesible, interactiva y
        personalizada para todos. Creemos en el poder del aprendizaje dinámico y
        flexible para empoderar a las personas en su camino educativo.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Qué Ofrecemos</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Generación de contenido educativo dinámico adaptado a cada usuario.</li>
        <li>Estadísticas detalladas para evaluar el progreso del aprendizaje.</li>
        <li>Retroalimentación continua para identificar y mejorar áreas clave.</li>
        <li>Posibilidad de subir apuntes y generar actividades personalizadas.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Nuestro Compromiso</h2>
      <p className="mb-4">
        Estamos comprometidos con la calidad educativa y la privacidad de nuestros
        usuarios. Trabajamos constantemente para mejorar nuestra plataforma y
        brindar la mejor experiencia de aprendizaje posible.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Contáctanos</h2>
      <p className="mb-4">
        Si deseas saber más sobre nuestro proyecto, colaborar con nosotros o tienes
        alguna pregunta, no dudes en ponerte en contacto. Estamos aquí para
        ayudarte.
      </p>

      <p className="mt-6">
        Gracias por confiar en nosotros como tu compañero de aprendizaje.
      </p>
    </div>
  );
}
