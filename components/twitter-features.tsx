"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Mic,
  MicOff,
  Users,
  Crown,
  Hand,
  Settings,
  UserPlus,
  List,
  Zap,
  CheckCircle,
  Edit,
  BarChart3,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Twitter Spaces (Audio Rooms)
export function TwitterSpaces() {
  const [isHosting, setIsHosting] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isListening, setIsListening] = useState(false)
  const [participants] = useState([
    { id: 1, name: "John Doe", role: "host", isSpeaking: true },
    { id: 2, name: "Jane Smith", role: "speaker", isSpeaking: false },
    { id: 3, name: "Mike Johnson", role: "listener", isSpeaking: false },
    { id: 4, name: "Sarah Wilson", role: "listener", isSpeaking: false },
  ])
  const { toast } = useToast()

  const startSpace = () => {
    setIsHosting(true)
    toast({
      title: "🎙️ Space started!",
      description: "You're now hosting a live audio conversation",
    })
  }

  const endSpace = () => {
    setIsHosting(false)
    setIsListening(false)
    toast({
      title: "Space ended",
      description: "Thanks for hosting!",
    })
  }

  const joinSpace = () => {
    setIsListening(true)
    toast({
      title: "Joined Space",
      description: "You're now listening to the conversation",
    })
  }

  const requestToSpeak = () => {
    toast({
      title: "Request sent",
      description: "The host will review your request to speak",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5 text-purple-500" />
          Twitter Spaces
          {(isHosting || isListening) && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              LIVE
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isHosting && !isListening ? (
          <div className="space-y-4">
            <div className="text-center">
              <Mic className="h-12 w-12 mx-auto text-purple-500 mb-4" />
              <h3 className="font-semibold mb-2">Start or Join a Space</h3>
              <p className="text-sm text-muted-foreground mb-4">Have live audio conversations with your followers</p>
            </div>

            <div className="space-y-2">
              <Button onClick={startSpace} className="w-full bg-purple-600 hover:bg-purple-700">
                <Mic className="h-4 w-4 mr-2" />
                Start a Space
              </Button>
              <Button onClick={joinSpace} variant="outline" className="w-full">
                <Users className="h-4 w-4 mr-2" />
                Join Space: "Tech Talk Tuesday"
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-semibold">{isHosting ? "Your Space: Tech Discussion" : "Tech Talk Tuesday"}</h3>
              <p className="text-sm text-muted-foreground">{participants.length} participants</p>
            </div>

            {/* Participants */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Participants</h4>
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{participant.name}</span>
                    {participant.role === "host" && <Crown className="h-3 w-3 text-yellow-500" />}
                    {participant.isSpeaking && <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />}
                  </div>
                  {participant.role === "listener" && isHosting && (
                    <Button size="sm" variant="ghost">
                      <UserPlus className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-2">
              {isHosting && (
                <>
                  <Button variant={isMuted ? "outline" : "default"} size="icon" onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" onClick={endSpace}>
                    End Space
                  </Button>
                </>
              )}

              {isListening && !isHosting && (
                <>
                  <Button variant="outline" onClick={requestToSpeak}>
                    <Hand className="h-4 w-4 mr-2" />
                    Request to speak
                  </Button>
                  <Button variant="outline" onClick={() => setIsListening(false)}>
                    Leave
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Twitter Lists
export function TwitterLists() {
  const [lists, setLists] = useState([
    { id: 1, name: "Tech Leaders", members: 45, isPrivate: false },
    { id: 2, name: "Close Friends", members: 12, isPrivate: true },
    { id: 3, name: "News Sources", members: 28, isPrivate: false },
  ])
  const [newListName, setNewListName] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)

  const createList = () => {
    if (newListName.trim()) {
      setLists((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: newListName,
          members: 0,
          isPrivate,
        },
      ])
      setNewListName("")
      setIsPrivate(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <List className="h-5 w-5" />
          Lists
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Create new list */}
          <div className="border rounded-lg p-3">
            <h4 className="font-medium mb-2">Create New List</h4>
            <div className="space-y-2">
              <Input placeholder="List name" value={newListName} onChange={(e) => setNewListName(e.target.value)} />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="private"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                />
                <label htmlFor="private" className="text-sm">
                  Make private
                </label>
              </div>
              <Button onClick={createList} size="sm" className="w-full">
                Create List
              </Button>
            </div>
          </div>

          {/* Existing lists */}
          <div className="space-y-2">
            {lists.map((list) => (
              <div key={list.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{list.name}</h4>
                    {list.isPrivate && <Badge variant="secondary">Private</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{list.members} members</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Users className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Twitter Blue Features
export function TwitterBlue() {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const features = [
    { name: "Edit Tweets", description: "Edit your tweets for up to 30 minutes", icon: Edit },
    { name: "Longer Tweets", description: "Tweet up to 25,000 characters", icon: Zap },
    { name: "Blue Checkmark", description: "Get verified with a blue checkmark", icon: CheckCircle },
    { name: "Priority Support", description: "Get faster customer support", icon: Crown },
    { name: "Advanced Analytics", description: "Detailed insights about your tweets", icon: BarChart3 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-blue-500" />
          Twitter Blue
          {isSubscribed && <Badge className="bg-blue-500">Subscribed</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Upgrade your Twitter experience</h3>
            <p className="text-2xl font-bold mb-1">
              $8<span className="text-sm font-normal">/month</span>
            </p>
            <p className="text-sm text-muted-foreground">Cancel anytime</p>
          </div>

          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <feature.icon className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">{feature.name}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={() => setIsSubscribed(!isSubscribed)}>
            {isSubscribed ? "Manage Subscription" : "Subscribe to Twitter Blue"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Twitter Communities
export function TwitterCommunities() {
  const [communities] = useState([
    { id: 1, name: "Web Developers", members: "125K", category: "Technology" },
    { id: 2, name: "Startup Founders", members: "89K", category: "Business" },
    { id: 3, name: "Digital Artists", members: "67K", category: "Art & Design" },
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
            <div key={community.id} className="border rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{community.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {community.members} members • {community.category}
                  </p>
                </div>
                <Button size="sm">Join</Button>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full">
            <Users className="h-4 w-4 mr-2" />
            Discover More Communities
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
