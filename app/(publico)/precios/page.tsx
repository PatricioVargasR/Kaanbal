import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Precios',
};

export default function Pricing() {
  // const [isAnnual, setIsAnnual] = useState(false)

  return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Planes de uso</h1>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Todos nuestros planes</h2>
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              // className={`px-4 py-2 text-sm font-medium rounded-l-lg ${!isAnnual ? 'bg-[#0f4c81] text-white' : 'bg-white text-[#0f4c81]'}`}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg bg-[#0f4c81] text-white`}
              // onClick={() => setIsAnnual(false)}
            >
              Mensual
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg`}
              // className={`px-4 py-2 text-sm font-medium rounded-r-lg ${isAnnual ? 'bg-[#0f4c81] text-white' : 'bg-white text-[#0f4c81]'}`}
              // onClick={() => setIsAnnual(true)}
            >
              Anual
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center mb-12">
          <Card className="w-full md:w-80 bg-[#98bee0]">
            <CardHeader>
              <CardTitle className="text-center">
                <span className="text-2xl font-bold">Estándar</span>
                <p className="text-4xl font-bold mt-2">Gratis</p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center"><Check className="mr-2" /> Contenido predeterminado</li>
                <li className="flex items-center"><Check className="mr-2" /> Generación básica de actividades</li>
                <li className="flex items-center"><Check className="mr-2" /> Subida de notas en PDF</li>
                <li className="flex items-center"><Check className="mr-2" /> Progreso y estadísticas</li>
                <li className="flex items-center"><Check className="mr-2" /> Retroalimentación automática</li>
              </ul>
              <Button className="w-full mt-4 bg-[#0f4c81] text-white hover:bg-[#0f4c81]/90">Actualmente en uso</Button>
            </CardContent>
          </Card>

          <Card className="w-full md:w-80 bg-[#c4d8e9]">
            <CardHeader>
              <CardTitle className="text-center">
                <span className="text-2xl font-bold">Premium</span>
                {/* <p className="text-4xl font-bold mt-2">${isAnnual ? '1000' : '100'}<span className="text-base font-normal">{isAnnual ? '/año' : '/mes'}</span></p> */}
                <p className="text-4xl font-bold mt-2">$1000<span className="text-base font-normal">/año</span></p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center"><Check className="mr-2" /> Todo lo anterior y:</li>
                <li className="flex items-center"><Check className="mr-2" /> Contenido ilimitado</li>
                <li className="flex items-center"><Check className="mr-2" /> Generación avanzada</li>
                <li className="flex items-center"><Check className="mr-2" /> Seguimiento específico</li>
                <li className="flex items-center"><Check className="mr-2" /> Retroalimentación detallada</li>
                <li className="flex items-center"><Check className="mr-2" /> Modo offline</li>
              </ul>
              <Button className="w-full mt-4 bg-[#0f4c81] text-white hover:bg-[#0f4c81]/90">Actualizar plan</Button>
            </CardContent>
          </Card>
        </div>

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