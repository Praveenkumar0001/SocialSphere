"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Calendar,
  MapPin,
  Clock,
  Star,
  Heart,
  Share,
  UserPlus,
  Settings,
  Globe,
  Lock,
  Eye,
  Gamepad2,
  Play,
  Flag,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Facebook Groups
export function FacebookGroups() {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Local Photography Club",
      members: 1250,
      privacy: "public",
      description: "Share and discuss photography techniques",
      posts: 45,
      isJoined: true,
      isAdmin: false,
    },
    {
      id: 2,
      name: "Startup Entrepreneurs",
      members: 8900,
      privacy: "private",
      description: "Network and share startup experiences",
      posts: 123,
      isJoined: false,
      isAdmin: false,
    },
    {
      id: 3,
      name: "Family Recipes",
      members: 567,
      privacy: "private",
      description: "Share family recipes and cooking tips",
      posts: 89,
      isJoined: true,
      isAdmin: true,
    },
  ])

  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    privacy: "public",
  })

  const { toast } = useToast()

  const joinGroup = (groupId: number) => {
    setGroups((prev) =>
      prev.map((group) => (group.id === groupId ? { ...group, isJoined: true, members: group.members + 1 } : group)),
    )
    toast({
      title: "Joined group!",
      description: "You're now a member of this group",
    })
  }

  const createGroup = () => {
    if (newGroup.name.trim()) {
      const group = {
        id: Date.now(),
        name: newGroup.name,
        description: newGroup.description,
        privacy: newGroup.privacy,
        members: 1,
        posts: 0,
        isJoined: true,
        isAdmin: true,
      }
      setGroups((prev) => [...prev, group])
      setNewGroup({ name: "", description: "", privacy: "public" })
      toast({
        title: "Group created!",
        description: "Your new group is ready",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Groups
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Create Group */}
          <div className="border rounded-lg p-3">
            <h4 className="font-medium mb-2">Create New Group</h4>
            <div className="space-y-2">
              <Input
                placeholder="Group name"
                value={newGroup.name}
                onChange={(e) => setNewGroup((prev) => ({ ...prev, name: e.target.value }))}
              />
              <Textarea
                placeholder="Group description"
                value={newGroup.description}
                onChange={(e) => setNewGroup((prev) => ({ ...prev, description: e.target.value }))}
              />
              <div className="flex gap-2">
                <Button
                  variant={newGroup.privacy === "public" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewGroup((prev) => ({ ...prev, privacy: "public" }))}
                >
                  <Globe className="h-4 w-4 mr-1" />
                  Public
                </Button>
                <Button
                  variant={newGroup.privacy === "private" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewGroup((prev) => ({ ...prev, privacy: "private" }))}
                >
                  <Lock className="h-4 w-4 mr-1" />
                  Private
                </Button>
              </div>
              <Button onClick={createGroup} className="w-full">
                Create Group
              </Button>
            </div>
          </div>

          {/* Groups List */}
          <div className="space-y-3">
            {groups.map((group) => (
              <div key={group.id} className="border rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{group.name}</h4>
                      {group.privacy === "private" ? (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Globe className="h-4 w-4 text-muted-foreground" />
                      )}
                      {group.isAdmin && <Badge variant="secondary">Admin</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{group.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {group.members.toLocaleString()} members • {group.posts} posts today
                    </p>
                  </div>

                  {!group.isJoined ? (
                    <Button size="sm" onClick={() => joinGroup(group.id)}>
                      <UserPlus className="h-4 w-4 mr-1" />
                      Join
                    </Button>
                  ) : (
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {group.isAdmin && (
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Facebook Events
export function FacebookEvents() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tech Meetup 2024",
      date: "2024-02-15",
      time: "18:00",
      location: "Downtown Convention Center",
      attendees: 156,
      isGoing: false,
      isInterested: true,
      organizer: "Tech Community",
    },
    {
      id: 2,
      title: "Photography Workshop",
      date: "2024-02-20",
      time: "14:00",
      location: "City Park",
      attendees: 45,
      isGoing: true,
      isInterested: false,
      organizer: "Photo Club",
    },
  ])

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  })

  const { toast } = useToast()

  const toggleGoing = (eventId: number) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? {
              ...event,
              isGoing: !event.isGoing,
              attendees: event.isGoing ? event.attendees - 1 : event.attendees + 1,
              isInterested: false,
            }
          : event,
      ),
    )
  }

  const toggleInterested = (eventId: number) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? {
              ...event,
              isInterested: !event.isInterested,
              isGoing: false,
            }
          : event,
      ),
    )
  }

  const createEvent = () => {
    if (newEvent.title.trim() && newEvent.date && newEvent.time) {
      const event = {
        id: Date.now(),
        title: newEvent.title,
        date: newEvent.date,
        time: newEvent.time,
        location: newEvent.location,
        attendees: 1,
        isGoing: true,
        isInterested: false,
        organizer: "You",
      }
      setEvents((prev) => [...prev, event])
      setNewEvent({ title: "", date: "", time: "", location: "", description: "" })
      toast({
        title: "Event created!",
        description: "Your event has been published",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Create Event */}
          <div className="border rounded-lg p-3">
            <h4 className="font-medium mb-2">Create Event</h4>
            <div className="space-y-2">
              <Input
                placeholder="Event title"
                value={newEvent.title}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent((prev) => ({ ...prev, date: e.target.value }))}
                />
                <Input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent((prev) => ({ ...prev, time: e.target.value }))}
                />
              </div>
              <Input
                placeholder="Location"
                value={newEvent.location}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, location: e.target.value }))}
              />
              <Button onClick={createEvent} className="w-full">
                Create Event
              </Button>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="border rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium">{event.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {event.time}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {event.attendees} going • Organized by {event.organizer}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={event.isGoing ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleGoing(event.id)}
                  >
                    {event.isGoing ? "Going" : "Going?"}
                  </Button>
                  <Button
                    variant={event.isInterested ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleInterested(event.id)}
                  >
                    <Star className={`h-4 w-4 mr-1 ${event.isInterested ? "fill-current" : ""}`} />
                    Interested
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4" />
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

// Facebook Pages
export function FacebookPages() {
  const [pages] = useState([
    {
      id: 1,
      name: "Local Coffee Shop",
      category: "Restaurant",
      likes: 2340,
      followers: 2156,
      isLiked: true,
      isFollowing: true,
    },
    {
      id: 2,
      name: "Tech News Daily",
      category: "Media",
      likes: 45600,
      followers: 43200,
      isLiked: false,
      isFollowing: false,
    },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flag className="h-5 w-5" />
          Pages
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {pages.map((page) => (
            <div key={page.id} className="border rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>{page.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{page.name}</h4>
                    <p className="text-sm text-muted-foreground">{page.category}</p>
                    <p className="text-xs text-muted-foreground">
                      {page.likes.toLocaleString()} likes • {page.followers.toLocaleString()} followers
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant={page.isLiked ? "default" : "outline"} size="sm">
                    <Heart className={`h-4 w-4 mr-1 ${page.isLiked ? "fill-current" : ""}`} />
                    Like
                  </Button>
                  <Button variant={page.isFollowing ? "default" : "outline"} size="sm">
                    Follow
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full">
            <Flag className="h-4 w-4 mr-2" />
            Create Page
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Facebook Gaming
export function FacebookGaming() {
  const [games] = useState([
    { id: 1, name: "Word Puzzle", players: "2.3M", category: "Puzzle" },
    { id: 2, name: "City Builder", players: "1.8M", category: "Strategy" },
    { id: 3, name: "Racing Game", players: "3.1M", category: "Racing" },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gamepad2 className="h-5 w-5" />
          Gaming
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {games.map((game) => (
            <div key={game.id} className="border rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Gamepad2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{game.name}</h4>
                    <p className="text-sm text-muted-foreground">{game.category}</p>
                    <p className="text-xs text-muted-foreground">{game.players} players</p>
                  </div>
                </div>
                <Button size="sm">
                  <Play className="h-4 w-4 mr-1" />
                  Play
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
