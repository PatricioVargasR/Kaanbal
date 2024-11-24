'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0f4c81", "#98bee0"];

// Gráfico de línea genérico
function LineChartCard({ title, data, xKey, yKey }: { title: string; data: any[]; xKey: string; yKey: string }) {
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
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
    { date: "2023-06-01", score: 75 },
    { date: "2023-06-08", score: 80 },
    { date: "2023-06-15", score: 85 },
    { date: "2023-06-22", score: 82 },
    { date: "2023-06-29", score: 88 },
  ];

  const questionData = [
    { name: "Correct", value: 300 },
    { name: "Incorrect", value: 50 },
  ];

  const topicData = [
    { name: "Math", count: 50 },
    { name: "Science", count: 40 },
    { name: "History", count: 30 },
    { name: "Literature", count: 20 },
    { name: "Languages", count: 10 },
  ];

  return (
    <div className="space-y-6 px-4 sm:px-6">
      <h1 className="text-2xl md:text-3xl font-bold text-[#0f4c81] text-center md:text-left">Statistics</h1>

      {/* Gráfico de rendimiento */}
      <LineChartCard
        title="Performance Over Time"
        data={performanceData}
        xKey="date"
        yKey="score"
      />

      {/* Gráficos secundarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PieChartCard title="Questions Answered" data={questionData} />
        <LineChartCard title="Topics Viewed" data={topicData} xKey="name" yKey="count" />
      </div>
    </div>
  );
}
