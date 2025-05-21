"use client"

import { useState, useRef, useEffect } from "react"
import { Mic, Square, Send, Trash2, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface VoiceMessageRecorderProps {
  onSend: (audioBlob: Blob) => void
  className?: string
}

export function VoiceMessageRecorder({ onSend, className }: VoiceMessageRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPlayTime, setCurrentPlayTime] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioUrlRef = useRef<string | null>(null)

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.addEventListener("ended", () => {
      setIsPlaying(false)
      setCurrentPlayTime(0)
    })
    audioRef.current.addEventListener("timeupdate", () => {
      if (audioRef.current) {
        setCurrentPlayTime(audioRef.current.currentTime)
      }
    })

    return () => {
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current)
      }
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        setAudioBlob(audioBlob)

        // Create URL for the audio blob
        if (audioUrlRef.current) {
          URL.revokeObjectURL(audioUrlRef.current)
        }
        audioUrlRef.current = URL.createObjectURL(audioBlob)

        if (audioRef.current) {
          audioRef.current.src = audioUrlRef.current
          audioRef.current.addEventListener("loadedmetadata", () => {
            if (audioRef.current) {
              setAudioDuration(audioRef.current.duration)
            }
          })
        }

        // Stop all tracks from the stream
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      setRecordingTime(0)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }

      // Clear audio data
      setAudioBlob(null)
      audioChunksRef.current = []
    } else if (audioBlob) {
      // Clear existing recording
      setAudioBlob(null)
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current)
        audioUrlRef.current = null
      }
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
  }

  const togglePlayback = () => {
    if (!audioRef.current || !audioUrlRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleSend = () => {
    if (audioBlob) {
      onSend(audioBlob)
      setAudioBlob(null)
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current)
        audioUrlRef.current = null
      }
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className={cn("flex items-center gap-2 p-2 rounded-lg bg-muted/50", className)}>
      {!isRecording && !audioBlob ? (
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full text-primary hover:text-primary hover:bg-primary/10"
          onClick={startRecording}
        >
          <Mic className="h-5 w-5" />
          <span className="sr-only">Record voice message</span>
        </Button>
      ) : isRecording ? (
        <div className="flex items-center gap-2 w-full">
          <div className="flex-1 flex items-center gap-2">
            <Button variant="destructive" size="icon" className="h-10 w-10 rounded-full" onClick={stopRecording}>
              <Square className="h-5 w-5" />
              <span className="sr-only">Stop recording</span>
            </Button>
            <div className="flex-1 flex items-center gap-2">
              <div className="animate-pulse text-destructive">●</div>
              <span className="text-sm font-medium">{formatTime(recordingTime)}</span>
              <div className="flex-1 h-1 bg-muted-foreground/20 rounded-full">
                <div
                  className="h-full bg-destructive rounded-full animate-pulse"
                  style={{ width: `${Math.min(100, recordingTime * 2)}%` }}
                />
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={cancelRecording}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Cancel recording</span>
          </Button>
        </div>
      ) : audioBlob ? (
        <div className="flex items-center gap-2 w-full">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-primary" onClick={togglePlayback}>
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            <span className="sr-only">{isPlaying ? "Pause" : "Play"} voice message</span>
          </Button>
          <div className="flex-1 flex items-center gap-2">
            <span className="text-xs font-medium min-w-[40px]">{formatTime(currentPlayTime)}</span>
            <Slider
              value={[currentPlayTime]}
              max={audioDuration}
              step={0.1}
              className="flex-1"
              onValueChange={(value) => {
                if (audioRef.current) {
                  audioRef.current.currentTime = value[0]
                  setCurrentPlayTime(value[0])
                }
              }}
            />
            <span className="text-xs font-medium min-w-[40px]">{formatTime(audioDuration)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={cancelRecording}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete recording</span>
            </Button>
            <Button variant="primary" size="icon" className="h-8 w-8 rounded-full" onClick={handleSend}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send voice message</span>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
