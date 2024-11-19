import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

const questionData = {
  question: "What is the solution to the equation 2x + 5 = 13?",
  options: ["x = 3", "x = 4", "x = 5", "x = 6"],
  progress: 60,
}

export default function QuestionPage() {
  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#0f4c81]">Question</h1>
          <Progress value={questionData.progress} className="mt-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{questionData.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup>
              {questionData.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
            <div className="mt-4 space-x-4">
              <Button className="bg-[#0f4c81] hover:bg-[#98bee0]">Verify</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </CardContent>
        </Card>

        <Button variant="link" className="text-[#0f4c81]">Show Explanation</Button>
      </div>
  )
}