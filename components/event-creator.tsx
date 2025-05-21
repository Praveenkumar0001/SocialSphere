"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Clock, MapPin, ImageIcon, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface EventCreatorProps {
  onCreateEvent?: (eventData: any) => void
  className?: string
}

export function EventCreator({ onCreateEvent, className }: EventCreatorProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [eventType, setEventType] = useState("in-person")
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !startDate || !startTime) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields",
      })
      return
    }

    setIsSubmitting(true)

    // Create event data object
    const eventData = {
      title,
      description,
      location,
      startDate,
      startTime,
      endDate,
      endTime,
      isPublic,
      eventType,
      coverImage,
    }

    // Simulate API call
    setTimeout(() => {
      if (onCreateEvent) {
        onCreateEvent(eventData)
      }

      toast({
        title: "Event created",
        description: "Your event has been created successfully",
      })

      // Reset form
      setTitle("")
      setDescription("")
      setLocation("")
      setStartDate(undefined)
      setEndDate(undefined)
      setStartTime("")
      setEndTime("")
      setIsPublic(true)
      setEventType("in-person")
      setCoverImage(null)
      setIsSubmitting(false)
    }, 1500)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // In a real app, you would upload this to a server
    // For now, we'll just create a local URL
    const imageUrl = URL.createObjectURL(file)
    setCoverImage(imageUrl)
  }

  const removeCoverImage = () => {
    setCoverImage(null)
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Create Event</CardTitle>
        <CardDescription>Plan and share your event with friends and followers</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* Event title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Event Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Event description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="What's this event about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Event type */}
          <div className="space-y-2">
            <Label>Event Type</Label>
            <RadioGroup value={eventType} onValueChange={setEventType} className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in-person" id="in-person" />
                <Label htmlFor="in-person" className="cursor-pointer">
                  In-person
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="online" id="online" />
                <Label htmlFor="online" className="cursor-pointer">
                  Online
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hybrid" id="hybrid" />
                <Label htmlFor="hybrid" className="cursor-pointer">
                  Hybrid
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">{eventType === "online" ? "Meeting Link" : "Location"}</Label>
            <div className="flex">
              <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                id="location"
                placeholder={eventType === "online" ? "Enter meeting link" : "Enter location"}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="rounded-l-none"
              />
            </div>
          </div>

          {/* Date and time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Start date */}
            <div className="space-y-2">
              <Label>
                Start Date <span className="text-destructive">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            {/* Start time */}
            <div className="space-y-2">
              <Label htmlFor="startTime">
                Start Time <span className="text-destructive">*</span>
              </Label>
              <div className="flex">
                <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="rounded-l-none"
                  required
                />
              </div>
            </div>

            {/* End date */}
            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    disabled={(date) => (startDate ? date < startDate : false)}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* End time */}
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <div className="flex">
                <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="rounded-l-none"
                />
              </div>
            </div>
          </div>

          {/* Cover image */}
          <div className="space-y-2">
            <Label>Cover Image</Label>
            {coverImage ? (
              <div className="relative rounded-md overflow-hidden">
                <img src={coverImage || "/placeholder.svg"} alt="Event cover" className="w-full h-40 object-cover" />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full"
                  onClick={removeCoverImage}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Drag and drop an image or click to browse</p>
                <Button type="button" variant="secondary" size="sm" className="relative">
                  <Plus className="h-4 w-4 mr-1" />
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                  />
                </Button>
              </div>
            )}
          </div>

          {/* Privacy setting */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="public-event">Public Event</Label>
              <p className="text-sm text-muted-foreground">
                {isPublic ? "Anyone can see and join this event" : "Only people you invite can see this event"}
              </p>
            </div>
            <Switch id="public-event" checked={isPublic} onCheckedChange={setIsPublic} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Event"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
