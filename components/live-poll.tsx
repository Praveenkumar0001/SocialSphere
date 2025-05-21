"use client"

import { useState, useEffect } from "react"
import { BarChart, RefreshCw, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AvatarGroup } from "@/components/ui/avatar-group"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface LivePollOption {
  id: string
  text: string
  votes: number
  voters: {
    id: string
    name: string
    avatar?: string
  }[]
}

interface LivePollProps {
  id: string
  question: string
  options: LivePollOption[]
  totalVotes: number
  expiresAt: string
  currentUserId: string
  onVote?: (pollId: string, optionId: string) => void
  className?: string
}

export function LivePoll({
  id,
  question,
  options,
  totalVotes,
  expiresAt,
  currentUserId,
  onVote,
  className,
}: LivePollProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [isExpired, setIsExpired] = useState(false)
  const [timeLeft, setTimeLeft] = useState<string>("")
  const [showVoters, setShowVoters] = useState<string | null>(null)
  const { toast } = useToast()

  // Check if user has already voted
  useEffect(() => {
    const hasVoted = options.some((option) => option.voters.some((voter) => voter.id === currentUserId))

    if (hasVoted) {
      setShowResults(true)

      // Find which option the user voted for
      const votedOption = options.find((option) => option.voters.some((voter) => voter.id === currentUserId))

      if (votedOption) {
        setSelectedOption(votedOption.id)
      }
    }
  }, [options, currentUserId])

  // Calculate time left
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const expiry = new Date(expiresAt)
      const diff = expiry.getTime() - now.getTime()

      if (diff <= 0) {
        setIsExpired(true)
        setTimeLeft("Expired")
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m left`)
      } else if (minutes > 0) {
        setTimeLeft(`${minutes}m left`)
      } else {
        setTimeLeft("Less than a minute left")
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [expiresAt])

  const handleVote = (optionId: string) => {
    if (isExpired) {
      toast({
        title: "Poll has ended",
        description: "This poll is no longer accepting votes",
        variant: "destructive",
      })
      return
    }

    if (selectedOption) {
      toast({
        title: "Already voted",
        description: "You have already cast your vote in this poll",
      })
      return
    }

    setSelectedOption(optionId)
    setShowResults(true)

    if (onVote) {
      onVote(id, optionId)
    }

    toast({
      title: "Vote recorded",
      description: "Your vote has been successfully recorded",
    })
  }

  const getPercentage = (votes: number) => {
    if (totalVotes === 0) return 0
    return Math.round((votes / totalVotes) * 100)
  }

  const toggleVoters = (optionId: string) => {
    if (showVoters === optionId) {
      setShowVoters(null)
    } else {
      setShowVoters(optionId)
    }
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Live Poll</CardTitle>
          </div>
          <Badge variant={isExpired ? "outline" : "secondary"}>{isExpired ? "Ended" : timeLeft}</Badge>
        </div>
        <CardDescription className="mt-2 text-base font-medium">{question}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-3">
          {options.map((option) => {
            const percentage = getPercentage(option.votes)
            const isSelected = selectedOption === option.id

            return (
              <div key={option.id} className="space-y-1">
                <div
                  className={cn(
                    "relative overflow-hidden rounded-md border p-3 transition-colors",
                    showResults
                      ? isSelected
                        ? "bg-primary/10 border-primary"
                        : "bg-muted"
                      : "hover:bg-muted cursor-pointer",
                    isExpired && "opacity-80",
                  )}
                  onClick={() => !showResults && handleVote(option.id)}
                >
                  <div className="relative z-10 flex justify-between items-center">
                    <span className="font-medium">{option.text}</span>
                    {showResults && <span className="font-semibold">{percentage}%</span>}
                  </div>

                  {showResults && (
                    <>
                      <Progress
                        value={percentage}
                        className="h-full absolute left-0 top-0 bg-transparent rounded-none"
                        indicatorClassName={cn(
                          "bg-primary/20 transition-all duration-500",
                          isSelected && "bg-primary/30",
                        )}
                      />
                      {option.voters.length > 0 && (
                        <div className="mt-2 relative z-10 flex justify-between items-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs flex items-center gap-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleVoters(option.id)
                            }}
                          >
                            <Users className="h-3 w-3" />
                            {option.voters.length} {option.voters.length === 1 ? "vote" : "votes"}
                          </Button>
                          {isSelected && (
                            <Badge variant="outline" className="text-xs h-5">
                              Your vote
                            </Badge>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Voters list */}
                {showVoters === option.id && option.voters.length > 0 && (
                  <div className="pl-3 pr-2 py-2 bg-muted rounded-md mt-1 text-sm">
                    <div className="font-medium mb-1 text-xs text-muted-foreground">Voters:</div>
                    <div className="max-h-24 overflow-y-auto space-y-2">
                      {option.voters.map((voter) => (
                        <div key={voter.id} className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={voter.avatar || "/placeholder.svg"} alt={voter.name} />
                            <AvatarFallback>{voter.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{voter.name}</span>
                          {voter.id === currentUserId && (
                            <Badge variant="outline" className="ml-auto text-[10px] h-4">
                              You
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-0">
        <div className="flex items-center gap-1">
          <AvatarGroup>
            {options
              .flatMap((option) => option.voters)
              .filter((voter, index, self) => index === self.findIndex((v) => v.id === voter.id))
              .slice(0, 3)
              .map((voter) => (
                <Avatar key={voter.id} className="h-6 w-6 border-2 border-background">
                  <AvatarImage src={voter.avatar || "/placeholder.svg"} alt={voter.name} />
                  <AvatarFallback>{voter.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
          </AvatarGroup>
          <span className="text-xs text-muted-foreground">
            {totalVotes} {totalVotes === 1 ? "vote" : "votes"}
          </span>
        </div>
        {showResults && !isExpired && !selectedOption && (
          <Button variant="outline" size="sm" className="text-xs" onClick={() => setShowResults(false)}>
            <RefreshCw className="h-3 w-3 mr-1" />
            Vote instead
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
