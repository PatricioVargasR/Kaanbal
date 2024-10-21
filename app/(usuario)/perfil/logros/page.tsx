import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Clock, Book, Target, Zap } from 'lucide-react'

const achievements = [
  { name: "Fast Learner", icon: Zap, progress: 80, description: "Complete 5 lessons in under 30 minutes each" },
  { name: "Quiz Master", icon: Star, progress: 60, description: "Score 100% on 10 quizzes" },
  { name: "Consistent Studier", icon: Clock, progress: 90, description: "Study for 7 consecutive days" },
  { name: "Bookworm", icon: Book, progress: 40, description: "Read 20 articles in the library" },
  { name: "Goal Setter", icon: Target, progress: 20, description: "Complete all goals for a month" },
  { name: "Champion", icon: Trophy, progress: 10, description: "Reach the top of the leaderboard" },
]

export default function AchievementsPage() {
  return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-[#0f4c81]">Achievements</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <achievement.icon className="h-6 w-6" />
                  <span>{achievement.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{achievement.description}</p>
                <div className="flex justify-between mb-1">
                  <span>Progress</span>
                  <span>{achievement.progress}%</span>
                </div>
                <Progress value={achievement.progress} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
  )
}