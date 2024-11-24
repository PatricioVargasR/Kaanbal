import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from 'lucide-react'
import { Metadata } from 'next'
import { PrincingTable } from "@/components/public/pricing_public"

export const metadata: Metadata = {
  title: 'Precios',
};

export default function Pricing() {

  return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Planes de uso</h1>
        <PrincingTable />
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">Compara los planes y características</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#0f4c81] text-white">
                <th className="p-2 text-left">Característica</th>
                <th className="p-2 text-center">Estándar</th>
                <th className="p-2 text-center">Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="p-2 border">Acceso a contenido</td>
                <td className="p-2 border text-center"><Check className="inline-block text-green-500" /></td>
                <td className="p-2 border text-center"><Check className="inline-block text-green-500"   /></td>
              </tr>
              <tr className="bg-[#f3f3f3]">
                <td className="p-2 border">Generación de actividades</td>
                <td className="p-2 border text-center"><Check className="inline-block text-green-500" /></td>
                <td className="p-2 border text-center"><Check className="inline-block text-green-500" /></td>
              </tr>
              <tr className="bg-white">
                <td className="p-2 border">Subida ilimitada de notas en PDF</td>
                <td className="p-2 border text-center"><X className="inline-block text-red-500" /></td>
                <td className="p-2 border text-center"><Check className="inline-block text-green-500" /></td>
              </tr>
              <tr className="bg-[#f3f3f3]">
                <td className="p-2 border">Progreso y estadísticas detalladas</td>
                <td className="p-2 border text-center"><X className="inline-block text-red-500" /></td>
                <td className="p-2 border text-center"><Check className="inline-block text-green-500" /></td>
              </tr>
              <tr className="bg-white">
                <td className="p-2 border">Soporte Prioritario</td>
                <td className="p-2 border text-center"><X className="inline-block text-red-500" /></td>
                <td className="p-2 border text-center"><Check className="inline-block text-green-500" /></td>
              </tr>
            </tbody>
          </table>
        </section>

        <Card className="bg-[#98bee0] mb-12">
          <CardContent className="flex flex-col md:flex-row items-center justify-between p-6">
            <div>
              <h3 className="text-xl font-bold mb-2">¿Estás listo para conocer a tu nuevo acompañante de estudio?</h3>
              <p>¡Toma acción ahora para marcar la diferencia en tu estudio! Ya sea desde un tema que te apasiona hasta algo que te agobia.</p>
            </div>
            <Button className="mt-4 md:mt-0 bg-[#0f4c81] text-white hover:bg-[#0f4c81]/90">Comenzar gratis</Button>
          </CardContent>
        </Card>
      </main>
  )
}