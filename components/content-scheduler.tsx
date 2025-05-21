"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { CalendarIcon, Clock, ImageIcon, Users, Globe, Lock, Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface ScheduledPost {
  id: string
  content: string
  date: Date
  time: string
  media?: string[]
  visibility: "public" | "followers" | "private"
}

export function ContentScheduler() {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>("12:00")
  const [content, setContent] = useState<string>("")
  const [media, setMedia] = useState<string[]>([])
  const [visibility, setVisibility] = useState<"public" | "followers" | "private">("public")
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
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
  ])
  const [activeTab, setActiveTab] = useState<string>("compose")

  const handleAddMedia = () => {
    // In a real app, this would open a file picker
    const newMedia = `/placeholder.svg?height=${300 + Math.floor(Math.random() * 100)}&width=${400 + Math.floor(Math.random() * 100)}`
    setMedia([...media, newMedia])
  }

  const handleRemoveMedia = (index: number) => {
    const newMedia = [...media]
    newMedia.splice(index, 1)
    setMedia(newMedia)
  }

  const handleSchedulePost = () => {
    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please add some content to your post before scheduling.",
        variant: "destructive",
      })
      return
    }

    if (!date) {
      toast({
        title: "Date required",
        description: "Please select a date for your scheduled post.",
        variant: "destructive",
      })
      return
    }

    const newPost: ScheduledPost = {
      id: `post-${Date.now()}`,
      content,
      date,
      time,
      media: media.length > 0 ? [...media] : undefined,
      visibility,
    }

    setScheduledPosts([...scheduledPosts, newPost])

    // Reset form
    setContent("")
    setDate(undefined)
    setTime("12:00")
    setMedia([])
    setVisibility("public")

    // Switch to scheduled tab
    setActiveTab("scheduled")

    toast({
      title: "Post scheduled",
      description: `Your post has been scheduled for ${format(date, "PPP")} at ${time}.`,
    })
  }

  const handleDeleteScheduledPost = (id: string) => {
    setScheduledPosts(scheduledPosts.filter((post) => post.id !== id))

    toast({
      title: "Post removed",
      description: "The scheduled post has been removed.",
    })
  }

  const getVisibilityIcon = (visibility: "public" | "followers" | "private") => {
    switch (visibility) {
      case "public":
        return <Globe className="h-4 w-4" />
      case "followers":
        return <Users className="h-4 w-4" />
      case "private":
        return <Lock className="h-4 w-4" />
    }
  }

  const getVisibilityLabel = (visibility: "public" | "followers" | "private") => {
    switch (visibility) {
      case "public":
        return "Public"
      case "followers":
        return "Followers only"
      case "private":
        return "Private"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Content Scheduler</CardTitle>
        <CardDescription>Schedule your posts in advance for optimal engagement</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled ({scheduledPosts.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="compose" className="space-y-4 pt-4">
            <div>
              <Textarea
                placeholder="What's on your mind?"
                className="min-h-[120px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {media.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {media.map((src, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={src || "/placeholder.svg"}
                      alt="Media preview"
                      className="rounded-md h-24 w-full object-cover"
                    />
                    <button
                      className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveMedia(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleAddMedia} className="flex items-center gap-1">
                <ImageIcon className="h-4 w-4" />
                <span>Add Media</span>
              </Button>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{date ? format(date, "PPP") : "Schedule Date"}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>

              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-gray-500" />
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger className="h-9 w-[110px]">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }).map((_, hour) => (
                      <>
                        <SelectItem key={`${hour}:00`} value={`${hour.toString().padStart(2, "0")}:00`}>
                          {hour.toString().padStart(2, "0")}:00
                        </SelectItem>
                        <SelectItem key={`${hour}:30`} value={`${hour.toString().padStart(2, "0")}:30`}>
                          {hour.toString().padStart(2, "0")}:30
                        </SelectItem>
                      </>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Select
                value={visibility}
                onValueChange={(value: "public" | "followers" | "private") => setVisibility(value)}
              >
                <SelectTrigger className="h-9 w-[140px]">
                  <SelectValue placeholder="Visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>Public</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="followers">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Followers</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="private">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      <span>Private</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="scheduled" className="pt-4">
            {scheduledPosts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No scheduled posts yet.</p>
                <Button variant="link" onClick={() => setActiveTab("compose")} className="mt-2">
                  Create your first scheduled post
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {scheduledPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{format(post.date, "PPP")}</span>
                            <span>•</span>
                            <Clock className="h-4 w-4" />
                            <span>{post.time}</span>
                            <span>•</span>
                            {getVisibilityIcon(post.visibility)}
                            <span>{getVisibilityLabel(post.visibility)}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteScheduledPost(post.id)}
                          className="h-8 w-8 p-0 text-gray-500 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="whitespace-pre-wrap">{post.content}</p>
                      {post.media && post.media.length > 0 && (
                        <div className="mt-3 grid grid-cols-2 gap-2">
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        {activeTab === "compose" && (
          <Button onClick={handleSchedulePost} className="ml-auto">
            Schedule Post
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
