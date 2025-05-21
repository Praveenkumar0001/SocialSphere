"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, MicOff, Video, VideoOff, PhoneOff, Phone, Users, MessageSquare, MoreVertical } from "lucide-react"
import { getCurrentUser } from "@/app/utils/auth"

interface VideoCallProps {
  isOpen: boolean
  onClose: () => void
  contactName?: string
  contactAvatar?: string
  contactUsername?: string
  isIncoming?: boolean
  onAccept?: () => void
  onDecline?: () => void
}

export function VideoCall({
  isOpen,
  onClose,
  contactName = "Jane Doe",
  contactAvatar = "/placeholder.svg?height=200&width=200",
  contactUsername = "janedoe",
  isIncoming = false,
  onAccept,
  onDecline,
}: VideoCallProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const currentUser = getCurrentUser()

  // Simulate call connection
  useEffect(() => {
    if (isOpen && !isIncoming) {
      // Outgoing call - auto connect after 2 seconds
      const timer = setTimeout(() => {
        setIsConnected(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, isIncoming])

  // Handle call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isConnected])

  // Simulate getting local video stream
  useEffect(() => {
    if (isOpen && localVideoRef.current) {
      // In a real app, this would use navigator.mediaDevices.getUserMedia
      // For demo, we'll create a canvas animation
      const canvas = document.createElement("canvas")
      canvas.width = 640
      canvas.height = 480
      const ctx = canvas.getContext("2d")

      const stream = canvas.captureStream(30)
      localVideoRef.current.srcObject = stream

      // Simple animation to show something is happening
      let hue = 0
      const drawFrame = () => {
        if (!ctx) return
        hue = (hue + 1) % 360
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw a simple avatar silhouette
        ctx.fillStyle = "#00000033"
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2 - 50, 80, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2 + 120, 140, 0, Math.PI, true)
        ctx.fill()

        animationFrame = requestAnimationFrame(drawFrame)
      }

      let animationFrame = requestAnimationFrame(drawFrame)

      return () => {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isOpen])

  // Simulate remote video when connected
  useEffect(() => {
    if (isConnected && remoteVideoRef.current) {
      // In a real app, this would come from WebRTC
      const canvas = document.createElement("canvas")
      canvas.width = 640
      canvas.height = 480
      const ctx = canvas.getContext("2d")

      const stream = canvas.captureStream(30)
      remoteVideoRef.current.srcObject = stream

      // Simple animation for remote video
      let frame = 0
      const drawFrame = () => {
        if (!ctx) return
        frame++

        // Background
        ctx.fillStyle = "#f0f0f0"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Animated pattern
        ctx.fillStyle = "#3b82f6"
        for (let i = 0; i < 10; i++) {
          ctx.beginPath()
          ctx.arc(
            canvas.width / 2 + Math.cos(frame / 50 + i) * 100,
            canvas.height / 2 + Math.sin(frame / 50 + i) * 100,
            20,
            0,
            Math.PI * 2,
          )
          ctx.fill()
        }

        // Avatar silhouette
        ctx.fillStyle = "#00000033"
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2 - 50, 80, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2 + 120, 140, 0, Math.PI, true)
        ctx.fill()

        animationFrame = requestAnimationFrame(drawFrame)
      }

      let animationFrame = requestAnimationFrame(drawFrame)

      return () => {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isConnected])

  const handleAcceptCall = () => {
    setIsConnected(true)
    if (onAccept) onAccept()
  }

  const handleDeclineCall = () => {
    if (onDecline) onDecline()
    onClose()
  }

  const handleEndCall = () => {
    setIsConnected(false)
    setCallDuration(0)
    onClose()
  }

  const toggleMute = () => setIsMuted(!isMuted)
  const toggleVideo = () => setIsVideoOn(!isVideoOn)

  // Format call duration as mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="relative h-[600px] flex flex-col">
          {/* Main video area */}
          <div className="flex-1 relative overflow-hidden bg-black">
            {isConnected ? (
              <>
                {/* Remote video (full screen) */}
                <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" muted={false} />

                {/* Local video (picture-in-picture) */}
                <div className="absolute bottom-4 right-4 w-1/4 aspect-video rounded-lg overflow-hidden border-2 border-white shadow-lg">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${!isVideoOn ? "hidden" : ""}`}
                  />
                  {!isVideoOn && (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                </div>

                {/* Call duration */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-sm">
                  {formatDuration(callDuration)}
                </div>
              </>
            ) : (
              /* Calling screen */
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                <Avatar className="h-32 w-32 mb-6">
                  <AvatarImage src={contactAvatar || "/placeholder.svg"} alt={contactName} />
                  <AvatarFallback className="text-3xl">{contactName.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mb-2">{contactName}</h2>
                <p className="text-gray-300 mb-8">@{contactUsername}</p>

                {isIncoming ? (
                  <>
                    <p className="text-xl mb-8 animate-pulse">Incoming video call...</p>
                    <div className="flex gap-6">
                      <Button
                        size="lg"
                        className="h-16 w-16 rounded-full bg-red-600 hover:bg-red-700"
                        onClick={handleDeclineCall}
                      >
                        <PhoneOff className="h-8 w-8" />
                        <span className="sr-only">Decline</span>
                      </Button>
                      <Button
                        size="lg"
                        className="h-16 w-16 rounded-full bg-green-600 hover:bg-green-700"
                        onClick={handleAcceptCall}
                      >
                        <Phone className="h-8 w-8" />
                        <span className="sr-only">Accept</span>
                      </Button>
                    </div>
                  </>
                ) : (
                  <p className="text-xl mb-8 animate-pulse">Calling...</p>
                )}
              </div>
            )}
          </div>

          {/* Call controls */}
          {isConnected && (
            <div className="p-4 bg-gray-800 flex items-center justify-between">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700 rounded-full">
                  <Users className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700 rounded-full">
                  <MessageSquare className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700 rounded-full">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full ${isMuted ? "bg-red-600 text-white border-red-600" : "bg-gray-700 text-white"}`}
                  onClick={toggleMute}
                >
                  {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={`rounded-full ${!isVideoOn ? "bg-red-600 text-white border-red-600" : "bg-gray-700 text-white"}`}
                  onClick={toggleVideo}
                >
                  {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>
                <Button
                  size="icon"
                  className="rounded-full bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleEndCall}
                >
                  <PhoneOff className="h-5 w-5" />
                </Button>
              </div>

              <div className="w-[88px]">{/* Empty div for flex spacing */}</div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
