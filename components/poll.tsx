"use client"

import { useState } from "react"
import { Check, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import type { Poll as PollType } from "@/lib/types"

interface PollProps {
  poll: PollType
  currentUserId: string
  onVote: (pollId: string, optionId: string) => void
}

export function Poll({ poll, currentUserId, onVote }: PollProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(() => {
    // Initialize with options the user has already voted for
    return poll.options.filter((option) => option.votes.includes(currentUserId)).map((option) => option.id)
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes.length, 0)
  const hasVoted = poll.options.some((option) => option.votes.includes(currentUserId))
  const isExpired = new Date(poll.expiresAt) < new Date()

  // Calculate time remaining
  const getTimeRemaining = () => {
    const now = new Date()
    const expiresAt = new Date(poll.expiresAt)
    const diffMs = expiresAt.getTime() - now.getTime()

    if (diffMs <= 0) return "Expired"

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (diffDays > 0) {
      return `${diffDays}d ${diffHours}h remaining`
    } else {
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
      return `${diffHours}h ${diffMinutes}m remaining`
    }
  }

  const handleOptionSelect = (optionId: string) => {
    if (hasVoted || isExpired) return

    if (poll.isMultipleChoice) {
      setSelectedOptions((prev) => {
        if (prev.includes(optionId)) {
          return prev.filter((id) => id !== optionId)
        } else {
          return [...prev, optionId]
        }
      })
    } else {
      setSelectedOptions([optionId])
    }
  }

  const handleSubmitVote = () => {
    if (selectedOptions.length === 0) {
      toast({
        variant: "destructive",
        title: "No option selected",
        description: "Please select at least one option to vote.",
      })
      return
    }

    setIsSubmitting(true)

    // For multiple choice polls, submit each option
    if (poll.isMultipleChoice) {
      selectedOptions.forEach((optionId) => {
        onVote(poll.id, optionId)
      })
    } else {
      // For single choice, just submit the one option
      onVote(poll.id, selectedOptions[0])
    }

    toast({
      title: "Vote submitted",
      description: "Your vote has been recorded.",
    })

    setIsSubmitting(false)
  }

  return (
    <div className="bg-muted/50 rounded-lg p-4 my-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">{poll.question}</h3>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span>{getTimeRemaining()}</span>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        {poll.options.map((option) => {
          const percentage = totalVotes > 0 ? Math.round((option.votes.length / totalVotes) * 100) : 0
          const isSelected = selectedOptions.includes(option.id)
          const hasUserVoted = option.votes.includes(currentUserId)

          return (
            <div
              key={option.id}
              className={cn(
                "relative p-3 rounded-md cursor-pointer transition-colors",
                hasVoted || isExpired
                  ? "bg-muted"
                  : isSelected
                    ? "bg-primary/10 border border-primary"
                    : "bg-muted hover:bg-muted/80 border border-transparent",
                (hasVoted || isExpired) && "cursor-default",
              )}
              onClick={() => handleOptionSelect(option.id)}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={cn(isSelected && "font-medium")}>{option.text}</span>
                {(hasVoted || isExpired) && <span className="font-medium">{percentage}%</span>}
              </div>

              {(hasVoted || isExpired) && (
                <>
                  <Progress value={percentage} className="h-2" />
                  <div className="text-xs mt-1 text-muted-foreground">
                    {option.votes.length} {option.votes.length === 1 ? "vote" : "votes"}
                  </div>
                </>
              )}

              {hasUserVoted && (
                <div className="absolute right-2 top-2 text-primary">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {!hasVoted && !isExpired && (
        <Button onClick={handleSubmitVote} disabled={selectedOptions.length === 0 || isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Vote"}
        </Button>
      )}

      <div className="text-xs text-muted-foreground mt-2">
        {totalVotes} {totalVotes === 1 ? "vote" : "votes"} •
        {poll.isMultipleChoice ? " Multiple choice" : " Single choice"}
      </div>
    </div>
  )
}
