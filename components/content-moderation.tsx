"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Shield, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ModerationResult {
  isSafe: boolean
  reason?: string
  categories?: Record<string, number>
  flagged?: boolean
}

interface ContentModerationProps {
  onModerationComplete?: (result: ModerationResult, content: string) => void
  placeholder?: string
  initialContent?: string
}

export function ContentModeration({
  onModerationComplete,
  placeholder = "Enter content to moderate...",
  initialContent = "",
}: ContentModerationProps) {
  const [content, setContent] = useState(initialContent)
  const [moderationResult, setModerationResult] = useState<ModerationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const moderateContent = async () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content to moderate",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      const response = await fetch("/api/moderation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      })

      const result = await response.json()
      setModerationResult(result)

      if (onModerationComplete) {
        onModerationComplete(result, content)
      }

      if (!result.isSafe) {
        toast({
          title: "Content Flagged",
          description: result.reason || "Content may violate community guidelines",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Content Approved",
          description: "Content passed moderation checks",
        })
      }
    } catch (error) {
      console.error("Moderation error:", error)
      toast({
        title: "Error",
        description: "Failed to moderate content. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getSafetyColor = (score: number) => {
    if (score > 0.8) return "text-red-500"
    if (score > 0.5) return "text-yellow-500"
    return "text-green-500"
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Content Moderation
        </CardTitle>
        <CardDescription>AI-powered content safety checking using OpenAI's Moderation API</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder={placeholder}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <Button onClick={moderateContent} disabled={isLoading || !content.trim()}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <Shield className="mr-2 h-4 w-4" />
                Check Content
              </>
            )}
          </Button>
        </div>

        {moderationResult && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {moderationResult.isSafe ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <Badge variant="default" className="bg-green-500">
                    Safe
                  </Badge>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <Badge variant="destructive">Flagged</Badge>
                </>
              )}
            </div>

            {moderationResult.reason && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{moderationResult.reason}</p>
              </div>
            )}

            {moderationResult.categories && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Category Scores:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(moderationResult.categories).map(([category, score]) => (
                    <div key={category} className="flex justify-between">
                      <span className="capitalize">{category.replace(/[/_]/g, " ")}</span>
                      <span className={getSafetyColor(score as number)}>{((score as number) * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
