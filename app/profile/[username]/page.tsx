"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { UserProfileHeader } from "@/components/user-profile-header"
import { PostCard } from "@/components/post-card"
import { currentUser, users, posts } from "@/lib/data"
import { isLoggedIn } from "@/app/utils/auth"
import { useToast } from "@/components/ui/use-toast"
import type { Post, User } from "@/lib/types"

export default function ProfilePage({ params }: { params: { username: string } }) {
  const [user, setUser] = useState<User | null>(null)
  const [userPosts, setUserPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login")
      return
    }

    // Find the user by username
    const foundUser = users.find((u) => u.username === params.username)

    if (foundUser) {
      setUser(foundUser)

      // Get user's posts
      const userPosts = posts
        .filter((post) => post.userId === foundUser.id)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

      setUserPosts(userPosts)
    } else {
      toast({
        variant: "destructive",
        title: "User not found",
        description: "The user you're looking for doesn't exist.",
      })
      router.push("/dashboard")
    }

    setIsLoading(false)
  }, [params.username, router, toast])

  const handlePostUpdate = (updatedPost: Post) => {
    setUserPosts(userPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post)))
  }

  if (isLoading || !user) {
    return (
      <div className="container py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-48 bg-muted rounded-lg"></div>
          <div className="flex gap-4">
            <div className="h-24 w-24 rounded-full bg-muted"></div>
            <div className="space-y-2 flex-1">
              <div className="h-6 bg-muted rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-6">
      <UserProfileHeader user={user} isCurrentUser={user.id === currentUser.id} />

      <div className="mt-6 space-y-6">
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              author={user}
              currentUserId={currentUser.id}
              onUpdate={handlePostUpdate}
            />
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No posts yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
