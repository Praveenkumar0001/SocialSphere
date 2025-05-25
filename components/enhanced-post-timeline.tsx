"use client"

import { useState, useEffect } from "react"
import { PostCard } from "@/components/post-card"
import { Stories } from "@/components/stories"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageIcon, Video, MapPin, Smile, Calendar, Users, Plus, FileText, BarChart3 } from "lucide-react"
import { getCurrentUser, posts, users } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"
import { ContentScheduler } from "@/components/content-scheduler"
import { AIRecommendations } from "@/components/ai-recommendations"

export function EnhancedPostTimeline() {
  const [newPostContent, setNewPostContent] = useState("")
  const [selectedPostType, setSelectedPostType] = useState<"text" | "image" | "video" | "poll" | "event">("text")
  const [timelinePosts, setTimelinePosts] = useState(posts)
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const [showScheduler, setShowScheduler] = useState(false)
  const currentUser = getCurrentUser()
  const { toast } = useToast()

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Add engagement simulation
      setTimelinePosts((prev) =>
        prev.map((post) => ({
          ...post,
          likes: post.likes.length > 0 ? [...post.likes, `user-${Math.random()}`] : post.likes,
        })),
      )
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) {
      toast({
        title: "Content required",
        description: "Please add some content to your post",
        variant: "destructive",
      })
      return
    }

    setIsCreatingPost(true)

    try {
      // Simulate post creation
      const newPost = {
        id: `post-${Date.now()}`,
        userId: currentUser.id,
        content: newPostContent,
        images: selectedPostType === "image" ? ["/placeholder.svg?height=400&width=600&text=New+Post"] : undefined,
        createdAt: new Date().toISOString(),
        likes: [],
        comments: [],
        shares: 0,
        mentions: [],
        hashtags: extractHashtags(newPostContent),
        type: selectedPostType.toUpperCase(),
        poll: selectedPostType === "poll" ? createSamplePoll() : undefined,
      }

      setTimelinePosts((prev) => [newPost, ...prev])
      setNewPostContent("")
      setSelectedPostType("text")

      toast({
        title: "Post created!",
        description: "Your post has been shared successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCreatingPost(false)
    }
  }

  const extractHashtags = (content: string): string[] => {
    const hashtags = content.match(/#\w+/g)
    return hashtags ? hashtags.map((tag) => tag.substring(1)) : []
  }

  const createSamplePoll = () => ({
    id: `poll-${Date.now()}`,
    question: "What type of content do you want to see more of?",
    options: [
      { id: "opt1", text: "Photos", votes: [] },
      { id: "opt2", text: "Videos", votes: [] },
      { id: "opt3", text: "Stories", votes: [] },
      { id: "opt4", text: "Live streams", votes: [] },
    ],
    isMultipleChoice: false,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  })

  const postTypes = [
    { type: "text", icon: FileText, label: "Text", color: "bg-blue-100 text-blue-600" },
    { type: "image", icon: ImageIcon, label: "Photo", color: "bg-green-100 text-green-600" },
    { type: "video", icon: Video, label: "Video", color: "bg-purple-100 text-purple-600" },
    { type: "poll", icon: BarChart3, label: "Poll", color: "bg-orange-100 text-orange-600" },
    { type: "event", icon: Calendar, label: "Event", color: "bg-pink-100 text-pink-600" },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Stories Section */}
      <Stories currentUser={currentUser} stories={[]} users={users} />

      {/* Create Post Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create Post
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="What's on your mind?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="min-h-[100px] resize-none border-0 focus-visible:ring-0 text-lg"
              />
            </div>
          </div>

          {/* Post Type Selection */}
          <div className="flex flex-wrap gap-2">
            {postTypes.map((type) => (
              <Button
                key={type.type}
                variant={selectedPostType === type.type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPostType(type.type as any)}
                className="flex items-center gap-2"
              >
                <type.icon className="h-4 w-4" />
                {type.label}
              </Button>
            ))}
          </div>

          {/* Additional Options */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                Location
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500">
                <Users className="h-4 w-4 mr-1" />
                Tag People
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500">
                <Smile className="h-4 w-4 mr-1" />
                Feeling
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500"
                onClick={() => setShowScheduler(!showScheduler)}
              >
                <Calendar className="h-4 w-4 mr-1" />
                Schedule
              </Button>
            </div>
            <Button onClick={handleCreatePost} disabled={!newPostContent.trim() || isCreatingPost}>
              {isCreatingPost ? "Posting..." : "Post"}
            </Button>
          </div>

          {/* Content Scheduler */}
          {showScheduler && (
            <div className="pt-4 border-t">
              <ContentScheduler />
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <AIRecommendations currentUser={currentUser} allUsers={users} allPosts={timelinePosts} />

      {/* Timeline Posts */}
      <div className="space-y-6">
        {timelinePosts.map((post) => {
          const author = users.find((u) => u.id === post.userId) || currentUser
          return (
            <PostCard
              key={post.id}
              post={post}
              author={author}
              currentUserId={currentUser.id}
              onUpdate={(updatedPost) => {
                setTimelinePosts((prev) => prev.map((p) => (p.id === updatedPost.id ? updatedPost : p)))
              }}
            />
          )
        })}
      </div>

      {/* Load More */}
      <div className="text-center py-8">
        <Button variant="outline" size="lg">
          Load More Posts
        </Button>
      </div>
    </div>
  )
}
