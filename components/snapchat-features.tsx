"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Gamepad2, Eye, MessageCircle, Smile, Sparkles, Map, Play, Trophy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Snap Map
export function SnapMap() {
  const [friends] = useState([
    { id: 1, name: "Alice", location: "Coffee Shop", lat: 40.7128, lng: -74.006, lastSeen: "2 min ago" },
    { id: 2, name: "Bob", location: "Central Park", lat: 40.7829, lng: -73.9654, lastSeen: "15 min ago" },
    { id: 3, name: "Charlie", location: "Times Square", lat: 40.758, lng: -73.9855, lastSeen: "1 hour ago" },
  ])

  const [isLocationShared, setIsLocationShared] = useState(true)
  const [ghostMode, setGhostMode] = useState(false)
  const { toast } = useToast()

  const toggleLocationSharing = () => {
    setIsLocationShared(!isLocationShared)
    toast({
      title: isLocationShared ? "Location sharing disabled" : "Location sharing enabled",
      description: isLocationShared ? "Friends can't see your location" : "Friends can see your location",
    })
  }

  const toggleGhostMode = () => {
    setGhostMode(!ghostMode)
    toast({
      title: ghostMode ? "Ghost Mode disabled" : "Ghost Mode enabled",
      description: ghostMode ? "You're visible on the map" : "You're invisible on the map",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Map className="h-5 w-5" />
          Snap Map
          {ghostMode && <Badge variant="secondary">👻 Ghost Mode</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Map Controls */}
          <div className="flex gap-2">
            <Button variant={isLocationShared ? "default" : "outline"} size="sm" onClick={toggleLocationSharing}>
              <MapPin className="h-4 w-4 mr-1" />
              {isLocationShared ? "Sharing Location" : "Share Location"}
            </Button>
            <Button variant={ghostMode ? "default" : "outline"} size="sm" onClick={toggleGhostMode}>
              👻 Ghost Mode
            </Button>
          </div>

          {/* Mock Map */}
          <div className="h-48 bg-gradient-to-br from-blue-400 to-green-400 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <Map className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Interactive Map View</p>
              </div>
            </div>

            {/* Friend Locations */}
            {isLocationShared &&
              !ghostMode &&
              friends.map((friend) => (
                <div
                  key={friend.id}
                  className="absolute bg-white rounded-full p-1 shadow-lg cursor-pointer"
                  style={{
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 80 + 10}%`,
                  }}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
              ))}
          </div>

          {/* Friends List */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Friends on Map</h4>
            {friends.map((friend) => (
              <div key={friend.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{friend.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {friend.location} • {friend.lastSeen}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Bitmoji Integration
export function Bitmoji() {
  const [currentBitmoji, setCurrentBitmoji] = useState("😊")
  const [bitmojiOutfits] = useState([
    { id: 1, name: "Casual", emoji: "👕" },
    { id: 2, name: "Formal", emoji: "👔" },
    { id: 3, name: "Party", emoji: "🎉" },
    { id: 4, name: "Sports", emoji: "⚽" },
  ])

  const [bitmojiExpressions] = useState(["😊", "😎", "🤔", "😴", "🎉", "❤️", "😂", "🔥"])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smile className="h-5 w-5" />
          Bitmoji
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current Bitmoji */}
          <div className="text-center">
            <div className="h-24 w-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-2">
              {currentBitmoji}
            </div>
            <p className="text-sm text-muted-foreground">Your Bitmoji</p>
          </div>

          {/* Expressions */}
          <div>
            <h4 className="font-medium text-sm mb-2">Expressions</h4>
            <div className="grid grid-cols-4 gap-2">
              {bitmojiExpressions.map((expression) => (
                <Button
                  key={expression}
                  variant={currentBitmoji === expression ? "default" : "outline"}
                  className="text-2xl h-12"
                  onClick={() => setCurrentBitmoji(expression)}
                >
                  {expression}
                </Button>
              ))}
            </div>
          </div>

          {/* Outfits */}
          <div>
            <h4 className="font-medium text-sm mb-2">Outfits</h4>
            <div className="grid grid-cols-2 gap-2">
              {bitmojiOutfits.map((outfit) => (
                <Button key={outfit.id} variant="outline" size="sm">
                  {outfit.emoji} {outfit.name}
                </Button>
              ))}
            </div>
          </div>

          <Button className="w-full">
            <Sparkles className="h-4 w-4 mr-2" />
            Customize Bitmoji
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Snap Games
export function SnapGames() {
  const [games] = useState([
    { id: 1, name: "Snake Squad", players: "2.1M", category: "Multiplayer", icon: "🐍" },
    { id: 2, name: "Bitmoji Paint", players: "1.5M", category: "Creative", icon: "🎨" },
    { id: 3, name: "Zombie Rescue", players: "3.2M", category: "Action", icon: "🧟" },
    { id: 4, name: "Word Hunt", players: "890K", category: "Puzzle", icon: "📝" },
  ])

  const [achievements] = useState([
    { id: 1, name: "First Win", description: "Win your first game", unlocked: true },
    { id: 2, name: "Streak Master", description: "Win 5 games in a row", unlocked: false },
    { id: 3, name: "Social Player", description: "Play with 10 friends", unlocked: true },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gamepad2 className="h-5 w-5" />
          Snap Games
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Featured Games */}
          <div>
            <h4 className="font-medium text-sm mb-2">Featured Games</h4>
            <div className="grid grid-cols-2 gap-3">
              {games.map((game) => (
                <div key={game.id} className="border rounded-lg p-3">
                  <div className="text-center mb-2">
                    <div className="text-2xl mb-1">{game.icon}</div>
                    <h5 className="font-medium text-sm">{game.name}</h5>
                    <p className="text-xs text-muted-foreground">{game.category}</p>
                    <p className="text-xs text-muted-foreground">{game.players} players</p>
                  </div>
                  <Button size="sm" className="w-full">
                    <Play className="h-3 w-3 mr-1" />
                    Play
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h4 className="font-medium text-sm mb-2">Achievements</h4>
            <div className="space-y-2">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      achievement.unlocked ? "bg-yellow-500" : "bg-gray-300"
                    }`}
                  >
                    <Trophy className={`h-4 w-4 ${achievement.unlocked ? "text-white" : "text-gray-500"}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{achievement.name}</p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Unlocked
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Button variant="outline" className="w-full">
            <Gamepad2 className="h-4 w-4 mr-2" />
            Browse All Games
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Snap Originals
export function SnapOriginals() {
  const [shows] = useState([
    {
      id: 1,
      title: "The Real You",
      description: "Reality show about authentic living",
      episodes: 12,
      duration: "5-10 min",
      thumbnail: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Tech Talk",
      description: "Latest in technology and innovation",
      episodes: 8,
      duration: "3-7 min",
      thumbnail: "/placeholder.svg",
    },
    {
      id: 3,
      title: "Quick Recipes",
      description: "Fast and easy cooking tutorials",
      episodes: 15,
      duration: "2-5 min",
      thumbnail: "/placeholder.svg",
    },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5" />
          Snap Originals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {shows.map((show) => (
            <div key={show.id} className="border rounded-lg overflow-hidden">
              <div className="flex">
                <img src={show.thumbnail || "/placeholder.svg"} alt={show.title} className="w-20 h-20 object-cover" />
                <div className="flex-1 p-3">
                  <h4 className="font-medium">{show.title}</h4>
                  <p className="text-sm text-muted-foreground mb-1">{show.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{show.episodes} episodes</span>
                    <span>•</span>
                    <span>{show.duration}</span>
                  </div>
                </div>
                <div className="p-3">
                  <Button size="sm">
                    <Play className="h-3 w-3 mr-1" />
                    Watch
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full">
            <Eye className="h-4 w-4 mr-2" />
            Discover More Shows
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
