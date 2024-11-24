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
    text: "Solve for x: 2x + 5 = 13",
  },
}

const topics = [
  { name: "Linear Equations", status: "in progress" },
  { name: "Quadratic Equations", status: "not studied" },
  { name: "Systems of Equations", status: "not studied" },
]

export default function CoursePage() {
  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0f4c81] break-words">
          {courseData.topic}: {courseData.unit}
        </h1>
        <p className="text-sm sm:text-base mt-2">
          Progress: {courseData.completedExercises}/{courseData.totalExercises} exercises completed
        </p>
        <Progress 
          value={(courseData.completedExercises / courseData.totalExercises) * 100} 
          className="mt-2"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-sm sm:text-base">Total Questions</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0 sm:pt-2 text-lg sm:text-xl font-semibold">
            {courseData.totalExercises}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-sm sm:text-base">Completed</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0 sm:pt-2 text-lg sm:text-xl font-semibold">
            {courseData.completedExercises}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-sm sm:text-base">Remaining</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0 sm:pt-2 text-lg sm:text-xl font-semibold">
            {courseData.totalExercises - courseData.completedExercises}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-sm sm:text-base">Accuracy</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0 sm:pt-2 text-lg sm:text-xl font-semibold">
            85%
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">{courseData.currentQuestion.type}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <p className="text-sm sm:text-base mb-4">{courseData.currentQuestion.text}</p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Button className="w-full sm:w-auto">Previous</Button>
            <Button className="w-full sm:w-auto">Next</Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0f4c81] mb-4">Topics</h2>
        {topics.map((topic, index) => (
          <Card key={index} className="mb-2">
            <CardContent className="flex justify-between items-center p-3 sm:p-4">
              <span className="text-sm sm:text-base">{topic.name}</span>
              <span className={`text-xs sm:text-sm ${topic.status === "in progress" ? "text-[#0f4c81]" : "text-gray-500"}`}>
                {topic.status}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

