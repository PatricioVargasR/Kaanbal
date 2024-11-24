import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const questionData = {
  question: "What is the solution to the equation 2x + 5 = 13?",
  options: ["x = 3", "x = 4", "x = 5", "x = 6"],
  progress: 60,
};

export default function QuestionPage() {
  return (
    <div className="space-y-6 px-4 sm:px-6">
      {/* Progreso de la pregunta */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#0f4c81] text-center md:text-left">
          Question
        </h1>
        <Progress value={questionData.progress} className="mt-2" />
      </div>

      {/* Tarjeta con la pregunta y opciones */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl text-center md:text-left">
            {questionData.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup className="space-y-4">
            {questionData.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} aria-label={option} />
                <Label htmlFor={`option-${index}`} className="text-sm md:text-base">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Botones */}
          <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <Button className="bg-[#0f4c81] hover:bg-[#98bee0] w-full sm:w-auto">
              Verify
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Botón para explicación */}
      <Button variant="link" className="text-[#0f4c81] block w-full text-center sm:w-auto">
        Show Explanation
      </Button>
    </div>
  );
}
