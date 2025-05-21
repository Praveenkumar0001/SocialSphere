"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/image-upload"
import { currentUser, updateUserProfile } from "@/lib/data"
import { useToast } from "@/components/ui/use-toast"
import { isLoggedIn } from "@/app/utils/auth"

export default function EditProfilePage({ params }: { params: { username: string } }) {
  const [name, setName] = useState(currentUser.name)
  const [bio, setBio] = useState(currentUser.bio || "")
  const [location, setLocation] = useState(currentUser.location || "")
  const [website, setWebsite] = useState(currentUser.website || "")
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(currentUser.avatar)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | undefined>(currentUser.coverImage)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login")
      return
    }

    // Check if the current user is editing their own profile
    if (params.username !== currentUser.username) {
      router.push(`/profile/${params.username}`)
      toast({
        variant: "destructive",
        title: "Unauthorized",
        description: "You can only edit your own profile.",
      })
    }
  }, [params.username, router, toast])

  const handleAvatarUpload = (file: File) => {
    setAvatarFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleCoverUpload = (file: File) => {
    setCoverFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setCoverPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call to update profile
    setTimeout(() => {
      try {
        updateUserProfile(currentUser.id, {
          name,
          bio,
          location,
          website,
          avatar: avatarPreview,
          coverImage: coverPreview,
        })

        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        })

        router.push(`/profile/${params.username}`)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update profile. Please try again.",
        })
      } finally {
        setIsSubmitting(false)
      }
    }, 1000)
  }

  return (
    <div className="container max-w-2xl py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
          <p className="text-muted-foreground">Update your profile information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Cover Image */}
          <div className="space-y-2">
            <Label htmlFor="cover-image">Cover Image</Label>
            <div className="h-48 overflow-hidden rounded-lg">
              <ImageUpload
                onImageUpload={handleCoverUpload}
                onImageRemove={() => setCoverPreview(undefined)}
                previewUrl={coverPreview}
              />
            </div>
          </div>

          {/* Avatar */}
          <div className="space-y-2">
            <Label htmlFor="avatar">Profile Picture</Label>
            <div className="max-w-[200px]">
              <ImageUpload
                onImageUpload={handleAvatarUpload}
                onImageRemove={() => setAvatarPreview(undefined)}
                previewUrl={avatarPreview}
              />
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself"
              className="min-h-[100px]"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country"
            />
          </div>

          {/* Website */}
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://yourwebsite.com"
              type="url"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push(`/profile/${params.username}`)}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
