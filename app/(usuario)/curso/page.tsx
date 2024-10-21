import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const courseData = {
  topic: "Algebra",
  unit: "Linear Equations",
  totalExercises: 20,
  completedExercises: 12,
  currentQuestion: {
    type: "Multiple Choice",
    text: "Solve for x: 2x + 5 =   13",
  },
}

const topics = [
  { name: "Linear Equations", status: "in progress" },
  { name: "Quadratic Equations", status: "not studied" },
  { name: "Systems of Equations", status: "not studied" },
]

export default function CoursePage() {
  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#0f4c81]">{courseData.topic}: {courseData.unit}</h1>
          <p>Progress: {courseData.completedExercises}/{courseData.totalExercises} exercises completed</p>
          <Progress value={(courseData.completedExercises / courseData.totalExercises) * 100} className="mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Questions</CardTitle>
            </CardHeader>
            <CardContent>{courseData.totalExercises}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Completed</CardTitle>
            </CardHeader>
            <CardContent>{courseData.completedExercises}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Remaining</CardTitle>
            </CardHeader>
            <CardContent>{courseData.totalExercises - courseData.completedExercises}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Accuracy</CardTitle>
            </CardHeader>
            <CardContent>85%</CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{courseData.currentQuestion.type}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{courseData.currentQuestion.text}</p>
            <div className="mt-4 space-x-4">
              <Button>Previous</Button>
              <Button>Next</Button>
            </div>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-bold text-[#0f4c81] mb-4">Topics</h2>
          {topics.map((topic, index) => (
            <Card key={index} className="mb-2">
              <CardContent className="flex justify-between items-center">
                <span>{topic.name}</span>
                <span className={topic.status === "in progress" ? "text-[#0f4c81]" : "text-gray-500"}>
                  {topic.status}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
  )
}