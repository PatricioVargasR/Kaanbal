import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const recentActivities = [
  { title: "Completed Algebra Unit", date: "2023-06-15" },
  { title: "Started Chemistry Basics", date: "2023-06-14" },
  { title: "Reviewed World History", date: "2023-06-13" },
]

const popularTopics = [
  { title: "Mathematics", icon: "📐" },
  { title: "Science", icon: "🧪" },
  { title: "Literature", icon: "📚" },
  { title: "History", icon: "🏛️" },
  { title: "Languages", icon: "🗣️" },
]

export default function LearningPage() {
  return (
      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0f4c81]">Recent Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentActivities.map((activity, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{activity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{activity.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        <section className="bg-[#c4d8e9] p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">New Feature Announcement</h2>
          <p>Check out our new AI-powered study assistant!</p>
          <Button className="mt-2 bg-[#0f4c81] hover:bg-[#98bee0]">Learn More</Button>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0f4c81]">Popular Topics</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {popularTopics.map((topic, index) => (
              <Card key={index} className="flex-shrink-0 w-40">
                <CardHeader>
                  <CardTitle className="text-center">{topic.icon}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center">{topic.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
  )
}