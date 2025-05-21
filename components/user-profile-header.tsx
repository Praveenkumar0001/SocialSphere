"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, LinkIcon, Mail, Edit, UserPlus, UserCheck } from "lucide-react"
import { followUser, unfollowUser, currentUser } from "@/lib/data"
import { useToast } from "@/components/ui/use-toast"
import type { User } from "@/lib/types"

interface UserProfileHeaderProps {
  user: User
  isCurrentUser: boolean
  isFollowing?: boolean
}

export function UserProfileHeader({
  user,
  isCurrentUser,
  isFollowing: initialIsFollowing = false,
}: UserProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
  const [followerCount, setFollowerCount] = useState(user.followers.length)
  const { toast } = useToast()

  const handleFollowToggle = () => {
    try {
      if (isFollowing) {
        unfollowUser(currentUser.id, user.id)
        setFollowerCount((prev) => prev - 1)
      } else {
        followUser(currentUser.id, user.id)
        setFollowerCount((prev) => prev + 1)
      }

      setIsFollowing(!isFollowing)

      toast({
        title: isFollowing ? "Unfollowed" : "Following",
        description: isFollowing ? `You are no longer following ${user.name}` : `You are now following ${user.name}`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update follow status. Please try again.",
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  return (
    <div>
      {/* Cover image */}
      <div className="h-48 bg-muted relative">
        {user.coverImage ? (
          <img src={user.coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary/20 to-primary/10" />
        )}
      </div>

      {/* Profile info */}
      <div className="px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-4">
          <div className="flex items-end">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 mb-2">
              <h1 className="text-2xl font-bold flex items-center gap-1">
                {user.name}
                {user.isVerified && (
                  <span className="text-primary" title="Verified">
                    ✓
                  </span>
                )}
              </h1>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>
          </div>

          <div className="mt-4 md:mt-0">
            {isCurrentUser ? (
              <Button asChild>
                <Link href={`/profile/${user.username}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleFollowToggle} variant={isFollowing ? "outline" : "default"}>
                  {isFollowing ? (
                    <>
                      <UserCheck className="h-4 w-4 mr-2" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Follow
                    </>
                  )}
                </Button>
                <Button asChild>
                  <Link href={`/messages?user=${user.username}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Message
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Bio and details */}
        <div className="mb-6">
          {user.bio && <p className="mb-4">{user.bio}</p>}

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {user.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{user.location}</span>
              </div>
            )}

            {user.website && (
              <div className="flex items-center">
                <LinkIcon className="h-4 w-4 mr-1" />
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {user.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}

            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Joined {formatDate(user.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mb-6">
          <div>
            <span className="font-bold">{user.posts.length}</span>
            <span className="text-muted-foreground ml-1">Posts</span>
          </div>
          <div>
            <span className="font-bold">{followerCount}</span>
            <span className="text-muted-foreground ml-1">Followers</span>
          </div>
          <div>
            <span className="font-bold">{user.following.length}</span>
            <span className="text-muted-foreground ml-1">Following</span>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="likes">Likes</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}
