'use client'
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check} from 'lucide-react'

export function PrincingTable() {
  const [isAnnual, setIsAnnual] = useState(false)

    return (
        <>
            <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Todos nuestros planes</h2>
            <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${!isAnnual ? 'bg-[#0f4c81] text-white' : 'bg-white text-[#0f4c81]'}`}
                // className={`px-4 py-2 text-sm font-medium rounded-l-lg bg-[#0f4c81] text-white`}
                onClick={() => setIsAnnual(false)}
            >
                Mensual
            </button>
            <button
                type="button"
                // className={`px-4 py-2 text-sm font-medium rounded-l-lg`}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${isAnnual ? 'bg-[#0f4c81] text-white' : 'bg-white text-[#0f4c81]'}`}
                onClick={() => setIsAnnual(true)}
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
                <Button className="w-full mt-4 bg-[#0f4c81] text-white hover:bg-[#0f4c81]/90">Iniciar plan </Button>
            </CardContent>
            </Card>

            <Card className="w-full md:w-80 bg-[#c4d8e9]">
            <CardHeader>
                <CardTitle className="text-center">
                <span className="text-2xl font-bold">Premium</span>
                <p className="text-4xl font-bold mt-2">${isAnnual ? '1000' : '100'}<span className="text-base font-normal">{isAnnual ? '/año' : '/mes'}</span></p>
                {/* <p className="text-4xl font-bold mt-2">$1000<span className="text-base font-normal">/año</span></p> */}
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
    </>
    )
}