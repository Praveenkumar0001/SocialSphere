"use client"

import { useState } from "react"
import { PlusCircle, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import type { Story, User } from "@/lib/types"

interface StoriesProps {
  currentUser: User
  stories: Story[]
  users: User[]
}

export function Stories({ currentUser, stories, users }: StoriesProps) {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null)
  const [activeUserIndex, setActiveUserIndex] = useState<number | null>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const { toast } = useToast()

  // Group stories by user
  const userStories = users.reduce<Record<string, Story[]>>((acc, user) => {
    const userStories = stories.filter((story) => story.userId === user.id)
    if (userStories.length > 0) {
      acc[user.id] = userStories
    }
    return acc
  }, {})

  // Users with stories
  const usersWithStories = users.filter((user) => userStories[user.id]?.length > 0)

  // Add current user to the beginning
  if (!usersWithStories.find((user) => user.id === currentUser.id)) {
    usersWithStories.unshift(currentUser)
  }

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("stories-container")
    if (!container) return

    const scrollAmount = direction === "left" ? -200 : 200
    const newPosition = scrollPosition + scrollAmount
    container.scrollTo({ left: newPosition, behavior: "smooth" })
    setScrollPosition(newPosition)
  }

  const handleCreateStory = () => {
    toast({
      title: "Create Story",
      description: "This feature is coming soon!",
    })
  }

  const handleViewStory = (userIndex: number) => {
    setActiveUserIndex(userIndex)
    setActiveStoryIndex(0)
  }

  const handleNextStory = () => {
    if (activeUserIndex === null || activeStoryIndex === null) return

    const userStories = stories.filter((story) => story.userId === usersWithStories[activeUserIndex].id)

    if (activeStoryIndex < userStories.length - 1) {
      // Next story of the same user
      setActiveStoryIndex(activeStoryIndex + 1)
    } else if (activeUserIndex < usersWithStories.length - 1) {
      // First story of the next user
      setActiveUserIndex(activeUserIndex + 1)
      setActiveStoryIndex(0)
    } else {
      // Close the story viewer
      setActiveUserIndex(null)
      setActiveStoryIndex(null)
    }
  }

  const handlePrevStory = () => {
    if (activeUserIndex === null || activeStoryIndex === null) return

    if (activeStoryIndex > 0) {
      // Previous story of the same user
      setActiveStoryIndex(activeStoryIndex - 1)
    } else if (activeUserIndex > 0) {
      // Last story of the previous user
      const prevUserStories = stories.filter((story) => story.userId === usersWithStories[activeUserIndex - 1].id)
      setActiveUserIndex(activeUserIndex - 1)
      setActiveStoryIndex(prevUserStories.length - 1)
    } else {
      // Close the story viewer
      setActiveUserIndex(null)
      setActiveStoryIndex(null)
    }
  }

  const closeStory = () => {
    setActiveUserIndex(null)
    setActiveStoryIndex(null)
  }

  return (
    <div className="relative mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Stories</h2>
        <Button variant="ghost" size="sm">
          See all
        </Button>
      </div>

      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 rounded-full"
          onClick={() => handleScroll("left")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div
          id="stories-container"
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollBehavior: "smooth" }}
        >
          {/* Create story */}
          <div className="flex-shrink-0">
            <div
              className="w-20 h-32 rounded-xl bg-gradient-to-b from-primary/20 to-primary/10 flex flex-col items-center justify-center cursor-pointer border border-border"
              onClick={handleCreateStory}
            >
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-background">
                  <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <PlusCircle className="h-5 w-5 text-primary absolute -bottom-1 -right-1 bg-background rounded-full" />
              </div>
              <span className="text-xs mt-2 text-center">Create Story</span>
            </div>
          </div>

          {/* User stories */}
          {usersWithStories.map((user, index) => {
            const hasStories = userStories[user.id]?.length > 0
            return (
              <div key={user.id} className="flex-shrink-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      className={cn(
                        "w-20 h-32 rounded-xl overflow-hidden cursor-pointer relative",
                        !hasStories && "opacity-60",
                      )}
                      onClick={() => hasStories && handleViewStory(index)}
                    >
                      {/* Story preview */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 z-10" />
                      <img
                        src={
                          hasStories
                            ? userStories[user.id][0].type === "image"
                              ? userStories[user.id][0].content
                              : user.avatar || "/placeholder.svg"
                            : user.avatar || "/placeholder.svg"
                        }
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />

                      {/* User avatar */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20">
                        <Avatar
                          className={cn("h-8 w-8 border-2", hasStories ? "border-primary" : "border-muted-foreground")}
                        >
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </div>

                      {/* Username */}
                      <div className="absolute bottom-2 left-0 right-0 text-center z-20">
                        <span className="text-xs text-white font-medium">
                          {user.id === currentUser.id ? "Your Story" : user.name.split(" ")[0]}
                        </span>
                      </div>
                    </div>
                  </DialogTrigger>

                  {hasStories && activeUserIndex === index && activeStoryIndex !== null && (
                    <DialogContent className="max-w-3xl p-0 h-[80vh] overflow-hidden">
                      <div className="relative h-full">
                        {/* Story content */}
                        <div className="absolute inset-0 bg-black">
                          {userStories[user.id][activeStoryIndex].type === "image" ? (
                            <img
                              src={userStories[user.id][activeStoryIndex].content || "/placeholder.svg"}
                              alt="Story"
                              className="w-full h-full object-contain"
                            />
                          ) : userStories[user.id][activeStoryIndex].type === "video" ? (
                            <video
                              src={userStories[user.id][activeStoryIndex].content}
                              autoPlay
                              muted
                              loop
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div
                              className="w-full h-full flex items-center justify-center p-8 text-white text-xl font-medium"
                              style={{
                                background:
                                  userStories[user.id][activeStoryIndex].background ||
                                  "linear-gradient(to right, #4f46e5, #7c3aed)",
                              }}
                            >
                              {userStories[user.id][activeStoryIndex].content}
                            </div>
                          )}
                        </div>

                        {/* Story header */}
                        <div className="absolute top-0 left-0 right-0 p-4 flex items-center gap-3 z-10">
                          <Avatar className="h-10 w-10 border-2 border-white">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-white font-medium">{user.name}</p>
                            <p className="text-white/70 text-xs">
                              {new Date(userStories[user.id][activeStoryIndex].createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon" className="ml-auto text-white" onClick={closeStory}>
                            <X className="h-5 w-5" />
                          </Button>
                        </div>

                        {/* Story progress */}
                        <div className="absolute top-0 left-0 right-0 p-2 flex gap-1 z-10">
                          {userStories[user.id].map((_, i) => (
                            <div key={i} className="h-1 bg-white/30 rounded-full flex-1 overflow-hidden">
                              <div
                                className={cn(
                                  "h-full bg-white",
                                  i < activeStoryIndex ? "w-full" : i === activeStoryIndex ? "animate-progress" : "w-0",
                                )}
                              />
                            </div>
                          ))}
                        </div>

                        {/* Navigation controls */}
                        <button className="absolute left-0 top-0 bottom-0 w-1/4 z-10" onClick={handlePrevStory} />
                        <button className="absolute right-0 top-0 bottom-0 w-1/4 z-10" onClick={handleNextStory} />
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              </div>
            )
          })}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 rounded-full"
          onClick={() => handleScroll("right")}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
