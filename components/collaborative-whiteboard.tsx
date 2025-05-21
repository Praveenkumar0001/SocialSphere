"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Pencil, Eraser, Square, Circle, Type, Download, Trash2, Undo, Redo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface WhiteboardAction {
  type: string
  data: any
}

interface CollaborativeWhiteboardProps {
  className?: string
}

export function CollaborativeWhiteboard({ className }: CollaborativeWhiteboardProps) {
  const [tool, setTool] = useState<"pencil" | "eraser" | "rectangle" | "circle" | "text">("pencil")
  const [color, setColor] = useState("#000000")
  const [brushSize, setBrushSize] = useState(5)
  const [isDrawing, setIsDrawing] = useState(false)
  const [actions, setActions] = useState<WhiteboardAction[]>([])
  const [redoStack, setRedoStack] = useState<WhiteboardAction[]>([])

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const startPointRef = useRef<{ x: number; y: number } | null>(null)

  const { toast } = useToast()

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Get context
    const context = canvas.getContext("2d")
    if (!context) return

    // Configure context
    context.lineCap = "round"
    context.lineJoin = "round"
    context.strokeStyle = color
    context.lineWidth = brushSize

    contextRef.current = context

    // Clear canvas with white background
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)

    // Handle window resize
    const handleResize = () => {
      if (!canvas || !context) return

      // Save current drawing
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)

      // Resize canvas
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      // Restore context settings
      context.lineCap = "round"
      context.lineJoin = "round"
      context.strokeStyle = color
      context.lineWidth = brushSize

      // Fill with white background
      context.fillStyle = "white"
      context.fillRect(0, 0, canvas.width, canvas.height)

      // Restore drawing
      context.putImageData(imageData, 0, 0)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [color, brushSize])

  // Update context when color or brush size changes
  useEffect(() => {
    if (!contextRef.current) return

    contextRef.current.strokeStyle = color
    contextRef.current.lineWidth = brushSize
  }, [color, brushSize])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!contextRef.current) return

    const { offsetX, offsetY } = e.nativeEvent

    if (tool === "pencil" || tool === "eraser") {
      contextRef.current.beginPath()
      contextRef.current.moveTo(offsetX, offsetY)

      if (tool === "eraser") {
        contextRef.current.globalCompositeOperation = "destination-out"
      } else {
        contextRef.current.globalCompositeOperation = "source-over"
      }

      setIsDrawing(true)
    } else if (tool === "rectangle" || tool === "circle") {
      startPointRef.current = { x: offsetX, y: offsetY }
      setIsDrawing(true)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current) return

    const { offsetX, offsetY } = e.nativeEvent

    if (tool === "pencil" || tool === "eraser") {
      contextRef.current.lineTo(offsetX, offsetY)
      contextRef.current.stroke()
    } else if (tool === "rectangle" && startPointRef.current) {
      // For preview, we need to redraw the canvas
      const canvas = canvasRef.current
      if (!canvas) return

      // Get the last saved state or create a new one
      const savedImageData = contextRef.current.getImageData(0, 0, canvas.width, canvas.height)

      // Draw the rectangle
      contextRef.current.putImageData(savedImageData, 0, 0)
      contextRef.current.beginPath()
      contextRef.current.rect(
        startPointRef.current.x,
        startPointRef.current.y,
        offsetX - startPointRef.current.x,
        offsetY - startPointRef.current.y,
      )
      contextRef.current.stroke()
    } else if (tool === "circle" && startPointRef.current) {
      // For preview, we need to redraw the canvas
      const canvas = canvasRef.current
      if (!canvas) return

      // Get the last saved state or create a new one
      const savedImageData = contextRef.current.getImageData(0, 0, canvas.width, canvas.height)

      // Calculate radius
      const radius = Math.sqrt(
        Math.pow(offsetX - startPointRef.current.x, 2) + Math.pow(offsetY - startPointRef.current.y, 2),
      )

      // Draw the circle
      contextRef.current.putImageData(savedImageData, 0, 0)
      contextRef.current.beginPath()
      contextRef.current.arc(startPointRef.current.x, startPointRef.current.y, radius, 0, 2 * Math.PI)
      contextRef.current.stroke()
    }
  }

  const stopDrawing = () => {
    if (!isDrawing || !contextRef.current) return

    if (tool === "pencil" || tool === "eraser") {
      contextRef.current.closePath()
    }

    // Save the action
    const canvas = canvasRef.current
    if (canvas) {
      const imageData = contextRef.current.getImageData(0, 0, canvas.width, canvas.height)
      setActions([...actions, { type: tool, data: imageData }])
      setRedoStack([]) // Clear redo stack when a new action is performed
    }

    setIsDrawing(false)
    startPointRef.current = null
  }

  const handleUndo = () => {
    if (actions.length === 0) return

    const canvas = canvasRef.current
    if (!canvas || !contextRef.current) return

    // Pop the last action
    const newActions = [...actions]
    const lastAction = newActions.pop()

    if (lastAction) {
      setRedoStack([...redoStack, lastAction])
      setActions(newActions)

      // If there are no more actions, clear the canvas
      if (newActions.length === 0) {
        contextRef.current.fillStyle = "white"
        contextRef.current.fillRect(0, 0, canvas.width, canvas.height)
      } else {
        // Otherwise, apply the last action
        const lastActionData = newActions[newActions.length - 1].data
        contextRef.current.putImageData(lastActionData, 0, 0)
      }
    }
  }

  const handleRedo = () => {
    if (redoStack.length === 0) return

    const canvas = canvasRef.current
    if (!canvas || !contextRef.current) return

    // Pop the last redo action
    const newRedoStack = [...redoStack]
    const redoAction = newRedoStack.pop()

    if (redoAction) {
      setActions([...actions, redoAction])
      setRedoStack(newRedoStack)

      // Apply the redo action
      contextRef.current.putImageData(redoAction.data, 0, 0)
    }
  }

  const handleClear = () => {
    const canvas = canvasRef.current
    if (!canvas || !contextRef.current) return

    // Save current state for undo
    const imageData = contextRef.current.getImageData(0, 0, canvas.width, canvas.height)
    setActions([...actions, { type: "clear", data: imageData }])
    setRedoStack([])

    // Clear canvas
    contextRef.current.fillStyle = "white"
    contextRef.current.fillRect(0, 0, canvas.width, canvas.height)

    toast({
      title: "Canvas cleared",
      description: "All drawings have been cleared",
    })
  }

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Create a temporary link
    const link = document.createElement("a")
    link.download = `whiteboard-${Date.now()}.png`
    link.href = canvas.toDataURL("image/png")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Image downloaded",
      description: "Your whiteboard has been saved as an image",
    })
  }

  const colorOptions = [
    "#000000",
    "#ffffff",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#00ffff",
    "#ff00ff",
    "#ff9900",
    "#9900ff",
  ]

  return (
    <div className={cn("border rounded-lg overflow-hidden bg-card", className)}>
      <div className="p-2 border-b flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button
            variant={tool === "pencil" ? "default" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setTool("pencil")}
            title="Pencil"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === "eraser" ? "default" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setTool("eraser")}
            title="Eraser"
          >
            <Eraser className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === "rectangle" ? "default" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setTool("rectangle")}
            title="Rectangle"
          >
            <Square className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === "circle" ? "default" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setTool("circle")}
            title="Circle"
          >
            <Circle className="h-4 w-4" />
          </Button>
          <Button
            variant={tool === "text" ? "default" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setTool("text")}
            title="Text"
          >
            <Type className="h-4 w-4" />
          </Button>

          <div className="h-6 border-l mx-1"></div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 relative" title="Color">
                <div className="absolute inset-[25%] rounded-full border" style={{ backgroundColor: color }}></div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <div className="grid grid-cols-5 gap-1">
                {colorOptions.map((c) => (
                  <button
                    key={c}
                    className={cn("h-6 w-6 rounded-full border", color === c && "ring-2 ring-primary ring-offset-2")}
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="text-xs" title="Brush Size">
                {brushSize}px
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <div className="w-40 px-1">
                <Slider
                  value={[brushSize]}
                  min={1}
                  max={20}
                  step={1}
                  onValueChange={(value) => setBrushSize(value[0])}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleUndo}
            disabled={actions.length === 0}
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleRedo}
            disabled={redoStack.length === 0}
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleClear} title="Clear">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDownload} title="Download">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative bg-white">
        <canvas
          ref={canvasRef}
          className="w-full h-[400px] touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
    </div>
  )
}
