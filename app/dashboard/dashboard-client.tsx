"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostCard } from "@/components/post-card"
import { Stories } from "@/components/stories"
import { TrendingTopics } from "@/components/trending-topics"
import { SavedCollections } from "@/components/saved-collections"
import { AIRecommendations } from "@/components/ai-recommendations"
import { LivePoll } from "@/components/live-poll"
import { ARFilters } from "@/components/ar-filters"
import { EventCreator } from "@/components/event-creator"
import { CollaborativeWhiteboard } from "@/components/collaborative-whiteboard"
import { ImageIcon, MapPin, BarChart3, Smile, Calendar, Send, Sparkles } from "lucide-react"
import { currentUser, users, posts } from "@/lib/data"
import { useToast } from "@/components/ui/use-toast"
import type { Post, TrendingTopic, Story, SavedCollection } from "@/lib/types"

export default function DashboardClient() {
  const [feedPosts, setFeedPosts] = useState<Post[]>([])
  const [postContent, setPostContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("feed")
  const { toast } = useToast()

  // Mock data for new features
  const mockStories: Story[] = [
    {
      id: "story-1",
      userId: "user-2",
      type: "image",
      content: "/placeholder.svg?height=800&width=400",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      views: ["user-1"],
      reactions: [],
    },
    {
      id: "story-2",
      userId: "user-3",
      type: "image",
      content: "/placeholder.svg?height=800&width=400",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      views: [],
      reactions: [],
    },
    {
      id: "story-3",
      userId: "user-4",
      type: "text",
      content: "Working on a new song today! So excited to share it with you all soon.",
      background: "linear-gradient(to right, #4f46e5, #7c3aed)",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      views: [],
      reactions: [],
    },
  ]

  const mockTrendingTopics: TrendingTopic[] = [
    {
      id: "trend-1",
      name: "#SocialSphere",
      count: 15420,
      category: "Technology",
      posts: ["post-1", "post-3"],
    },
    {
      id: "trend-2",
      name: "#SummerVibes",
      count: 12350,
      category: "Lifestyle",
      posts: ["post-4"],
    },
    {
      id: "trend-3",
      name: "#MusicFestival",
      count: 9870,
      category: "Entertainment",
      posts: ["post-7"],
    },
    {
      id: "trend-4",
      name: "#TechNews",
      count: 7650,
      category: "Technology",
      posts: ["post-5"],
    },
    {
      id: "trend-5",
      name: "#TravelGoals",
      count: 6540,
      category: "Travel",
      posts: ["post-6"],
    },
  ]

  const mockSavedCollections: SavedCollection[] = [
    {
      id: "collection-1",
      userId: "user-1",
      name: "Travel Inspiration",
      description: "Places I want to visit",
      posts: ["post-6", "post-4"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPrivate: false,
    },
    {
      id: "collection-2",
      userId: "user-1",
      name: "Coding Resources",
      description: "Helpful programming tips and resources",
      posts: ["post-1", "post-5"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPrivate: true,
    },
  ]

  // Mock live poll data
  const mockLivePoll = {
    id: "poll-1",
    question: "What feature would you like to see next in SocialSphere?",
    options: [
      {
        id: "option-1",
        text: "Video calls with friends",
        votes: 42,
        voters: [
          { id: "user-2", name: "Jane Doe", avatar: "/placeholder.svg?height=40&width=40" },
          { id: "user-3", name: "Alex Smith", avatar: "/placeholder.svg?height=40&width=40" },
        ],
      },
      {
        id: "option-2",
        text: "Marketplace for digital goods",
        votes: 28,
        voters: [{ id: "user-4", name: "Taylor Swift", avatar: "/placeholder.svg?height=40&width=40" }],
      },
      {
        id: "option-3",
        text: "Enhanced privacy controls",
        votes: 35,
        voters: [],
      },
      {
        id: "option-4",
        text: "Collaborative documents",
        votes: 19,
        voters: [],
      },
    ],
    totalVotes: 124,
    expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
  }

  useEffect(() => {
    // Get posts from users the current user follows + their own posts
    const followingIds = currentUser.following
    const relevantPosts = posts.filter((post) => followingIds.includes(post.userId) || post.userId === currentUser.id)

    // Sort by date (newest first)
    const sortedPosts = relevantPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    setFeedPosts(sortedPosts)
  }, [])

  const handlePostUpdate = (updatedPost: Post) => {
    setFeedPosts(feedPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post)))
  }

  const handleCreatePost = () => {
    if (!postContent.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Create a new post
      const newPost: Post = {
        id: `post-${Date.now()}`,
        userId: currentUser.id,
        content: postContent,
        createdAt: new Date().toISOString(),
        likes: [],
        comments: [],
        shares: 0,
        mentions: [],
        hashtags: postContent
          .split(" ")
          .filter((word) => word.startsWith("#"))
          .map((tag) => tag.substring(1)),
      }

      // Add to feed
      setFeedPosts([newPost, ...feedPosts])
      setPostContent("")
      setIsSubmitting(false)

      toast({
        title: "Post created",
        description: "Your post has been published successfully!",
      })
    }, 1000)
  }

  const handleCreateCollection = (collection: Omit<SavedCollection, "id" | "userId" | "createdAt" | "updatedAt">) => {
    // This would normally make an API call
    console.log("Creating collection:", collection)
  }

  const handleDeleteCollection = (collectionId: string) => {
    // This would normally make an API call
    console.log("Deleting collection:", collectionId)
  }

  const handleUpdateCollection = (collectionId: string, data: Partial<SavedCollection>) => {
    // This would normally make an API call
    console.log("Updating collection:", collectionId, data)
  }

  const handleVotePoll = (pollId: string, optionId: string) => {
    // This would normally make an API call
    console.log("Voting in poll:", pollId, "for option:", optionId)
  }

  const handleCreateEvent = (eventData: any) => {
    // This would normally make an API call
    console.log("Creating event:", eventData)
  }

  return (
    <div className="container py-6">
      <Tabs defaultValue="feed" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full max-w-md mx-auto">
          <TabsTrigger value="feed" className="flex-1">
            Feed
          </TabsTrigger>
          <TabsTrigger value="discover" className="flex-1">
            Discover
          </TabsTrigger>
          <TabsTrigger value="create" className="flex-1">
            Create
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left sidebar */}
            <div className="md:col-span-1 space-y-6">
              {/* User profile card */}
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-primary/20 to-primary/10" />
                <div className="p-4 pt-0 -mt-10">
                  <Avatar className="h-20 w-20 border-4 border-background">
                    <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="mt-2">
                    <h2 className="font-bold text-xl flex items-center gap-1">
                      {currentUser.name}
                      {currentUser.isVerified && (
                        <span className="text-primary" title="Verified">
                          ✓
                        </span>
                      )}
                    </h2>
                    <p className="text-muted-foreground">@{currentUser.username}</p>
                  </div>
                  <div className="flex gap-4 mt-4 text-sm">
                    <div>
                      <span className="font-bold">{currentUser.posts.length}</span>{" "}
                      <span className="text-muted-foreground">Posts</span>
                    </div>
                    <div>
                      <span className="font-bold">{currentUser.followers.length}</span>{" "}
                      <span className="text-muted-foreground">Followers</span>
                    </div>
                    <div>
                      <span className="font-bold">{currentUser.following.length}</span>{" "}
                      <span className="text-muted-foreground">Following</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/profile/${currentUser.username}`}>View Profile</Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Trending Topics */}
              <TrendingTopics topics={mockTrendingTopics} />

              {/* Live Poll */}
              <LivePoll
                id={mockLivePoll.id}
                question={mockLivePoll.question}
                options={mockLivePoll.options}
                totalVotes={mockLivePoll.totalVotes}
                expiresAt={mockLivePoll.expiresAt}
                currentUserId={currentUser.id}
                onVote={handleVotePoll}
              />

              {/* Saved Collections */}
              <SavedCollections
                collections={mockSavedCollections}
                onCreateCollection={handleCreateCollection}
                onDeleteCollection={handleDeleteCollection}
                onUpdateCollection={handleUpdateCollection}
              />
            </div>

            {/* Main content */}
            <div className="md:col-span-2 space-y-6">
              {/* Stories */}
              <Stories currentUser={currentUser} stories={mockStories} users={users} />

              {/* Create post */}
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="What's on your mind?"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 text-base"
                    />
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                          <ImageIcon className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                          <MapPin className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                          <BarChart3 className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                          <Smile className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                          <Calendar className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                          <Sparkles className="h-5 w-5" />
                        </Button>
                      </div>
                      <Button
                        onClick={handleCreatePost}
                        disabled={!postContent.trim() || isSubmitting}
                        className="gap-2"
                      >
                        <Send className="h-4 w-4" />
                        {isSubmitting ? "Posting..." : "Post"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feed */}
              <div className="space-y-6">
                {feedPosts.map((post) => {
                  const author = users.find((u) => u.id === post.userId)
                  if (!author) return null
                  return (
                    <PostCard
                      key={post.id}
                      post={post}
                      author={author}
                      currentUserId={currentUser.id}
                      onUpdate={handlePostUpdate}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="discover" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="md:col-span-1 space-y-6">
              <AIRecommendations currentUser={currentUser} allUsers={users} allPosts={posts} />
            </div>

            {/* Middle column */}
            <div className="md:col-span-1 space-y-6">
              <ARFilters
                onCapture={(imageData) => {
                  console.log("Captured image with AR filter")
                  toast({
                    title: "Image captured",
                    description: "Your filtered image is ready to share",
                  })
                }}
              />
            </div>

            {/* Right column */}
            <div className="md:col-span-1 space-y-6">
              <EventCreator onCreateEvent={handleCreateEvent} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="create" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Collaborative whiteboard */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold mb-4">Collaborative Whiteboard</h2>
              <CollaborativeWhiteboard />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
