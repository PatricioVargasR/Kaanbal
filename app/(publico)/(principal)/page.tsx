import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ArrowRight,
	BookOpen,
	CheckCircle,
	BarChart2,
	Zap,
	HeadphonesIcon,
	Brain,
} from "lucide-react";
import Link from "next/link";
import { Book, FlaskConical, Combine, Lightbulb } from 'lucide-react'

const activities = [
	{ title: "Aprender", icon: Book, image: "/aprender.png", color: "bg-[#98bee0]" },
	{ title: "Probar", icon: FlaskConical, image: "/probar.png", color: "bg-[#c4d8e9]" },
	{ title: "Combinar", icon: Combine, image: "/combinar.png", color: "bg-[#98bee0]" },
	{ title: "Soluciones de experto", icon: Lightbulb, image: "/soluciones.png", color: "bg-[#c4d8e9]" },
  ]

export default function Main() {
	return (
		<main className="container mx-auto px-4 py-8">
			<section className="flex flex-col md:flex-row items-center mb-16">
				<div className="md:w-1/2 mb-8 md:mb-0">
					<h1 className="text-4xl font-bold mb-4">
						Revoluciona tu forma de estudiar con esta herramienta de
						IA
					</h1>
					<p className="mb-6">
						Genera contenido educativo dinámico y personalizado de
						manera sencilla. Ya sea que necesites ejercicios,
						resúmenes o evaluaciones, nuestra plataforma lo adapta a
						tus necesidades.
					</p>
					<div className="space-x-4">
						<Link href="login" passHref>
							<Button className="bg-[#0f4c81] text-white hover:bg-[#0f4c81]/90">
								Inicia gratis
							</Button>
						</Link>
						<Link href="precios" passHref>
							<Button
								variant="outline"
								className="border-[#0f4c81] text-[#0f4c81]"
							>
								Ver planes
							</Button>
						</Link>
					</div>
				</div>
				<div className="md:w-1/2">
					<Image
						src="/principal.png"
						width={400}
						height={400}
						className="w-full"
						alt="Estudiante usando Kaanbal"
					/>
				</div>
			</section>

			<section className="mb-16">
				<h2 className="text-2xl font-bold text-center mb-8">
					¿Cómo quieres estudiar?
				</h2>
				<p className="text-center mb-8">
					Domina lo que estás estudiando gracias a los diferentes
					tipos de actividades de estudio que puedes encontrar en
					Kaanbal.
				</p>
				{/* Corregir en modo resize */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
					{activities.map((activity, index) => (
						<Card key={index} className={`${activity.color} relative overflow-hidden sm:h-[200px] md:h-[350px]`}>
							<CardHeader className="z-10 relative">
								<CardTitle className="text-xl sm:text-2xl font-bold flex items-center">
									<activity.icon className="w-6 h-6 mr-2 sm:hidden" />
									{activity.title}
								</CardTitle>
							</CardHeader>
							<CardContent className="p-0 absolute inset-0">
								<div className="relative w-full h-full hidden sm:block">
									<Image
										src={activity.image}
										fill
										className="object-contain object-right-bottom"
										alt={activity.title}
									/>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			<section className="mb-16">
				<h2 className="text-2xl font-bold text-center mb-8">
					Características principales
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center">
								<BookOpen className="mr-2" />
								{/* Generación de Actividades Personalizadas */}
								Generación de Actividades
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								Convierte tus notas en actividades interactivas
								en segundos, adaptadas a tus necesidades.
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center">
								<BarChart2 className="mr-2" />
								Progreso y estadísticas
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								Visualiza tu rendimiento y recibe
								recomendaciones para mejorar en tiempo real.
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center">
								<CheckCircle className="mr-2" />
								Retroalimentación
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								Recibe correcciones y sugerencias que te ayudan
								a identificar áreas clave de mejora.
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center">
								<Zap className="mr-2" />
								Interfaz Intuitiva
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								Fácil de usar desde cualquier dispositivo, sin
								complicaciones.
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center">
								<HeadphonesIcon className="mr-2" />
								Soporte Prioritario
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								Disfruta de asistencia técnica y educativa
								rápida y eficiente.
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center">
								<Brain className="mr-2" />
								Inteligencia Artificial
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								Aprende a tu ritmo con contenido generado
								automáticamente para ti, desde el nivel básico
								hasta avanzado.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>

			<section className="mb-16">
				<h2 className="text-2xl font-bold text-center mb-8">
					Kaanbal es perfecto para...
				</h2>
				<div className="flex flex-wrap justify-center gap-8">
					{["Alumnos", "Profesores", "Personas"].map(
						(user, index) => (
							<Card key={index} className="w-64">
								<CardHeader>
									<CardTitle className="text-center">
										{user}
									</CardTitle>
								</CardHeader>
								<CardContent className="flex justify-center">
									<Image
										src={`/${user}.png`}
										width={300}
										height={300}
										alt={user}
									/>
									{/* <img src={`/placeholder.svg?height=100&width=100&text=${user}`} alt={user} className="rounded-full" /> */}
								</CardContent>
							</Card>
						)
					)}
				</div>
			</section>

			<Card className="bg-[#98bee0] mb-12">
				<CardContent className="flex flex-col md:flex-row items-center justify-between p-6">
					<div>
						<h3 className="text-xl font-bold mb-2">
							¿Estás listo para conocer a tu nuevo acompañante de
							estudio?
						</h3>
						<p>
							¡Toma acción ahora para marcar la diferencia en tu
							estudio! Ya sea desde un tema que te apasiona hasta
							algo que te agobia.
						</p>
					</div>
					<Link href="login" passHref>
							<Button className="bg-[#0f4c81] text-white hover:bg-[#0f4c81]/90 mt-4 md:mt-0">
								Comenzar gratis
							</Button>
						</Link>

				</CardContent>
			</Card>
		</main>
	);
}
