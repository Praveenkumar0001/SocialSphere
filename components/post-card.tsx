"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Repeat, MoreHorizontal, Send, Bookmark, BookmarkCheck, MapPin } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toggleLike, addComment, sharePost } from "@/lib/data"
import { useToast } from "@/components/ui/use-toast"
import { Poll } from "@/components/poll"
import type { Post, User } from "@/lib/types"

interface PostCardProps {
  post: Post
  author: User
  currentUserId: string
  onUpdate?: (post: Post) => void
}

export function PostCard({ post, author, currentUserId, onUpdate }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUserId))
  const [likeCount, setLikeCount] = useState(post.likes.length)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const { toast } = useToast()

  const handleLike = () => {
    try {
      const updatedPost = toggleLike(post.id, currentUserId)
      setIsLiked(!isLiked)
      setLikeCount(updatedPost.likes.length)

      if (onUpdate) {
        onUpdate(updatedPost)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to like post. Please try again.",
      })
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked ? "Post removed from your bookmarks" : "Post saved to your bookmarks",
    })
  }

  const handleShare = () => {
    try {
      const updatedPost = sharePost(post.id)

      if (onUpdate) {
        onUpdate(updatedPost)
      }

      toast({
        title: "Post shared",
        description: "Post has been shared successfully",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to share post. Please try again.",
      })
    }
  }

  const handleSubmitComment = () => {
    if (!commentText.trim()) return

    setIsSubmittingComment(true)

    try {
      const newComment = addComment(post.id, currentUserId, commentText)
      setCommentText("")

      if (onUpdate) {
        const updatedPost = { ...post, comments: [...post.comments, newComment] }
        onUpdate(updatedPost)
      }

      toast({
        title: "Comment added",
        description: "Your comment has been added successfully",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add comment. Please try again.",
      })
    } finally {
      setIsSubmittingComment(false)
    }
  }

  const handleVote = (pollId: string, optionId: string) => {
    if (!post.poll) return

    // Find the option and add the user's vote
    const updatedOptions = post.poll.options.map((option) => {
      if (option.id === optionId) {
        // Add user's vote if not already voted
        if (!option.votes.includes(currentUserId)) {
          return {
            ...option,
            votes: [...option.votes, currentUserId],
          }
        }
      }
      return option
    })

    // Update the post with the new poll data
    const updatedPost = {
      ...post,
      poll: {
        ...post.poll,
        options: updatedOptions,
      },
    }

    if (onUpdate) {
      onUpdate(updatedPost)
    }
  }

  // Format post content to highlight hashtags and mentions
  const formatContent = (content: string) => {
    return content.split(" ").map((word, index) => {
      if (word.startsWith("#")) {
        return (
          <Link key={index} href={`/explore?tag=${word.substring(1)}`} className="text-primary hover:underline">
            {word}{" "}
          </Link>
        )
      } else if (word.startsWith("@")) {
        const username = word.substring(1)
        return (
          <Link key={index} href={`/profile/${username}`} className="text-primary hover:underline">
            {word}{" "}
          </Link>
        )
      } else if (word.startsWith("http")) {
        return (
          <a key={index} href={word} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            {word}{" "}
          </a>
        )
      }
      return <span key={index}>{word} </span>
    })
  }

  // Format date to relative time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return `${diffInSeconds}s`
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m`
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}h`
    } else if (diffInSeconds < 604800) {
      return `${Math.floor(diffInSeconds / 86400)}d`
    } else {
      return date.toLocaleDateString()
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-background">
      <div className="p-4">
        {/* Post header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <Link href={`/profile/${author.username}`} className="font-semibold hover:underline">
                  {author.name}
                </Link>
                {author.isVerified && (
                  <span className="text-primary" title="Verified">
                    ✓
                  </span>
                )}
                <span className="text-muted-foreground">@{author.username}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">{formatDate(post.createdAt)}</span>
              </div>

              {post.location && (
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{post.location.name}</span>
                </div>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Copy link to post</DropdownMenuItem>
              {currentUserId === author.id && (
                <>
                  <DropdownMenuItem>Edit post</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Delete post</DropdownMenuItem>
                </>
              )}
              {currentUserId !== author.id && (
                <DropdownMenuItem className="text-destructive">Report post</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Post content */}
        <div className="mb-3">
          <p className="whitespace-pre-wrap">{formatContent(post.content)}</p>
        </div>

        {/* Poll (if exists) */}
        {post.poll && <Poll poll={post.poll} currentUserId={currentUserId} onVote={handleVote} />}

        {/* Post image */}
        {post.images && post.images.length > 0 && (
          <div className="mb-3 rounded-lg overflow-hidden">
            <img src={post.images[0] || "/placeholder.svg"} alt="Post" className="w-full h-auto object-cover" />
          </div>
        )}

        {/* Post stats */}
        <div className="flex text-muted-foreground text-sm mb-3">
          <div className="mr-4">{likeCount} likes</div>
          <div className="mr-4">{post.comments.length} comments</div>
          <div>{post.shares} shares</div>
        </div>

        {/* Post actions */}
        <div className="flex justify-between border-t border-b py-2">
          <Button
            variant="ghost"
            size="sm"
            className={`rounded-full ${isLiked ? "text-red-500" : ""}`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
            Like
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full" onClick={() => setShowComments(!showComments)}>
            <MessageCircle className="h-4 w-4 mr-1" />
            Comment
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full" onClick={handleShare}>
            <Repeat className="h-4 w-4 mr-1" />
            Repost
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`rounded-full ${isBookmarked ? "text-primary" : ""}`}
            onClick={handleBookmark}
          >
            {isBookmarked ? <BookmarkCheck className="h-4 w-4 mr-1" /> : <Bookmark className="h-4 w-4 mr-1" />}
            Save
          </Button>
        </div>

        {/* Comments section */}
        {showComments && (
          <div className="mt-3 space-y-4">
            {/* Comment input */}
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="Your avatar" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Textarea
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="min-h-[60px] flex-1"
                />
                <Button size="icon" disabled={!commentText.trim() || isSubmittingComment} onClick={handleSubmitComment}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Comments list */}
            {post.comments.length > 0 ? (
              <div className="space-y-3">
                {post.comments.map((comment) => {
                  const commentAuthor = author.id === comment.userId ? author : undefined
                  return (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={commentAuthor?.avatar || "/placeholder.svg"} alt="Avatar" />
                        <AvatarFallback>{commentAuthor?.name.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="font-semibold">{commentAuthor?.name || "User"}</span>
                            <span className="text-muted-foreground text-xs">{formatDate(comment.createdAt)}</span>
                          </div>
                          <p>{comment.content}</p>
                        </div>
                        <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                          <button className="hover:text-foreground">Like</button>
                          <button className="hover:text-foreground">Reply</button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-center text-muted-foreground text-sm py-2">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
