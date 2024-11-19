import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Trash2 } from 'lucide-react'

const conversations = [
  { title: "Math Homework", pages: 3, size: "1.2 MB" },
  { title: "History Essay", pages: 5, size: "2.1 MB" },
  { title: "Science Lab Report", pages: 7, size: "3.5 MB" },
]

export default function UserNotesPage() {
  return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#0f4c81]">Chat</h1>
          <Button className="bg-[#0f4c81] hover:bg-[#98bee0]">New Conversation</Button>
        </div>

        <div className="space-y-4">
          {conversations.map((conversation, index) => (
            <Card key={index}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <FileText size={24} />
                  <div>
                    <h3 className="font-semibold">{conversation.title}</h3>
                    <p className="text-sm text-gray-500">{conversation.pages} pages • {conversation.size}</p>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button variant="outline">Open</Button>
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
  )
}