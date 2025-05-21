"use client"

import { useState, useRef, useEffect } from "react"
import { Camera, Download, RefreshCcw, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface ARFilter {
  id: string
  name: string
  thumbnail: string
  type: "overlay" | "effect" | "background"
  config: {
    src?: string
    intensity?: number
    color?: string
    blur?: number
  }
}

interface ARFiltersProps {
  onCapture?: (imageData: string) => void
  className?: string
}

export function ARFilters({ onCapture, className }: ARFiltersProps) {
  const [activeTab, setActiveTab] = useState("filters")
  const [selectedFilter, setSelectedFilter] = useState<ARFilter | null>(null)
  const [intensity, setIntensity] = useState(50)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const { toast } = useToast()

  // Sample filters
  const filters: ARFilter[] = [
    {
      id: "filter1",
      name: "Golden Hour",
      thumbnail: "/placeholder.svg?height=80&width=80",
      type: "effect",
      config: {
        color: "rgba(255, 180, 0, 0.2)",
        intensity: 0.3,
      },
    },
    {
      id: "filter2",
      name: "Vintage",
      thumbnail: "/placeholder.svg?height=80&width=80",
      type: "effect",
      config: {
        color: "rgba(160, 120, 90, 0.3)",
        intensity: 0.4,
      },
    },
    {
      id: "filter3",
      name: "Cool Blue",
      thumbnail: "/placeholder.svg?height=80&width=80",
      type: "effect",
      config: {
        color: "rgba(70, 130, 180, 0.2)",
        intensity: 0.3,
      },
    },
    {
      id: "filter4",
      name: "Sparkles",
      thumbnail: "/placeholder.svg?height=80&width=80",
      type: "overlay",
      config: {
        src: "/placeholder.svg?height=400&width=400",
      },
    },
    {
      id: "filter5",
      name: "Blur Background",
      thumbnail: "/placeholder.svg?height=80&width=80",
      type: "background",
      config: {
        blur: 5,
      },
    },
  ]

  // Initialize camera
  useEffect(() => {
    if (cameraActive && videoRef.current && cameraPermission) {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" },
          })

          if (videoRef.current) {
            videoRef.current.srcObject = stream
            streamRef.current = stream
          }
        } catch (err) {
          console.error("Error accessing camera:", err)
          setCameraPermission(false)
          toast({
            variant: "destructive",
            title: "Camera access denied",
            description: "Please allow camera access to use AR filters",
          })
        }
      }

      startCamera()

      return () => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop())
        }
      }
    }
  }, [cameraActive, cameraPermission, toast])

  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true })
      setCameraPermission(true)
      setCameraActive(true)
    } catch (err) {
      setCameraPermission(false)
      toast({
        variant: "destructive",
        title: "Camera access denied",
        description: "Please allow camera access to use AR filters",
      })
    }
  }

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (!context) return

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw the video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Apply selected filter
    if (selectedFilter) {
      applyFilterToCanvas(context, canvas.width, canvas.height)
    }

    // Get the image data as a data URL
    const imageData = canvas.toDataURL("image/png")
    setCapturedImage(imageData)

    if (onCapture) {
      onCapture(imageData)
    }
  }

  const applyFilterToCanvas = (context: CanvasRenderingContext2D, width: number, height: number) => {
    if (!selectedFilter) return

    const intensityFactor = intensity / 100

    if (selectedFilter.type === "effect" && selectedFilter.config.color) {
      // Apply color overlay
      context.fillStyle = selectedFilter.config.color
      context.globalAlpha = intensityFactor
      context.fillRect(0, 0, width, height)
      context.globalAlpha = 1.0
    }

    // Other filter types would be implemented here
    // This is a simplified version
  }

  const downloadImage = () => {
    if (!capturedImage) return

    const link = document.createElement("a")
    link.href = capturedImage
    link.download = `ar-filter-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Image downloaded",
      description: "Your filtered image has been saved",
    })
  }

  const resetCapture = () => {
    setCapturedImage(null)
  }

  return (
    <div className={cn("rounded-lg border bg-card overflow-hidden", className)}>
      <div className="relative aspect-[4/3] bg-black">
        {!cameraActive && !capturedImage ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <Camera className="h-12 w-12 mb-4 opacity-60" />
            <h3 className="text-lg font-medium mb-2">Try AR Filters</h3>
            <p className="text-sm text-white/70 mb-4 text-center max-w-xs">
              Enhance your photos with augmented reality filters
            </p>
            <Button onClick={requestCameraPermission}>Enable Camera</Button>
          </div>
        ) : capturedImage ? (
          <div className="relative h-full">
            <img src={capturedImage || "/placeholder.svg"} alt="Captured" className="w-full h-full object-contain" />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-black/50 hover:bg-black/70"
                onClick={resetCapture}
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-black/50 hover:bg-black/70"
                onClick={downloadImage}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            <canvas ref={canvasRef} className="hidden" />

            {selectedFilter && (
              <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                {selectedFilter.name}
              </div>
            )}

            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 rounded-full bg-black/50 hover:bg-black/70"
              onClick={() => setCameraActive(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            <Button className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-6" onClick={captureImage}>
              <Camera className="h-4 w-4 mr-2" />
              Capture
            </Button>
          </>
        )}
      </div>

      {cameraActive && !capturedImage && (
        <div className="p-4">
          <Tabs defaultValue="filters" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="filters" className="flex-1">
                Filters
              </TabsTrigger>
              <TabsTrigger value="effects" className="flex-1">
                Effects
              </TabsTrigger>
              <TabsTrigger value="adjust" className="flex-1">
                Adjust
              </TabsTrigger>
            </TabsList>

            <TabsContent value="filters" className="mt-4">
              <div className="grid grid-cols-5 gap-2">
                {filters.map((filter) => (
                  <div
                    key={filter.id}
                    className={cn(
                      "aspect-square rounded-md overflow-hidden cursor-pointer border-2",
                      selectedFilter?.id === filter.id ? "border-primary" : "border-transparent",
                    )}
                    onClick={() => setSelectedFilter(filter)}
                  >
                    <img
                      src={filter.thumbnail || "/placeholder.svg"}
                      alt={filter.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="effects" className="mt-4">
              <div className="text-center py-4 text-muted-foreground">Effects will be available soon</div>
            </TabsContent>

            <TabsContent value="adjust" className="mt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Intensity</span>
                  <span className="text-sm">{intensity}%</span>
                </div>
                <Slider
                  value={[intensity]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setIntensity(value[0])}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
