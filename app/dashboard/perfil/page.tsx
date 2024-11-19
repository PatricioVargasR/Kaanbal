import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const userData = {
  name: "John Doe",
  country: "United States",
  stats: [
    { label: "Completed Courses", value: 12 },
    { label: "Hours Studied", value: 87 },
    { label: "Achievements", value: 15 },
  ],
  achievements: [
    { name: "Fast Learner", progress: 80 },
    { name: "Quiz Master", progress: 60 },
    { name: "Consistent Studier", progress: 90 },
  ],
}

export default function ProfilePage() {
  return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/placeholder-avatar.jpg" alt={userData.name} />
            <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-[#0f4c81]">{userData.name}</h1>
            <p>{userData.country}</p>
          </div>
          <Button variant="outline">Change Avatar</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userData.stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.achievements.map((achievement, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span>{achievement.name}</span>
                    <span>{achievement.progress}%</span>
                  </div>
                  <Progress value={achievement.progress} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  )
}