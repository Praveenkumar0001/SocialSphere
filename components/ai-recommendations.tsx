"use client"

import { useState, useEffect } from "react"
import { Sparkles, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import type { User, Post } from "@/lib/types"

interface AIRecommendationsProps {
  currentUser: User
  allUsers: User[]
  allPosts: Post[]
}

type RecommendationType = "people" | "posts" | "topics"

interface RecommendationFeedback {
  id: string
  type: RecommendationType
  liked: boolean
}

export function AIRecommendations({ currentUser, allUsers, allPosts }: AIRecommendationsProps) {
  const [activeTab, setActiveTab] = useState<RecommendationType>("people")
  const [isLoading, setIsLoading] = useState(true)
  const [recommendedPeople, setRecommendedPeople] = useState<User[]>([])
  const [recommendedPosts, setRecommendedPosts] = useState<(Post & { author: User })[]>([])
  const [recommendedTopics, setRecommendedTopics] = useState<string[]>([])
  const [feedback, setFeedback] = useState<RecommendationFeedback[]>([])
  const { toast } = useToast()

  // Simulate loading recommendations
  useEffect(() => {
    setIsLoading(true)

    // Simulate API call delay
    const timer = setTimeout(() => {
      // Filter out users the current user already follows
      const filteredUsers = allUsers.filter(
        (user) =>
          user.id !== currentUser.id &&
          !currentUser.following.includes(user.id) &&
          !feedback.some((f) => f.id === user.id && f.type === "people"),
      )

      // Randomly select 3 users
      const shuffledUsers = [...filteredUsers].sort(() => 0.5 - Math.random())
      setRecommendedPeople(shuffledUsers.slice(0, 3))

      // Filter posts not from the current user and not already in feedback
      const filteredPosts = allPosts.filter(
        (post) => post.userId !== currentUser.id && !feedback.some((f) => f.id === post.id && f.type === "posts"),
      )

      // Add author information to posts
      const postsWithAuthors = filteredPosts
        .map((post) => ({
          ...post,
          author: allUsers.find((user) => user.id === post.userId) as User,
        }))
        .filter((post) => post.author) // Ensure author exists

      // Randomly select 3 posts
      const shuffledPosts = [...postsWithAuthors].sort(() => 0.5 - Math.random())
      setRecommendedPosts(shuffledPosts.slice(0, 3))

      // Generate some trending topics
      const topics = [
        "MachineLearning",
        "TravelPhotography",
        "HealthyRecipes",
        "WorkoutRoutines",
        "ProductivityTips",
        "BookRecommendations",
        "SustainableLiving",
        "TechNews",
        "ArtistsOnSocialSphere",
      ]

      // Filter out topics with feedback
      const filteredTopics = topics.filter((topic) => !feedback.some((f) => f.id === topic && f.type === "topics"))

      // Randomly select 5 topics
      const shuffledTopics = [...filteredTopics].sort(() => 0.5 - Math.random())
      setRecommendedTopics(shuffledTopics.slice(0, 5))

      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [currentUser, allUsers, allPosts, feedback])

  const handleRefresh = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // This would trigger the useEffect to reload recommendations
      setFeedback((prev) => [...prev])
    }, 500)
  }

  const handleFeedback = (id: string, type: RecommendationType, liked: boolean) => {
    // Add to feedback list
    setFeedback((prev) => [...prev, { id, type, liked }])

    // Show toast
    toast({
      title: liked ? "Added to your preferences" : "Removed from recommendations",
      description: liked ? "We'll show you more like this" : "We'll show you less like this",
      duration: 3000,
    })

    // If liked a person, simulate following
    if (liked && type === "people") {
      // This would be an API call in a real app
      console.log(`Following user: ${id}`)
    }

    // If liked a topic, simulate following the topic
    if (liked && type === "topics") {
      // This would be an API call in a real app
      console.log(`Following topic: ${id}`)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">For You</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh recommendations</span>
          </Button>
        </div>
        <CardDescription>Personalized recommendations based on your activity</CardDescription>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as RecommendationType)}>
        <div className="px-4">
          <TabsList className="w-full">
            <TabsTrigger value="people" className="flex-1">
              People
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex-1">
              Posts
            </TabsTrigger>
            <TabsTrigger value="topics" className="flex-1">
              Topics
            </TabsTrigger>
          </TabsList>
        </div>

        {/* People recommendations */}
        <TabsContent value="people" className="mt-0">
          <CardContent className="p-4 pt-3">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-1.5 flex-1">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-9 w-20 rounded-md" />
                  </div>
                ))}
              </div>
            ) : recommendedPeople.length > 0 ? (
              <div className="space-y-4">
                {recommendedPeople.map((person) => (
                  <div key={person.id} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                      <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="font-medium truncate">{person.name}</p>
                        {person.isVerified && <span className="text-primary text-xs">✓</span>}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">@{person.username}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive"
                        onClick={() => handleFeedback(person.id, "people", false)}
                      >
                        <ThumbsDown className="h-4 w-4" />
                        <span className="sr-only">Not interested</span>
                      </Button>
                      <Button variant="default" size="sm" onClick={() => handleFeedback(person.id, "people", true)}>
                        Follow
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No more recommendations</p>
                <Button variant="outline" size="sm" className="mt-2" onClick={handleRefresh}>
                  Refresh
                </Button>
              </div>
            )}
          </CardContent>
        </TabsContent>

        {/* Posts recommendations */}
        <TabsContent value="posts" className="mt-0">
          <CardContent className="p-4 pt-3">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-32 w-full rounded-md" />
                  </div>
                ))}
              </div>
            ) : recommendedPosts.length > 0 ? (
              <div className="space-y-6">
                {recommendedPosts.map((post) => (
                  <div key={post.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center gap-1">
                        <p className="font-medium text-sm">{post.author.name}</p>
                        {post.author.isVerified && <span className="text-primary text-xs">✓</span>}
                      </div>
                    </div>
                    <p className="text-sm line-clamp-2">{post.content}</p>
                    {post.images && post.images.length > 0 && (
                      <div className="rounded-md overflow-hidden">
                        <img
                          src={post.images[0] || "/placeholder.svg"}
                          alt="Post"
                          className="w-full h-auto object-cover max-h-48"
                        />
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive"
                          onClick={() => handleFeedback(post.id, "posts", false)}
                        >
                          <ThumbsDown className="h-4 w-4" />
                          <span className="sr-only">Not interested</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary"
                          onClick={() => handleFeedback(post.id, "posts", true)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span className="sr-only">Interested</span>
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          // This would navigate to the post in a real app
                          console.log(`View post: ${post.id}`)
                        }}
                      >
                        View Post
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No more recommendations</p>
                <Button variant="outline" size="sm" className="mt-2" onClick={handleRefresh}>
                  Refresh
                </Button>
              </div>
            )}
          </CardContent>
        </TabsContent>

        {/* Topics recommendations */}
        <TabsContent value="topics" className="mt-0">
          <CardContent className="p-4 pt-3">
            {isLoading ? (
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-8 w-32 rounded-full" />
                ))}
              </div>
            ) : recommendedTopics.length > 0 ? (
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {recommendedTopics.map((topic) => (
                    <div key={topic} className="flex items-center">
                      <Badge variant="secondary" className="rounded-l-full pr-1 flex items-center gap-1">
                        #{topic}
                      </Badge>
                      <div className="flex">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 rounded-none border-l border-border"
                          onClick={() => handleFeedback(topic, "topics", true)}
                        >
                          <ThumbsUp className="h-3 w-3" />
                          <span className="sr-only">Interested</span>
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 rounded-r-full border-l border-border"
                          onClick={() => handleFeedback(topic, "topics", false)}
                        >
                          <ThumbsDown className="h-3 w-3" />
                          <span className="sr-only">Not interested</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Rate these topics to improve your recommendations</p>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No more recommendations</p>
                <Button variant="outline" size="sm" className="mt-2" onClick={handleRefresh}>
                  Refresh
                </Button>
              </div>
            )}
          </CardContent>
        </TabsContent>
      </Tabs>
      <CardFooter className="pt-0 px-4 pb-4">
        <p className="text-xs text-muted-foreground w-full text-center">
          Recommendations are personalized based on your activity and interests
        </p>
      </CardFooter>
    </Card>
  )
}
