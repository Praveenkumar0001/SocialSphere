"use client"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { InteractiveTutorial } from "@/components/interactive-tutorial"

export default function DashboardClient() {
  const { toast } = useToast()

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <InteractiveTutorial />
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Posts</CardTitle>
            <CardDescription>Number of posts on your blog</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Views</CardTitle>
            <CardDescription>Total views on all posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,500</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Subscribers</CardTitle>
            <CardDescription>New subscribers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35</div>
          </CardContent>
        </Card>
      </div>
      <Button
        onClick={() =>
          toast({
            title: "Scheduled: Catch up with Brian",
            description: "Friday, February 10, 2023 at 5:30 PM",
          })
        }
      >
        Schedule Catch Up
      </Button>
    </div>
  )
}
