import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Términos y Condiciones</h1>
      <p className="mb-4">
        Bienvenido a nuestra plataforma educativa. Al acceder o utilizar nuestros
        servicios, usted acepta cumplir con estos términos y condiciones. Por
        favor, léalos detenidamente.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Uso de la Plataforma</h2>
      <p className="mb-4">
        Nuestra plataforma está destinada exclusivamente para fines educativos.
        Usted se compromete a utilizarla de manera responsable y conforme a la
        ley. Queda estrictamente prohibido:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Compartir contenido ofensivo, ilegal o dañino.</li>
        <li>Acceder a cuentas de otros usuarios sin autorización.</li>
        <li>Realizar actividades que puedan interrumpir el servicio.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Creación de Contenido</h2>
      <p className="mb-4">
        Los usuarios pueden subir apuntes, notas y otros contenidos. Al hacerlo,
        usted garantiza que tiene los derechos necesarios para compartir dicho
        material y concede a nuestra plataforma el permiso para utilizarlo con
        fines educativos y de personalización de servicios.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Propiedad Intelectual</h2>
      <p className="mb-4">
        Todos los derechos de propiedad intelectual relacionados con la
        plataforma, incluidos los generados por la inteligencia artificial, son
        propiedad exclusiva de nuestra empresa. Los usuarios pueden usar los
        materiales generados únicamente para fines educativos personales.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Privacidad</h2>
      <p className="mb-4">
        Nos comprometemos a proteger la privacidad de nuestros usuarios. Por
        favor, consulte nuestra <a href="/dashboard/politica" className="text-blue-500">Política de Privacidad</a> para obtener
        más información sobre cómo manejamos sus datos.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Limitación de Responsabilidad</h2>
      <p className="mb-4">
        La plataforma no garantiza la exactitud o la idoneidad de los materiales
        generados para todas las circunstancias. El uso de la plataforma es bajo
        su propio riesgo.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Modificaciones</h2>
      <p className="mb-4">
        Nos reservamos el derecho de modificar estos términos en cualquier
        momento. Le notificaremos cualquier cambio a través de la plataforma o
        por correo electrónico.
      </p>

      <p className="mt-6">
        Si tiene alguna pregunta sobre estos términos, no dude en ponerse en
        contacto con nosotros a través de nuestra sección de <a href="/dashboard/acerca" className="text-blue-500">Acerca</a>.
      </p>
    </div>
  );
}
