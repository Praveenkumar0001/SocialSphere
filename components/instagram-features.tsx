"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Star, ShoppingBag, Eye, Repeat, Zap, Radio } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Instagram Live Streaming Component
export function InstagramLive() {
  const [isLive, setIsLive] = useState(false)
  const [viewers, setViewers] = useState(0)
  const [comments, setComments] = useState<Array<{ user: string; message: string; timestamp: Date }>>([])
  const [newComment, setNewComment] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const { toast } = useToast()

  const startLive = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setIsLive(true)
      setViewers(Math.floor(Math.random() * 100) + 1)

      toast({
        title: "🔴 You're now live!",
        description: "Your followers will be notified",
      })

      // Simulate viewer growth
      const interval = setInterval(() => {
        setViewers((prev) => prev + Math.floor(Math.random() * 5))
      }, 3000)

      return () => clearInterval(interval)
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to go live",
        variant: "destructive",
      })
    }
  }

  const endLive = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }
    setIsLive(false)
    setViewers(0)
    toast({
      title: "Live ended",
      description: "Your live stream has ended",
    })
  }

  const addComment = () => {
    if (newComment.trim()) {
      setComments((prev) => [
        ...prev,
        {
          user: "viewer_" + Math.floor(Math.random() * 1000),
          message: newComment,
          timestamp: new Date(),
        },
      ])
      setNewComment("")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Radio className="h-5 w-5 text-red-500" />
          Instagram Live
          {isLive && (
            <Badge variant="destructive" className="animate-pulse">
              LIVE
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-[9/16] bg-black rounded-lg overflow-hidden mb-4">
          <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />

          {isLive && (
            <>
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Badge variant="destructive" className="animate-pulse">
                  LIVE
                </Badge>
                <div className="flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
                  <Eye className="h-3 w-3 text-white" />
                  <span className="text-white text-xs">{viewers}</span>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/50 rounded-lg p-2 mb-2 max-h-32 overflow-y-auto">
                  {comments.slice(-3).map((comment, index) => (
                    <div key={index} className="text-white text-xs mb-1">
                      <span className="font-semibold">{comment.user}:</span> {comment.message}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addComment()}
                    className="flex-1 bg-white/20 text-white placeholder-white/70 rounded-full px-3 py-1 text-sm"
                  />
                  <Button size="sm" onClick={addComment}>
                    <Send className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-2">
          {!isLive ? (
            <Button onClick={startLive} className="flex-1">
              <Radio className="h-4 w-4 mr-2" />
              Go Live
            </Button>
          ) : (
            <Button onClick={endLive} variant="destructive" className="flex-1">
              End Live
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Instagram Close Friends Feature
export function CloseFriends() {
  const [closeFriends, setCloseFriends] = useState<string[]>([])
  const [showCloseFriendsStory, setShowCloseFriendsStory] = useState(false)

  const toggleCloseFriend = (userId: string) => {
    setCloseFriends((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-green-500" />
          Close Friends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {["user-1", "user-2", "user-3"].map((userId) => (
            <div key={userId} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">User {userId}</p>
                  <p className="text-sm text-muted-foreground">@user{userId}</p>
                </div>
              </div>
              <Button
                variant={closeFriends.includes(userId) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleCloseFriend(userId)}
              >
                <Star className={`h-4 w-4 mr-1 ${closeFriends.includes(userId) ? "fill-current" : ""}`} />
                {closeFriends.includes(userId) ? "Close Friend" : "Add"}
              </Button>
            </div>
          ))}
        </div>

        <Button className="w-full mt-4 bg-green-500 hover:bg-green-600" onClick={() => setShowCloseFriendsStory(true)}>
          Share to Close Friends
        </Button>
      </CardContent>
    </Card>
  )
}

// Instagram Boomerang Feature
export function Boomerang() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordedFrames, setRecordedFrames] = useState<string[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startBoomerang = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      setIsRecording(true)
      const frames: string[] = []

      // Capture frames for 3 seconds
      const interval = setInterval(() => {
        if (canvasRef.current && videoRef.current) {
          const canvas = canvasRef.current
          const video = videoRef.current
          const ctx = canvas.getContext("2d")

          if (ctx) {
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            ctx.drawImage(video, 0, 0)
            frames.push(canvas.toDataURL())
          }
        }
      }, 100)

      setTimeout(() => {
        clearInterval(interval)
        setIsRecording(false)
        setRecordedFrames([...frames, ...frames.reverse()])

        // Stop camera
        const stream = videoRef.current?.srcObject as MediaStream
        stream?.getTracks().forEach((track) => track.stop())
      }, 3000)
    } catch (error) {
      console.error("Camera access denied:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Repeat className="h-5 w-5" />
          Boomerang
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-square bg-black rounded-lg overflow-hidden mb-4">
          <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
          <canvas ref={canvasRef} className="hidden" />

          {isRecording && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-500 text-white px-4 py-2 rounded-full animate-pulse">Recording Boomerang...</div>
            </div>
          )}
        </div>

        <Button onClick={startBoomerang} disabled={isRecording} className="w-full">
          <Zap className="h-4 w-4 mr-2" />
          {isRecording ? "Recording..." : "Create Boomerang"}
        </Button>

        {recordedFrames.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Boomerang created! ({recordedFrames.length} frames)</p>
            <Button variant="outline" className="w-full">
              Share Boomerang
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Instagram Shopping Integration
export function InstagramShopping() {
  const [products] = useState([
    { id: 1, name: "Vintage Jacket", price: 89.99, image: "/placeholder.svg" },
    { id: 2, name: "Designer Sneakers", price: 159.99, image: "/placeholder.svg" },
    { id: 3, name: "Luxury Watch", price: 299.99, image: "/placeholder.svg" },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Shop
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden">
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-32 object-cover" />
              <div className="p-2">
                <p className="font-medium text-sm">{product.name}</p>
                <p className="text-lg font-bold">${product.price}</p>
                <Button size="sm" className="w-full mt-2">
                  View Product
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
