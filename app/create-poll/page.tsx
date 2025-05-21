"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { getCurrentUser } from "@/lib/data"
import { useToast } from "@/components/ui/use-toast"
import type { PollOption } from "@/lib/types"

export default function CreatePollPage() {
  const router = useRouter()
  const currentUser = getCurrentUser()
  const { toast } = useToast()

  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState<Omit<PollOption, "id">[]>([
    { text: "", votes: [] },
    { text: "", votes: [] },
  ])
  const [isMultipleChoice, setIsMultipleChoice] = useState(false)
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(
    new Date(Date.now() + 24 * 60 * 60 * 1000), // Default to 24 hours from now
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddOption = () => {
    if (options.length >= 10) {
      toast({
        variant: "destructive",
        title: "Maximum options reached",
        description: "You can add up to 10 options for a poll.",
      })
      return
    }

    setOptions([...options, { text: "", votes: [] }])
  }

  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) {
      toast({
        variant: "destructive",
        title: "Minimum options required",
        description: "A poll must have at least 2 options.",
      })
      return
    }

    const newOptions = [...options]
    newOptions.splice(index, 1)
    setOptions(newOptions)
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index].text = value
    setOptions(newOptions)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!question.trim()) {
      toast({
        variant: "destructive",
        title: "Question required",
        description: "Please enter a question for your poll.",
      })
      return
    }

    if (options.some((option) => !option.text.trim())) {
      toast({
        variant: "destructive",
        title: "Empty options",
        description: "Please fill in all poll options.",
      })
      return
    }

    if (!expiryDate) {
      toast({
        variant: "destructive",
        title: "Expiry date required",
        description: "Please select when the poll should expire.",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Poll created",
        description: "Your poll has been created successfully!",
      })
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="container max-w-2xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Create Poll</h1>

      <form onSubmit={handleSubmit}>
        <div className="border border-border rounded-lg p-4 mb-4">
          <div className="flex gap-3 mb-4">
            <Avatar>
              <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{currentUser.name}</div>
              <div className="text-sm text-muted-foreground">@{currentUser.username}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="question">Poll Question</Label>
              <Textarea
                id="question"
                placeholder="Ask a question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Poll Options</Label>
              <div className="space-y-2 mt-1">
                {options.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Option ${index + 1}`}
                      value={option.text}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveOption(index)}
                      disabled={options.length <= 2}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddOption}
                  disabled={options.length >= 10}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Option
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="multiple-choice">Allow multiple selections</Label>
                <p className="text-sm text-muted-foreground">Let users select more than one option</p>
              </div>
              <Switch id="multiple-choice" checked={isMultipleChoice} onCheckedChange={setIsMultipleChoice} />
            </div>

            <div>
              <Label htmlFor="expiry">Poll Duration</Label>
              <div className="flex gap-2 mt-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="expiry"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !expiryDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {expiryDate ? format(expiryDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={expiryDate}
                      onSelect={setExpiryDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating Poll..." : "Create Poll"}
          </Button>
        </div>
      </form>
    </div>
  )
}
