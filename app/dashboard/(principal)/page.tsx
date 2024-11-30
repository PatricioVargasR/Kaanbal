import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const recentActivities = [
  { title: "Unidad de Álgebra Completada", date: "2023-06-15" },
  { title: "Inicia con Química Básica", date: "2023-06-14" },
  { title: "Reseña de Historia Universal", date: "2023-06-13" },
];

const popularTopics = [
  { title: "Matematicas", icon: "📐" },
  { title: "Ciencias", icon: "🧪" },
  { title: "Literatura", icon: "📚" },
  { title: "Historia", icon: "🏛️" },
  { title: "Lenguajes", icon: "🗣️" },
];

export default function LearningPage() {
  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8 py-6">
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0f4c81]">Actividades Recientes</h2>
        <div className="grid grid-cols-1 gap-4">
          {recentActivities.map((activity, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">{activity.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-gray-600">{activity.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <section className="bg-[#c4d8e9] p-4 rounded-lg md:text-left  sm:text-center">
        <h2 className="text-xl font-bold mb-2">Nuevas funciones</h2>
        <p className="mb-4">
          ¡Prueba nuestra nueva asistente de estudios impulsada por IA!
        </p>
        <Button className="w-full sm:w-auto bg-[#0f4c81] hover:bg-[#98bee0]">Saber más</Button>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0f4c81]">Temas Populares</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {popularTopics.map((topic, index) => (
            <Card key={index} className="flex flex-col items-center justify-center p-4">
              <CardHeader>
                <CardTitle className="text-3xl sm:text-4xl">{topic.icon}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm sm:text-base">{topic.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

