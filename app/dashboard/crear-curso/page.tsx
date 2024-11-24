import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function CreateUnitPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl font-bold text-center text-[#0f4c81]">Configure and Start</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4 sm:p-6">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="math">Mathematics</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="literature">Literature</SelectItem>
              <SelectItem value="history">History</SelectItem>
              <SelectItem value="language">Languages</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="algebra">Algebra</SelectItem>
              <SelectItem value="geometry">Geometry</SelectItem>
              <SelectItem value="calculus">Calculus</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Number of questions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Education level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="secondary">Secondary School</SelectItem>
              <SelectItem value="high">High School</SelectItem>
            </SelectContent>
          </Select>

          <Button className="w-full bg-[#0f4c81] hover:bg-[#98bee0] text-white font-semibold py-2 px-4 rounded transition-colors duration-200">
            Start
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

