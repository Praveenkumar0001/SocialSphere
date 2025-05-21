"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ContentScheduler } from "@/components/content-scheduler"
import { Plus, CalendarIcon, List, Grid3X3 } from "lucide-react"

export default function ContentCalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState<"calendar" | "list" | "scheduler">("calendar")

  // Mock scheduled posts data
  const scheduledPosts = [
    {
      id: "post-1",
      content:
        "Excited to announce our new product launch next week! Stay tuned for more details. #ProductLaunch #Innovation",
      date: new Date(Date.now() + 86400000 * 2), // 2 days from now
      time: "14:30",
      visibility: "public",
    },
    {
      id: "post-2",
      content:
        "Behind the scenes look at our team working on the upcoming features. Can't wait to share what we've been building!",
      date: new Date(Date.now() + 86400000 * 5), // 5 days from now
      time: "10:00",
      media: ["/placeholder.svg?height=300&width=400"],
      visibility: "followers",
    },
    {
      id: "post-3",
      content:
        "Happy Friday everyone! What are your weekend plans? Drop a comment below! 👇 #FridayFeeling #WeekendVibes",
      date: new Date(Date.now() + 86400000 * 7), // 7 days from now
      time: "17:00",
      visibility: "public",
    },
  ]

  // Get posts for the selected date
  const getPostsForDate = (date: Date | undefined) => {
    if (!date) return []

    return scheduledPosts.filter((post) => {
      const postDate = new Date(post.date)
      return (
        postDate.getDate() === date.getDate() &&
        postDate.getMonth() === date.getMonth() &&
        postDate.getFullYear() === date.getFullYear()
      )
    })
  }

  // Get dates with posts for calendar highlighting
  const getDatesWithPosts = () => {
    return scheduledPosts.map((post) => new Date(post.date))
  }

  const selectedDatePosts = getPostsForDate(date)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Content Calendar</h1>
          <p className="text-gray-500 dark:text-gray-400">Schedule and manage your social media content</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={view === "calendar" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("calendar")}
            className="flex items-center gap-1"
          >
            <CalendarIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Calendar</span>
          </Button>
          <Button
            variant={view === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("list")}
            className="flex items-center gap-1"
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">List</span>
          </Button>
          <Button
            variant={view === "scheduler" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("scheduler")}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(view === "calendar" || view === "list") && (
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Select a date to view scheduled posts</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  modifiers={{
                    booked: getDatesWithPosts(),
                  }}
                  modifiersStyles={{
                    booked: {
                      fontWeight: "bold",
                      backgroundColor: "rgba(139, 92, 246, 0.1)",
                      color: "#8b5cf6",
                    },
                  }}
                />

                <div className="mt-4">
                  <h3 className="font-medium mb-2">
                    {date
                      ? date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
                      : "No date selected"}
                  </h3>

                  {selectedDatePosts.length > 0 ? (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedDatePosts.length} post{selectedDatePosts.length !== 1 ? "s" : ""} scheduled
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 dark:text-gray-400">No posts scheduled for this date</div>
                  )}

                  <Button variant="outline" size="sm" className="mt-2 w-full" onClick={() => setView("scheduler")}>
                    <Plus className="h-4 w-4 mr-1" />
                    Schedule for this date
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className={`${view === "scheduler" ? "md:col-span-3" : "md:col-span-2"}`}>
          {view === "calendar" && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {date
                    ? date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                    : "Selected Date"}
                </CardTitle>
                <CardDescription>
                  {selectedDatePosts.length > 0
                    ? `${selectedDatePosts.length} post${selectedDatePosts.length !== 1 ? "s" : ""} scheduled for this date`
                    : "No posts scheduled for this date"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDatePosts.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDatePosts.map((post) => (
                      <Card key={post.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{post.time}</div>
                            <div className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full dark:bg-purple-900 dark:text-purple-300">
                              {post.visibility}
                            </div>
                          </div>
                          <p className="mb-2">{post.content}</p>
                          {post.media && post.media.length > 0 && (
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {post.media.map((src, index) => (
                                <img
                                  key={index}
                                  src={src || "/placeholder.svg"}
                                  alt="Media"
                                  className="rounded-md h-24 w-full object-cover"
                                />
                              ))}
                            </div>
                          )}
                          <div className="flex gap-2 mt-3">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Grid3X3 className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No posts scheduled</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      There are no posts scheduled for this date. Create a new post to get started.
                    </p>
                    <Button onClick={() => setView("scheduler")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Post
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {view === "list" && (
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Posts</CardTitle>
                <CardDescription>All your scheduled content in one place</CardDescription>
              </CardHeader>
              <CardContent>
                {scheduledPosts.length > 0 ? (
                  <div className="space-y-4">
                    {scheduledPosts
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .map((post) => (
                        <Card key={post.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} at{" "}
                                {post.time}
                              </div>
                              <div className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full dark:bg-purple-900 dark:text-purple-300">
                                {post.visibility}
                              </div>
                            </div>
                            <p className="mb-2">{post.content}</p>
                            {post.media && post.media.length > 0 && (
                              <div className="grid grid-cols-2 gap-2 mt-2">
                                {post.media.map((src, index) => (
                                  <img
                                    key={index}
                                    src={src || "/placeholder.svg"}
                                    alt="Media"
                                    className="rounded-md h-24 w-full object-cover"
                                  />
                                ))}
                              </div>
                            )}
                            <div className="flex gap-2 mt-3">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                                Delete
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Grid3X3 className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No posts scheduled</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      You don't have any posts scheduled. Create a new post to get started.
                    </p>
                    <Button onClick={() => setView("scheduler")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Post
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {view === "scheduler" && <ContentScheduler />}
        </div>
      </div>
    </div>
  )
}
