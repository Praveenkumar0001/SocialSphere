"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  Play,
  Volume2,
  VolumeX,
  MoreHorizontal,
  Music,
  Sparkles,
  Camera,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { users } from "@/lib/data"

interface Reel {
  id: string
  userId: string
  videoUrl: string
  thumbnailUrl: string
  caption: string
  music?: {
    title: string
    artist: string
    url: string
  }
  likes: string[]
  comments: number
  shares: number
  views: number
  createdAt: string
  effects?: string[]
  hashtags: string[]
}

export function EnhancedReels() {
  const [currentReelIndex, setCurrentReelIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [likedReels, setLikedReels] = useState<Set<string>>(new Set())
  const [savedReels, setSavedReels] = useState<Set<string>>(new Set())
  const videoRef = useRef<HTMLVideoElement>(null)
  const { toast } = useToast()

  const reels: Reel[] = [
    {
      id: "reel-1",
      userId: "user-2",
      videoUrl: "/placeholder.svg?height=800&width=450&text=Reel+Video+1",
      thumbnailUrl: "/placeholder.svg?height=800&width=450&text=Thumbnail+1",
      caption: "Amazing sunset timelapse! 🌅 #sunset #timelapse #nature",
      music: {
        title: "Chill Vibes",
        artist: "Lo-Fi Beats",
        url: "/audio/chill-vibes.mp3",
      },
      likes: ["user-1", "user-3"],
      comments: 24,
      shares: 8,
      views: 1250,
      createdAt: "2024-01-15T10:30:00Z",
      effects: ["Color Pop", "Slow Motion"],
      hashtags: ["sunset", "timelapse", "nature"],
    },
    {
      id: "reel-2",
      userId: "user-3",
      videoUrl: "/placeholder.svg?height=800&width=450&text=Reel+Video+2",
      thumbnailUrl: "/placeholder.svg?height=800&width=450&text=Thumbnail+2",
      caption: "Quick cooking hack! Try this at home 👨‍🍳 #cooking #foodhack #recipe",
      music: {
        title: "Upbeat Kitchen",
        artist: "Cooking Sounds",
        url: "/audio/upbeat-kitchen.mp3",
      },
      likes: ["user-1", "user-2", "user-4"],
      comments: 45,
      shares: 15,
      views: 2100,
      createdAt: "2024-01-14T15:20:00Z",
      effects: ["Speed Up", "Text Overlay"],
      hashtags: ["cooking", "foodhack", "recipe"],
    },
    {
      id: "reel-3",
      userId: "user-4",
      videoUrl: "/placeholder.svg?height=800&width=450&text=Reel+Video+3",
      thumbnailUrl: "/placeholder.svg?height=800&width=450&text=Thumbnail+3",
      caption: "Dance challenge! Who's joining? 💃 #dance #challenge #viral",
      music: {
        title: "Dance Beat",
        artist: "Party Mix",
        url: "/audio/dance-beat.mp3",
      },
      likes: ["user-1", "user-2", "user-3"],
      comments: 89,
      shares: 32,
      views: 5400,
      createdAt: "2024-01-13T20:45:00Z",
      effects: ["AR Filter", "Beat Sync"],
      hashtags: ["dance", "challenge", "viral"],
    },
  ]

  const currentReel = reels[currentReelIndex]
  const author = users.find((u) => u.id === currentReel?.userId)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      if (isPlaying) {
        video.play().catch(console.error)
      } else {
        video.pause()
      }
    }
  }, [isPlaying, currentReelIndex])

  const handleLike = (reelId: string) => {
    setLikedReels((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(reelId)) {
        newSet.delete(reelId)
      } else {
        newSet.add(reelId)
      }
      return newSet
    })

    toast({
      title: likedReels.has(reelId) ? "Removed from likes" : "Liked!",
      description: likedReels.has(reelId) ? "Reel removed from your likes" : "Reel added to your likes",
    })
  }

  const handleSave = (reelId: string) => {
    setSavedReels((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(reelId)) {
        newSet.delete(reelId)
      } else {
        newSet.add(reelId)
      }
      return newSet
    })

    toast({
      title: savedReels.has(reelId) ? "Removed from saved" : "Saved!",
      description: savedReels.has(reelId) ? "Reel removed from your saved items" : "Reel saved to your collection",
    })
  }

  const handleShare = (reelId: string) => {
    navigator.clipboard.writeText(`https://socialsphere.com/reels/${reelId}`)
    toast({
      title: "Link copied!",
      description: "Reel link copied to clipboard",
    })
  }

  const nextReel = () => {
    setCurrentReelIndex((prev) => (prev + 1) % reels.length)
  }

  const prevReel = () => {
    setCurrentReelIndex((prev) => (prev - 1 + reels.length) % reels.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
  }

  if (!currentReel || !author) {
    return <div>Loading reels...</div>
  }

  return (
    <div className="max-w-md mx-auto bg-black rounded-lg overflow-hidden relative h-[80vh]">
      {/* Video Container */}
      <div className="relative h-full">
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          poster={currentReel.thumbnailUrl}
          onClick={togglePlayPause}
        >
          <source src={currentReel.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-16 w-16 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={togglePlayPause}
            >
              <Play className="h-8 w-8 ml-1" />
            </Button>
          </div>
        )}

        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Badge variant="secondary" className="bg-black/50 text-white">
            Reels
          </Badge>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={prevReel}
          >
            ←
          </Button>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={nextReel}
          >
            →
          </Button>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Author Info */}
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">{author.name}</span>
                {author.isVerified && <span className="text-blue-400">✓</span>}
              </div>
              <span className="text-white/70 text-sm">@{author.username}</span>
            </div>
            <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-black">
              Follow
            </Button>
          </div>

          {/* Caption */}
          <p className="text-white text-sm mb-2 line-clamp-2">{currentReel.caption}</p>

          {/* Music Info */}
          {currentReel.music && (
            <div className="flex items-center gap-2 mb-3">
              <Music className="h-4 w-4 text-white" />
              <span className="text-white text-sm">
                {currentReel.music.title} - {currentReel.music.artist}
              </span>
            </div>
          )}

          {/* Effects */}
          {currentReel.effects && currentReel.effects.length > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-white" />
              <div className="flex gap-1">
                {currentReel.effects.map((effect, index) => (
                  <Badge key={index} variant="secondary" className="bg-white/20 text-white text-xs">
                    {effect}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-2"
                onClick={() => handleLike(currentReel.id)}
              >
                <Heart
                  className={`h-5 w-5 mr-1 ${likedReels.has(currentReel.id) ? "fill-red-500 text-red-500" : ""}`}
                />
                {currentReel.likes.length + (likedReels.has(currentReel.id) ? 1 : 0)}
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
                <MessageCircle className="h-5 w-5 mr-1" />
                {currentReel.comments}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-2"
                onClick={() => handleShare(currentReel.id)}
              >
                <Share className="h-5 w-5 mr-1" />
                {currentReel.shares}
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => handleSave(currentReel.id)}
            >
              <Bookmark className={`h-5 w-5 ${savedReels.has(currentReel.id) ? "fill-white" : ""}`} />
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mt-2 text-white/70 text-xs">
            <span>{currentReel.views.toLocaleString()} views</span>
            <span>{new Date(currentReel.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${((currentReelIndex + 1) / reels.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Create Reel Button */}
      <div className="absolute top-4 right-4">
        <Button
          variant="default"
          size="sm"
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
        >
          <Camera className="h-4 w-4 mr-1" />
          Create
        </Button>
      </div>
    </div>
  )
}
