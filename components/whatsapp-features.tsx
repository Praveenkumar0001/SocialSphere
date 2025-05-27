"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Clock,
  Users,
  Send,
  AirplayIcon as Broadcast,
  Building,
  BarChart3,
  MessageSquare,
  Heart,
  ThumbsUp,
  Laugh,
  Angry,
  FrownIcon as Sad,
} from "lucide-react"

// WhatsApp Disappearing Messages
export function DisappearingMessages() {
  const [disappearTime, setDisappearTime] = useState<number>(0) // 0 = off, 1 = 24h, 7 = 7days, 90 = 90days
  const [messages, setMessages] = useState<
    Array<{
      id: string
      content: string
      timestamp: Date
      expiresAt?: Date
      isExpired: boolean
    }>
  >([])

  const sendDisappearingMessage = (content: string) => {
    const now = new Date()
    const expiresAt = disappearTime > 0 ? new Date(now.getTime() + disappearTime * 24 * 60 * 60 * 1000) : undefined

    const newMessage = {
      id: Date.now().toString(),
      content,
      timestamp: now,
      expiresAt,
      isExpired: false,
    }

    setMessages((prev) => [...prev, newMessage])
  }

  // Check for expired messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prev) =>
        prev.map((msg) => ({
          ...msg,
          isExpired: msg.expiresAt ? new Date() > msg.expiresAt : false,
        })),
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Disappearing Messages
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Auto-delete after:</label>
            <div className="flex gap-2 mt-2">
              {[
                { value: 0, label: "Off" },
                { value: 1, label: "24 hours" },
                { value: 7, label: "7 days" },
                { value: 90, label: "90 days" },
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={disappearTime === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDisappearTime(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="border rounded-lg p-3 h-48 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className={`mb-2 p-2 rounded ${message.isExpired ? "opacity-30" : ""}`}>
                <p className="text-sm">{message.isExpired ? "This message has expired" : message.content}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString()}</span>
                  {message.expiresAt && !message.isExpired && (
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      Expires {message.expiresAt.toLocaleString()}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Type a disappearing message..."
              onKeyPress={(e) => {
                if (e.key === "Enter" && e.currentTarget.value.trim()) {
                  sendDisappearingMessage(e.currentTarget.value)
                  e.currentTarget.value = ""
                }
              }}
            />
            <Button size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// WhatsApp Communities
export function WhatsAppCommunities() {
  const [communities] = useState([
    {
      id: 1,
      name: "Tech Enthusiasts",
      description: "Discuss latest tech trends",
      members: 1250,
      groups: ["General", "AI/ML", "Web Dev", "Mobile Dev"],
    },
    {
      id: 2,
      name: "Local Neighborhood",
      description: "Stay connected with neighbors",
      members: 89,
      groups: ["Announcements", "Events", "Buy/Sell"],
    },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Communities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {communities.map((community) => (
            <div key={community.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{community.name}</h3>
                  <p className="text-sm text-muted-foreground">{community.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{community.members} members</p>
                </div>
                <Button size="sm">Join</Button>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Groups:</p>
                {community.groups.map((group) => (
                  <div key={group} className="flex items-center justify-between bg-muted rounded p-2">
                    <span className="text-sm">{group}</span>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <Button className="w-full">
            <Users className="h-4 w-4 mr-2" />
            Create Community
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// WhatsApp Business Features
export function WhatsAppBusiness() {
  const [businessProfile, setBusinessProfile] = useState({
    name: "My Business",
    category: "Retail",
    description: "Quality products at great prices",
    hours: "9 AM - 6 PM",
    website: "mybusiness.com",
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Business Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Business Name</label>
            <Input
              value={businessProfile.name}
              onChange={(e) => setBusinessProfile((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <Input
              value={businessProfile.category}
              onChange={(e) => setBusinessProfile((prev) => ({ ...prev, category: e.target.value }))}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={businessProfile.description}
              onChange={(e) => setBusinessProfile((prev) => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Business Hours</label>
              <Input
                value={businessProfile.hours}
                onChange={(e) => setBusinessProfile((prev) => ({ ...prev, hours: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Website</label>
              <Input
                value={businessProfile.website}
                onChange={(e) => setBusinessProfile((prev) => ({ ...prev, website: e.target.value }))}
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Business Tools</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button variant="outline" size="sm">
                <Broadcast className="h-4 w-4 mr-2" />
                Broadcast
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Auto-Reply
              </Button>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Labels
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Message Reactions
export function MessageReactions() {
  const [reactions] = useState([
    { emoji: "❤️", icon: Heart, count: 5 },
    { emoji: "👍", icon: ThumbsUp, count: 3 },
    { emoji: "😂", icon: Laugh, count: 2 },
    { emoji: "😢", icon: Sad, count: 1 },
    { emoji: "😡", icon: Angry, count: 0 },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Message Reactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-3">
            <p className="text-sm mb-2">Hey everyone! How's your day going?</p>
            <div className="flex gap-1">
              {reactions
                .filter((r) => r.count > 0)
                .map((reaction) => (
                  <Badge key={reaction.emoji} variant="secondary" className="text-xs">
                    {reaction.emoji} {reaction.count}
                  </Badge>
                ))}
            </div>
          </div>

          <div className="flex gap-2">
            {reactions.map((reaction) => (
              <Button key={reaction.emoji} variant="outline" size="sm" className="text-lg">
                {reaction.emoji}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
