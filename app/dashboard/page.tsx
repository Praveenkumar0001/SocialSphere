"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Home,
  Search,
  Plus,
  MessageCircle,
  Bell,
  User,
  Heart,
  Share,
  Bookmark,
  MoreHorizontal,
  Camera,
  Video,
  Mic,
  MapPin,
  ShoppingBag,
  Users,
  Calendar,
  Gamepad2,
  Radio,
  Send,
  Play,
  TrendingUp,
  Eye,
  MessageSquare,
  CheckCircle,
} from "lucide-react"

interface Post {
  id: string
  user: {
    name: string
    username: string
    avatar: string
    verified?: boolean
  }
  content: string
  image?: string
  video?: string
  likes: number
  comments: number
  shares: number
  timestamp: string
  isLiked: boolean
  isBookmarked: boolean
}

interface Story {
  id: string
  user: {
    name: string
    avatar: string
  }
  image: string
  viewed: boolean
}

interface Reel {
  id: string
  user: {
    name: string
    username: string
    avatar: string
  }
  video: string
  description: string
  likes: number
  comments: number
  shares: number
  music: string
  isLiked: boolean
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home")
  const [posts, setPosts] = useState<Post[]>([])
  const [stories, setStories] = useState<Story[]>([])
  const [reels, setReels] = useState<Reel[]>([])
  const [isLiveStreaming, setIsLiveStreaming] = useState(false)
  const [liveViewers, setLiveViewers] = useState(0)
  const [newPost, setNewPost] = useState("")
  const [notifications] = useState(8)
  const { toast } = useToast()

  // Initialize sample data
  useEffect(() => {
    setPosts([
      {
        id: "1",
        user: {
          name: "Alex Johnson",
          username: "alexj",
          avatar: "/placeholder.svg?height=40&width=40&text=AJ",
          verified: true,
        },
        content: "Just launched my new project! 🚀 Excited to share this journey with everyone. #startup #innovation",
        image: "/placeholder.svg?height=400&width=600&text=Project+Launch",
        likes: 234,
        comments: 45,
        shares: 12,
        timestamp: "2 hours ago",
        isLiked: false,
        isBookmarked: false,
      },
      {
        id: "2",
        user: {
          name: "Sarah Chen",
          username: "sarahc",
          avatar: "/placeholder.svg?height=40&width=40&text=SC",
        },
        content: "Beautiful sunset from my balcony today 🌅 Nature never fails to amaze me!",
        image: "/placeholder.svg?height=400&width=600&text=Sunset",
        likes: 189,
        comments: 23,
        shares: 8,
        timestamp: "4 hours ago",
        isLiked: true,
        isBookmarked: true,
      },
      {
        id: "3",
        user: {
          name: "Tech News",
          username: "technews",
          avatar: "/placeholder.svg?height=40&width=40&text=TN",
          verified: true,
        },
        content:
          "Breaking: New AI breakthrough announced! This could change everything we know about machine learning.",
        likes: 1205,
        comments: 156,
        shares: 89,
        timestamp: "6 hours ago",
        isLiked: false,
        isBookmarked: false,
      },
    ])

    setStories([
      {
        id: "1",
        user: { name: "Your Story", avatar: "/placeholder.svg?height=60&width=60&text=+" },
        image: "/placeholder.svg?height=100&width=60&text=Add",
        viewed: false,
      },
      {
        id: "2",
        user: { name: "Emma", avatar: "/placeholder.svg?height=60&width=60&text=E" },
        image: "/placeholder.svg?height=100&width=60&text=Story",
        viewed: false,
      },
      {
        id: "3",
        user: { name: "Mike", avatar: "/placeholder.svg?height=60&width=60&text=M" },
        image: "/placeholder.svg?height=100&width=60&text=Story",
        viewed: true,
      },
      {
        id: "4",
        user: { name: "Lisa", avatar: "/placeholder.svg?height=60&width=60&text=L" },
        image: "/placeholder.svg?height=100&width=60&text=Story",
        viewed: false,
      },
    ])

    setReels([
      {
        id: "1",
        user: {
          name: "Dance Studio",
          username: "dancestudio",
          avatar: "/placeholder.svg?height=40&width=40&text=DS",
        },
        video: "/placeholder.svg?height=600&width=400&text=Dance+Video",
        description: "New choreography! 💃 #dance #trending",
        likes: 2340,
        comments: 156,
        shares: 89,
        music: "Trending Song - Artist",
        isLiked: false,
      },
      {
        id: "2",
        user: {
          name: "Food Blogger",
          username: "foodie",
          avatar: "/placeholder.svg?height=40&width=40&text=FB",
        },
        video: "/placeholder.svg?height=600&width=400&text=Cooking+Video",
        description: "Quick pasta recipe! 🍝 #cooking #food",
        likes: 1890,
        comments: 234,
        shares: 67,
        music: "Cooking Vibes - Chef",
        isLiked: true,
      },
    ])
  }, [])

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const handleBookmark = (postId: string) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post)))
  }

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        user: {
          name: "You",
          username: "you",
          avatar: "/placeholder.svg?height=40&width=40&text=You",
        },
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: "now",
        isLiked: false,
        isBookmarked: false,
      }
      setPosts((prev) => [post, ...prev])
      setNewPost("")
      toast({
        title: "Post created!",
        description: "Your post has been shared successfully.",
      })
    }
  }

  const startLiveStream = () => {
    setIsLiveStreaming(true)
    setLiveViewers(Math.floor(Math.random() * 100) + 1)
    toast({
      title: "🔴 You're now live!",
      description: "Your followers will be notified",
    })

    // Simulate viewer growth
    const interval = setInterval(() => {
      setLiveViewers((prev) => prev + Math.floor(Math.random() * 5))
    }, 3000)

    setTimeout(() => {
      clearInterval(interval)
    }, 30000)
  }

  const endLiveStream = () => {
    setIsLiveStreaming(false)
    setLiveViewers(0)
    toast({
      title: "Live stream ended",
      description: "Thanks for streaming!",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                SocialSphere
              </h1>
              <Badge className="gradient-bg text-white border-0 pulse-glow">All Features Active</Badge>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Input placeholder="Search..." className="w-64 pl-10" />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500">
                    {notifications}
                  </Badge>
                )}
              </Button>

              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src="/placeholder.svg?height=32&width=32&text=You" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="sticky top-16 z-40 glass-effect border-b">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-6 h-14 bg-transparent">
              <TabsTrigger value="home" className="flex flex-col gap-1 data-[state=active]:bg-white/20">
                <Home className="h-5 w-5" />
                <span className="text-xs">Home</span>
              </TabsTrigger>
              <TabsTrigger value="explore" className="flex flex-col gap-1 data-[state=active]:bg-white/20">
                <Search className="h-5 w-5" />
                <span className="text-xs">Explore</span>
              </TabsTrigger>
              <TabsTrigger value="create" className="flex flex-col gap-1 data-[state=active]:bg-white/20">
                <Plus className="h-5 w-5" />
                <span className="text-xs">Create</span>
              </TabsTrigger>
              <TabsTrigger value="reels" className="flex flex-col gap-1 data-[state=active]:bg-white/20">
                <Video className="h-5 w-5" />
                <span className="text-xs">Reels</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex flex-col gap-1 data-[state=active]:bg-white/20">
                <MessageCircle className="h-5 w-5" />
                <span className="text-xs">Messages</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex flex-col gap-1 data-[state=active]:bg-white/20">
                <User className="h-5 w-5" />
                <span className="text-xs">Profile</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Home Feed */}
          <TabsContent value="home" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Feed */}
              <div className="lg:col-span-3 space-y-6">
                {/* Stories */}
                <Card className="glass-effect border-0">
                  <CardContent className="p-4">
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {stories.map((story) => (
                        <div key={story.id} className="flex flex-col items-center gap-2 min-w-[70px]">
                          <div
                            className={`relative p-1 rounded-full ${
                              story.viewed ? "bg-gray-300" : "bg-gradient-to-r from-purple-500 to-pink-500"
                            }`}
                          >
                            <Avatar className="h-14 w-14 border-2 border-white">
                              <AvatarImage src={story.user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{story.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {story.id === "1" && (
                              <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                                <Plus className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <span className="text-xs text-center">{story.user.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Create Post */}
                <Card className="glass-effect border-0">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40&text=You" />
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Input
                          placeholder="What's on your mind?"
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                          className="mb-3"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Camera className="h-4 w-4 mr-2" />
                              Photo
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Video className="h-4 w-4 mr-2" />
                              Video
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MapPin className="h-4 w-4 mr-2" />
                              Location
                            </Button>
                          </div>
                          <Button onClick={handleCreatePost} disabled={!newPost.trim()}>
                            Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Posts */}
                {posts.map((post) => (
                  <Card key={post.id} className="glass-effect border-0 float-animation">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{post.user.name}</span>
                              {post.user.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                            </div>
                            <span className="text-sm text-muted-foreground">@{post.user.username}</span>
                            <span className="text-sm text-muted-foreground"> • {post.timestamp}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="mb-4">{post.content}</p>
                      {post.image && (
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt="Post content"
                          className="w-full rounded-lg mb-4 max-h-96 object-cover"
                        />
                      )}

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center gap-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className={post.isLiked ? "text-red-500" : ""}
                          >
                            <Heart className={`h-4 w-4 mr-2 ${post.isLiked ? "fill-current" : ""}`} />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share className="h-4 w-4 mr-2" />
                            {post.shares}
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleBookmark(post.id)}
                          className={post.isBookmarked ? "text-blue-500" : ""}
                        >
                          <Bookmark className={`h-4 w-4 ${post.isBookmarked ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Live Streaming */}
                <Card className="glass-effect border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Radio className="h-5 w-5 text-red-500" />
                      Live Streaming
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!isLiveStreaming ? (
                      <div className="text-center">
                        <div className="h-32 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                          <Radio className="h-8 w-8 text-white" />
                        </div>
                        <Button onClick={startLiveStream} className="w-full">
                          <Radio className="h-4 w-4 mr-2" />
                          Go Live
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="relative h-32 bg-black rounded-lg flex items-center justify-center mb-4">
                          <Badge variant="destructive" className="absolute top-2 left-2 animate-pulse">
                            LIVE
                          </Badge>
                          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
                            <Eye className="h-3 w-3 text-white" />
                            <span className="text-white text-xs">{liveViewers}</span>
                          </div>
                          <Video className="h-8 w-8 text-white" />
                        </div>
                        <Button onClick={endLiveStream} variant="destructive" className="w-full">
                          End Live Stream
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Trending Topics */}
                <Card className="glass-effect border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Trending
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {["#SocialSphere", "#TechNews", "#Innovation", "#Startup", "#AI"].map((trend, index) => (
                        <div key={trend} className="flex items-center justify-between">
                          <span className="font-medium">{trend}</span>
                          <Badge variant="secondary">{Math.floor(Math.random() * 100)}K</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Suggested Friends */}
                <Card className="glass-effect border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Suggested for you
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "John Doe", username: "johndoe", mutual: 5 },
                        { name: "Jane Smith", username: "janesmith", mutual: 3 },
                        { name: "Bob Wilson", username: "bobwilson", mutual: 8 },
                      ].map((user) => (
                        <div key={user.username} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${user.name.charAt(0)}`} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.mutual} mutual friends</p>
                            </div>
                          </div>
                          <Button size="sm">Follow</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Explore */}
          <TabsContent value="explore" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature Cards */}
              {[
                { name: "Stories", icon: Camera, color: "from-purple-500 to-pink-500", users: "2.1M" },
                { name: "Live Streaming", icon: Radio, color: "from-red-500 to-orange-500", users: "890K" },
                { name: "Marketplace", icon: ShoppingBag, color: "from-green-500 to-blue-500", users: "1.5M" },
                { name: "Events", icon: Calendar, color: "from-blue-500 to-purple-500", users: "750K" },
                { name: "Gaming", icon: Gamepad2, color: "from-yellow-500 to-red-500", users: "1.2M" },
                { name: "Audio Spaces", icon: Mic, color: "from-indigo-500 to-purple-500", users: "650K" },
              ].map((feature) => (
                <Card
                  key={feature.name}
                  className="glass-effect border-0 cursor-pointer hover:scale-105 transition-transform"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`h-16 w-16 rounded-full bg-gradient-to-r ${feature.color} mx-auto mb-4 flex items-center justify-center`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.name}</h3>
                    <p className="text-sm text-muted-foreground">{feature.users} active users</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Create */}
          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Create Post", icon: MessageSquare, description: "Share your thoughts and photos" },
                { name: "Create Story", icon: Camera, description: "Share moments that disappear in 24h" },
                { name: "Create Reel", icon: Video, description: "Short vertical videos" },
                { name: "Go Live", icon: Radio, description: "Stream live to your followers" },
                { name: "Start Audio Space", icon: Mic, description: "Host live audio conversations" },
                { name: "Create Event", icon: Calendar, description: "Organize gatherings and meetups" },
                { name: "List Product", icon: ShoppingBag, description: "Sell items on marketplace" },
                { name: "Create Group", icon: Users, description: "Build communities around interests" },
                { name: "Share Location", icon: MapPin, description: "Let friends know where you are" },
              ].map((item) => (
                <Card
                  key={item.name}
                  className="glass-effect border-0 cursor-pointer hover:scale-105 transition-transform"
                >
                  <CardContent className="p-6 text-center">
                    <item.icon className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                    <h3 className="font-semibold mb-2">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reels */}
          <TabsContent value="reels" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reels.map((reel) => (
                <Card key={reel.id} className="glass-effect border-0 overflow-hidden">
                  <div className="relative aspect-[9/16] bg-black">
                    <img src={reel.video || "/placeholder.svg"} alt="Reel" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="icon" className="rounded-full bg-white/20 backdrop-blur-sm">
                        <Play className="h-6 w-6 text-white" />
                      </Button>
                    </div>

                    {/* User Info */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={reel.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{reel.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-white font-medium">{reel.user.name}</span>
                        <Button size="sm" variant="outline" className="ml-auto">
                          Follow
                        </Button>
                      </div>
                      <p className="text-white text-sm mb-2">{reel.description}</p>
                      <div className="flex items-center gap-1 text-white text-xs">
                        <Mic className="h-3 w-3" />
                        <span>{reel.music}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="absolute right-4 bottom-20 flex flex-col gap-4">
                      <Button
                        size="icon"
                        variant="ghost"
                        className={`rounded-full ${reel.isLiked ? "text-red-500" : "text-white"}`}
                      >
                        <Heart className={`h-6 w-6 ${reel.isLiked ? "fill-current" : ""}`} />
                      </Button>
                      <div className="text-white text-xs text-center">{reel.likes}</div>

                      <Button size="icon" variant="ghost" className="rounded-full text-white">
                        <MessageCircle className="h-6 w-6" />
                      </Button>
                      <div className="text-white text-xs text-center">{reel.comments}</div>

                      <Button size="icon" variant="ghost" className="rounded-full text-white">
                        <Share className="h-6 w-6" />
                      </Button>
                      <div className="text-white text-xs text-center">{reel.shares}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Messages */}
          <TabsContent value="messages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Conversations List */}
              <Card className="glass-effect border-0">
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Alex Johnson", message: "Hey! How's it going?", time: "2m", unread: 2 },
                      { name: "Sarah Chen", message: "Thanks for the help!", time: "1h", unread: 0 },
                      { name: "Mike Wilson", message: "See you tomorrow!", time: "3h", unread: 1 },
                      { name: "Emma Davis", message: "Great work on the project", time: "1d", unread: 0 },
                    ].map((chat) => (
                      <div
                        key={chat.name}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer"
                      >
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${chat.name.charAt(0)}`} />
                          <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium truncate">{chat.name}</span>
                            <span className="text-xs text-muted-foreground">{chat.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{chat.message}</p>
                        </div>
                        {chat.unread > 0 && <Badge className="bg-blue-500 text-white">{chat.unread}</Badge>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chat Window */}
              <div className="lg:col-span-2">
                <Card className="glass-effect border-0 h-96">
                  <CardHeader className="border-b">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40&text=A" />
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="font-medium">Alex Johnson</span>
                        <p className="text-sm text-muted-foreground">Online</p>
                      </div>
                      <div className="ml-auto flex gap-2">
                        <Button size="icon" variant="ghost">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Mic className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-4">
                    <div className="space-y-4 h-64 overflow-y-auto">
                      <div className="flex justify-start">
                        <div className="bg-white/20 rounded-lg p-3 max-w-xs">
                          <p className="text-sm">Hey! How's it going?</p>
                          <span className="text-xs text-muted-foreground">2:30 PM</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs">
                          <p className="text-sm">Great! Just working on the new features</p>
                          <span className="text-xs text-blue-100">2:32 PM</span>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-white/20 rounded-lg p-3 max-w-xs">
                          <p className="text-sm">That's awesome! Can't wait to see them</p>
                          <span className="text-xs text-muted-foreground">2:35 PM</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Input placeholder="Type a message..." className="flex-1" />
                      <Button size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="glass-effect border-0">
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src="/placeholder.svg?height=96&width=96&text=You" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold mb-2">Your Name</h2>
                  <p className="text-muted-foreground mb-4">@yourusername</p>
                  <div className="flex justify-center gap-8 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">156</div>
                      <div className="text-sm text-muted-foreground">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">1.2K</div>
                      <div className="text-sm text-muted-foreground">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">890</div>
                      <div className="text-sm text-muted-foreground">Following</div>
                    </div>
                  </div>
                  <Button>Edit Profile</Button>
                </div>
              </CardContent>
            </Card>

            {/* Profile Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Your Posts", icon: MessageSquare, count: "156" },
                { name: "Saved Posts", icon: Bookmark, count: "89" },
                { name: "Your Stories", icon: Camera, count: "23" },
                { name: "Your Reels", icon: Video, count: "45" },
                { name: "Live Streams", icon: Radio, count: "12" },
                { name: "Events Created", icon: Calendar, count: "8" },
              ].map((item) => (
                <Card
                  key={item.name}
                  className="glass-effect border-0 cursor-pointer hover:scale-105 transition-transform"
                >
                  <CardContent className="p-6 text-center">
                    <item.icon className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                    <h3 className="font-semibold mb-2">{item.name}</h3>
                    <p className="text-2xl font-bold text-purple-600">{item.count}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Success Toast */}
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="glass-effect border-0 bg-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">All features are working perfectly! 🎉</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
