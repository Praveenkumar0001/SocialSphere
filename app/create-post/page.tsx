"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/image-upload"
import { getCurrentUser } from "@/lib/data"
import { Globe, Users, Lock, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

export default function CreatePostPage() {
  const [content, setContent] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [visibility, setVisibility] = useState<"public" | "followers" | "private">("public")
  const router = useRouter()
  const currentUser = getCurrentUser()
  const { toast } = useToast()

  const handleImageUpload = (file: File) => {
    setImageFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleImageRemove = () => {
    setImageFile(null)
    setImagePreview(undefined)
  }

  const getVisibilityIcon = () => {
    switch (visibility) {
      case "public":
        return <Globe size={16} />
      case "followers":
        return <Users size={16} />
      case "private":
        return <Lock size={16} />
    }
  }

  const getVisibilityText = () => {
    switch (visibility) {
      case "public":
        return "Everyone can see"
      case "followers":
        return "Only followers can see"
      case "private":
        return "Only you can see"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim() && !imageFile) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Post created",
        description: "Your post has been published successfully!",
      })
      router.push("/dashboard")
    }, 1000)
  }

  // Extract hashtags and mentions for highlighting
  const formatContent = (text: string) => {
    return text.split(" ").map((word, index) => {
      if (word.startsWith("#")) {
        return (
          <span key={index} className="text-primary">
            {word}{" "}
          </span>
        )
      } else if (word.startsWith("@")) {
        return (
          <span key={index} className="text-primary">
            {word}{" "}
          </span>
        )
      }
      return word + " "
    })
  }

  return (
    <div className="container max-w-2xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Create Post</h1>

      <form onSubmit={handleSubmit}>
        <div className="border border-border rounded-lg p-4 mb-4">
          <div className="flex gap-3 mb-4">
            <Avatar>
              <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{currentUser.name}</div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                    {getVisibilityIcon()}
                    <span className="mx-1">{getVisibilityText()}</span>
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => setVisibility("public")}>
                    <Globe size={16} className="mr-2" />
                    <span>Everyone</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setVisibility("followers")}>
                    <Users size={16} className="mr-2" />
                    <span>Followers only</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setVisibility("private")}>
                    <Lock size={16} className="mr-2" />
                    <span>Only me</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px] mb-4 border-none focus-visible:ring-0 p-0 text-lg"
          />

          {content && (
            <div className="mb-4 p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Preview:</p>
              <p>{formatContent(content)}</p>
            </div>
          )}

          <ImageUpload onImageUpload={handleImageUpload} onImageRemove={handleImageRemove} previewUrl={imagePreview} />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={(!content.trim() && !imageFile) || isSubmitting}>
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </div>
      </form>
    </div>
  )
}
