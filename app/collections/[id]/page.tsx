"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Grid, List, Lock, MoreHorizontal, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PostCard } from "@/components/post-card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { currentUser, posts, users } from "@/lib/data"
import { useToast } from "@/components/ui/use-toast"
import type { Post, SavedCollection } from "@/lib/types"

export default function CollectionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [collection, setCollection] = useState<SavedCollection | null>(null)
  const [collectionPosts, setCollectionPosts] = useState<Post[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch collection
    setTimeout(() => {
      // This would be an API call in a real app
      const mockCollection: SavedCollection = {
        id: params.id,
        userId: currentUser.id,
        name: params.id === "collection-1" ? "Travel Inspiration" : "Coding Resources",
        description: params.id === "collection-1" ? "Places I want to visit" : "Helpful programming tips and resources",
        posts: params.id === "collection-1" ? ["post-6", "post-4"] : ["post-1", "post-5"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isPrivate: params.id === "collection-2",
      }

      setCollection(mockCollection)

      // Get the actual posts
      const collectionPosts = posts.filter((post) => mockCollection.posts.includes(post.id))

      setCollectionPosts(collectionPosts)
      setIsLoading(false)
    }, 1000)
  }, [params.id])

  const handlePostUpdate = (updatedPost: Post) => {
    setCollectionPosts(collectionPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post)))
  }

  const handleRemoveFromCollection = (postId: string) => {
    if (!collection) return

    // Update collection
    const updatedCollection = {
      ...collection,
      posts: collection.posts.filter((id) => id !== postId),
      updatedAt: new Date().toISOString(),
    }

    setCollection(updatedCollection)

    // Update posts list
    setCollectionPosts(collectionPosts.filter((post) => post.id !== postId))

    toast({
      title: "Post removed",
      description: "The post has been removed from this collection.",
    })
  }

  const handleShareCollection = () => {
    if (!collection) return

    if (collection.isPrivate) {
      toast({
        variant: "destructive",
        title: "Cannot share private collection",
        description: "Make this collection public before sharing.",
      })
      return
    }

    // Copy link to clipboard
    navigator.clipboard.writeText(`https://socialsphere.com/collections/${collection.id}`)

    toast({
      title: "Link copied",
      description: "Collection link copied to clipboard.",
    })
  }

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-4 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!collection) {
    return (
      <div className="container py-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Collection not found</h2>
          <p className="text-muted-foreground mb-6">
            The collection you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push("/dashboard")}>Return to Dashboard</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{collection.name}</h1>
            {collection.isPrivate && <Lock className="h-4 w-4 text-muted-foreground" />}
          </div>
          {collection.description && <p className="text-muted-foreground">{collection.description}</p>}
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "list")}>
            <TabsList>
              <TabsTrigger value="grid">
                <Grid className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button variant="outline" onClick={handleShareCollection}>
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit collection</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setCollection({
                    ...collection,
                    isPrivate: !collection.isPrivate,
                  })
                }
              >
                {collection.isPrivate ? "Make public" : "Make private"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Delete collection</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {collectionPosts.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <h2 className="text-xl font-medium mb-2">No posts in this collection</h2>
          <p className="text-muted-foreground mb-6">Save posts to this collection as you browse.</p>
          <Button onClick={() => router.push("/dashboard")}>Browse Posts</Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {collectionPosts.map((post) => {
            const hasImage = post.images && post.images.length > 0

            return (
              <div key={post.id} className="relative group overflow-hidden rounded-lg border border-border">
                <div className="aspect-square bg-muted">
                  {hasImage ? (
                    <img src={post.images[0] || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-4 text-center text-muted-foreground">
                      {post.content.length > 100 ? post.content.substring(0, 100) + "..." : post.content}
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleRemoveFromCollection(post.id)}>
                        Remove from collection
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div>
                    <p className="text-white text-sm line-clamp-3">{post.content}</p>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mt-2"
                      onClick={() => router.push(`/post/${post.id}`)}
                    >
                      View Post
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="space-y-6">
          {collectionPosts.map((post) => {
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
      )}
    </div>
  )
}
