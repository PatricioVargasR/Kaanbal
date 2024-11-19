'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts'

// TODO: Componetizarlo

const performanceData = [
  { date: '2023-06-01', score: 75 },
  { date: '2023-06-08', score: 80 },
  { date: '2023-06-15', score: 85 },
  { date: '2023-06-22', score: 82 },
  { date: '2023-06-29', score: 88 },
]

const questionData = [
  { name: 'Correct', value: 300 },
  { name: 'Incorrect', value: 50 },
]

const COLORS = ['#0f4c81', '#98bee0']

const topicData = [
  { name: 'Math', count: 50 },
  { name: 'Science', count: 40 },
  { name: 'History', count: 30 },
  { name: 'Literature', count: 20 },
  { name: 'Languages', count: 10 },
]

export default function StatisticsPage() {
  return (
    <div className="space-y-6">
        <h1 className="text-3xl font-bold text-[#0f4c81]">Statistics</h1>

        <Card>
            <CardHeader>
                <CardTitle>Performance Over Time</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="score" stroke="#0f4c81" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Questions Answered</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                            data={questionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            >
                            {questionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Topics Viewed</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={topicData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#0f4c81" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}