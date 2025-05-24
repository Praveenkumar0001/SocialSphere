"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Camera, ImageIcon, Upload, Wand2 } from "lucide-react"

interface VirtualBackgroundProps {
  videoRef: React.RefObject<HTMLVideoElement>
  onBackgroundChange: (background: string | null) => void
}

export function VirtualBackground({ videoRef, onBackgroundChange }: VirtualBackgroundProps) {
  const [activeBackground, setActiveBackground] = useState<string | null>(null)
  const [blurAmount, setBlurAmount] = useState(5)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const backgrounds = [
    { id: "blur", name: "Blur", type: "effect" },
    { id: "office", name: "Office", image: "/placeholder.svg?height=100&width=200&text=Office" },
    { id: "beach", name: "Beach", image: "/placeholder.svg?height=100&width=200&text=Beach" },
    { id: "forest", name: "Forest", image: "/placeholder.svg?height=100&width=200&text=Forest" },
    { id: "city", name: "City", image: "/placeholder.svg?height=100&width=200&text=City" },
    { id: "space", name: "Space", image: "/placeholder.svg?height=100&width=200&text=Space" },
  ]

  const applyBackground = (backgroundId: string | null) => {
    setActiveBackground(backgroundId)
    onBackgroundChange(backgroundId)

    if (backgroundId === "blur") {
      applyBlurEffect()
    } else if (backgroundId) {
      applyImageBackground(backgroundId)
    } else {
      // Reset to no background
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          canvas.style.display = "none"
          video.style.display = "block"
        }
      }
    }
  }

  const applyBlurEffect = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480

    // Hide original video, show canvas
    video.style.display = "none"
    canvas.style.display = "block"

    // Apply blur effect
    setIsProcessing(true)

    const drawFrame = () => {
      if (!videoRef.current || !canvasRef.current) return

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Apply blur filter
      ctx.filter = `blur(${blurAmount}px)`
      ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height)
      ctx.filter = "none"

      requestAnimationFrame(drawFrame)
    }

    drawFrame()
    setIsProcessing(false)
  }

  const applyImageBackground = (backgroundId: string) => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480

    // Hide original video, show canvas
    video.style.display = "none"
    canvas.style.display = "block"

    // Load background image
    const background = new Image()
    background.crossOrigin = "anonymous"
    const backgroundData = backgrounds.find((bg) => bg.id === backgroundId)

    if (backgroundData && backgroundData.image) {
      background.src = backgroundData.image

      setIsProcessing(true)

      background.onload = () => {
        const drawFrame = () => {
          if (!videoRef.current || !canvasRef.current) return

          // Draw background image
          ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

          // Draw video on top (in a real implementation, this would use segmentation)
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

          requestAnimationFrame(drawFrame)
        }

        drawFrame()
        setIsProcessing(false)
      }
    }
  }

  const handleBlurChange = (value: number[]) => {
    setBlurAmount(value[0])
    if (activeBackground === "blur") {
      applyBlurEffect()
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const customBackground = event.target?.result as string
      // In a real implementation, we would add this to the backgrounds array
      // For now, we'll just apply it directly
      setActiveBackground("custom")

      if (!videoRef.current || !canvasRef.current) return

      const video = videoRef.current
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      if (!ctx) return

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth || 640
      canvas.height = video.videoHeight || 480

      // Hide original video, show canvas
      video.style.display = "none"
      canvas.style.display = "block"

      // Load custom background image
      const background = new Image()
      background.crossOrigin = "anonymous"
      background.src = customBackground

      background.onload = () => {
        const drawFrame = () => {
          if (!videoRef.current || !canvasRef.current) return

          // Draw background image
          ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

          // Draw video on top (in a real implementation, this would use segmentation)
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

          requestAnimationFrame(drawFrame)
        }

        drawFrame()
      }
    }

    reader.readAsDataURL(file)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          <span>Virtual Background</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Virtual Background</DialogTitle>
          <DialogDescription>Choose a background or effect for your video call.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="backgrounds" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="backgrounds">Backgrounds</TabsTrigger>
            <TabsTrigger value="effects">Effects</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="backgrounds" className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div
                className={`aspect-video rounded-md border-2 flex items-center justify-center cursor-pointer ${
                  activeBackground === null ? "border-primary" : "border-transparent hover:border-gray-300"
                }`}
                onClick={() => applyBackground(null)}
              >
                <Camera className="h-6 w-6 text-gray-400" />
                <span className="text-xs ml-1">None</span>
              </div>

              {backgrounds
                .filter((bg) => bg.type !== "effect")
                .map((background) => (
                  <div
                    key={background.id}
                    className={`aspect-video rounded-md border-2 overflow-hidden cursor-pointer ${
                      activeBackground === background.id ? "border-primary" : "border-transparent hover:border-gray-300"
                    }`}
                    onClick={() => applyBackground(background.id)}
                  >
                    {background.image && (
                      <img
                        src={background.image || "/placeholder.svg"}
                        alt={background.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="effects" className="space-y-4">
            <div
              className={`p-4 rounded-md border-2 flex items-center justify-between cursor-pointer ${
                activeBackground === "blur" ? "border-primary" : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => applyBackground("blur")}
            >
              <div className="flex items-center">
                <Wand2 className="h-5 w-5 mr-2 text-gray-500" />
                <div>
                  <p className="font-medium">Background Blur</p>
                  <p className="text-sm text-gray-500">Blur your background</p>
                </div>
              </div>

              {activeBackground === "blur" && (
                <div className="w-24">
                  <Label htmlFor="blur-amount" className="text-xs">
                    Blur Amount
                  </Label>
                  <Slider
                    id="blur-amount"
                    min={1}
                    max={20}
                    step={1}
                    value={[blurAmount]}
                    onValueChange={handleBlurChange}
                  />
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed rounded-md p-8 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-4">Upload your own background image</p>
              <input
                type="file"
                id="background-upload"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              <label htmlFor="background-upload">
                <Button variant="outline" className="cursor-pointer" asChild>
                  <span>Choose Image</span>
                </Button>
              </label>
            </div>
          </TabsContent>
        </Tabs>

        {isProcessing && (
          <div className="text-center py-2">
            <p className="text-sm text-gray-500">Processing background...</p>
          </div>
        )}

        <DialogFooter>
          <Button onClick={() => applyBackground(null)} variant="outline">
            Remove Background
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
