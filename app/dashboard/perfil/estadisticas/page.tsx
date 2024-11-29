"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	PieChart,
	Pie,
	Cell,
} from "recharts";

const COLORS = ["#0f4c81", "#98bee0"];

// Gráfico de línea genérico
function LineChartCard({
	title,
	data,
	xKey,
	yKey,
}: {
	title: string;
	data: any[];
	xKey: string;
	yKey: string;
}) {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey={xKey} />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line type="monotone" dataKey={yKey} stroke="#0f4c81" />
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}

// Gráfico de pastel genérico
function PieChartCard({ title, data }: { title: string; data: any[] }) {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={300}>
					<PieChart>
						<Pie
							data={data}
							cx="50%"
							cy="50%"
							labelLine={false}
							outerRadius={80}
							fill="#8884d8"
							dataKey="value"
						>
							{data.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Pie>
						<Tooltip />
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}

export default function StatisticsPage() {
	const performanceData = [
		{ date: "2023-06-01", Puntuación: 75 },
		{ date: "2023-06-08", Puntuación: 80 },
		{ date: "2023-06-15", Puntuación: 85 },
		{ date: "2023-06-22", Puntuación: 82 },
		{ date: "2023-06-29", Puntuación: 88 },
	];

	const questionData = [
		{ name: "Correcto", value: 300 },
		{ name: "Incorrecto", value: 50 },
	];

	const topicData = [
		{ name: "Matemáticas", Conteo: 50 },
		{ name: "Ciencias", Conteo: 40 },
		{ name: "Historia", Conteo: 30 },
		{ name: "Literatura", Conteo: 20 },
		{ name: "Lenguajes", Conteo: 10 },
	];

	return (
		<div className="space-y-6 px-4 sm:px-6">
			<h1 className="text-2xl md:text-3xl font-bold text-[#0f4c81] text-center md:text-left">
				Estadísticas
			</h1>

			{/* Gráfico de rendimiento */}
			<LineChartCard
				title="Rendimiento a lo largo del tiempo"
				data={performanceData}
				xKey="date"
				yKey="Puntuación"
			/>

			{/* Gráficos secundarios */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<PieChartCard
					title="Preguntas respondidas"
					data={questionData}
				/>
				<LineChartCard
					title="Temas vistos"
					data={topicData}
					xKey="name"
					yKey="Conteo"
				/>
			</div>
		</div>
	);
}
