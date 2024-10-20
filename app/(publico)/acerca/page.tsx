import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Award, Zap, Users } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acerca de Nosotros',
};
export default function AboutUs() {
  return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Acerca de nosotros</h1>

        <div className="flex flex-col md:flex-row items-center mb-12">
          <img src="/placeholder.svg?height=300&width=300" alt="Learning illustration" className="w-full md:w-1/2 mb-6 md:mb-0" />
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-2xl font-bold mb-4">Impulsamos el aprendizaje personalizado a través de la inteligencia artificial.</h2>
            <p className="mb-4">En Kaanbal, creemos que cada estudiante es único, y su proceso de aprendizaje también debe serlo. Por eso, hemos desarrollado una plataforma educativa basada en IA que transforma la manera en que se adquiere conocimiento.</p>
            <div className="flex items-center mb-4">
              <span className="text-yellow-400">★★★★★</span>
              <span className="ml-2 text-sm">Basado en +10,000 reseñas</span>
            </div>
            <Button className="bg-[#0f4c81] text-white hover:bg-[#0f4c81]/90">Empieza gratis</Button>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">Fomenta el éxito a través de nuestros valores</h2>
          <p className="text-center mb-8">Nos comprometemos a ofrecer una plataforma que optimiza el aprendizaje, brindando contenido personalizado y herramientas efectivas para cada usuario.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#98bee0]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2" />
                  Eficiencia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Kaanbal optimiza el proceso de aprendizaje con generación rápida de actividades personalizadas, ahorrando tiempo y esfuerzo para que se enfoquen en lo importante.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#c4d8e9]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2" />
                  Calidad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Nos comprometemos a ofrecer contenido educativo de alta calidad, respaldado por inteligencia artificial, que se adapta a los estándares académicos y asegura un aprendizaje efectivo.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#98bee0]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="mr-2" />
                  Excelencia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Nos esforzamos por ofrecer una experiencia de aprendizaje de excelencia, proporcionando herramientas avanzadas y retroalimentación detallada que promueve la mejora continua.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#c4d8e9]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2" />
                  Accesibilidad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Kaanbal está diseñado para ser accesible desde cualquier dispositivo y lugar, brindando flexibilidad a los usuarios para aprender cuando y donde lo necesiten.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-center mb-6">Un equipo dinámico</h2>
          <p className="text-center mb-8">Nos dedicamos a innovar y mejorar la experiencia de aprendizaje trabajando juntos para crear soluciones que realmente marquen la diferencia.</p>
          <div className="flex flex-wrap justify-center gap-8">
            {['Patricio de Jesús', 'José Alonso', 'Jorge Alfonso'].map((name, index) => (
              <Card key={index} className="w-64">
                <CardHeader>
                  <CardTitle className="text-center">{name}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <img src={`/placeholder.svg?height=100&width=100&text=${name.split(' ')[0]}`} alt={name} className="rounded-full" />
                </CardContent>
                <CardContent className="text-center">
                  <p>Desarrollador</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
  )
}