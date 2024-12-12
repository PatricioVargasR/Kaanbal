import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const explanationData = {
  question: "What is the solution to the equation 2x + 5 = 13?",
  explanation:
    "To solve this equation, we need to isolate x on one side. Here's how we do it:\n\n1. Subtract 5 from both sides: 2x = 8\n2. Divide both sides by 2: x = 4\n\nTherefore, the solution is x = 4.",
  tips: [
    "Always perform the same operation on both sides of the equation.",
    "Use inverse operations to isolate the variable.",
    "Check your answer by substituting it back into the original equation.",
  ],
};

export default function ExplanationPage() {
  return (
    <div className="space-y-6 px-4 sm:px-6">
      {/* Título */}
      <h1 className="text-2xl md:text-3xl font-bold text-[#0f4c81] text-center md:text-left">
        Explanation
      </h1>

      {/* Explicación */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">{explanationData.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line text-sm md:text-base leading-relaxed">
            {explanationData.explanation}
          </p>
        </CardContent>
      </Card>

      {/* Consejos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
            {explanationData.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Botón de regreso */}
      <Button className="bg-[#0f4c81] hover:bg-[#98bee0] w-full sm:w-auto">
        Back to Questions
      </Button>
    </div>
  );
}
