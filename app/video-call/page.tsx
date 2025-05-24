"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { VideoCall } from "@/components/video-call"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Video, Phone, Star, Clock, Plus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { VirtualBackground } from "@/components/virtual-background"

interface Contact {
  id: string
  name: string
  username: string
  avatar: string
  isOnline: boolean
  isStarred: boolean
  lastCall?: {
    type: "incoming" | "outgoing"
    timestamp: string
    duration: string
  }
}

export default function VideoCallPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCallActive, setIsCallActive] = useState(false)
  const [activeContact, setActiveContact] = useState<Contact | null>(null)
  const [isIncomingCall, setIsIncomingCall] = useState(false)

  const contacts: Contact[] = [
    {
      id: "contact-1",
      name: "Jane Doe",
      username: "janedoe",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      isStarred: true,
      lastCall: {
        type: "outgoing",
        timestamp: "Yesterday, 3:24 PM",
        duration: "12:34",
      },
    },
    {
      id: "contact-2",
      name: "Alex Smith",
      username: "alexsmith",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      isStarred: false,
      lastCall: {
        type: "incoming",
        timestamp: "Oct 12, 2023",
        duration: "45:12",
      },
    },
    {
      id: "contact-3",
      name: "Sarah Johnson",
      username: "sarahj",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: false,
      isStarred: true,
    },
    {
      id: "contact-4",
      name: "Michael Brown",
      username: "michaelb",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: false,
      isStarred: false,
      lastCall: {
        type: "outgoing",
        timestamp: "Oct 5, 2023",
        duration: "5:47",
      },
    },
    {
      id: "contact-5",
      name: "Emily Wilson",
      username: "emilyw",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      isStarred: false,
    },
  ]

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleStartCall = (contact: Contact) => {
    setActiveContact(contact)
    setIsIncomingCall(false)
    setIsCallActive(true)

    toast({
      title: "Starting call",
      description: `Calling ${contact.name}...`,
    })
  }

  // Simulate incoming call after 5 seconds
  setTimeout(() => {
    if (!isCallActive && !isIncomingCall && Math.random() > 0.7) {
      const randomContact = contacts[Math.floor(Math.random() * contacts.length)]
      setActiveContact(randomContact)
      setIsIncomingCall(true)
      setIsCallActive(true)
    }
  }, 5000)

  const handleEndCall = () => {
    setIsCallActive(false)
    setActiveContact(null)
    setIsIncomingCall(false)
  }

  const handleAcceptCall = () => {
    setIsIncomingCall(false)

    toast({
      title: "Call connected",
      description: `You are now in a call with ${activeContact?.name}`,
    })
  }

  const handleDeclineCall = () => {
    setIsCallActive(false)
    setActiveContact(null)
    setIsIncomingCall(false)

    toast({
      title: "Call declined",
      description: `You declined a call from ${activeContact?.name}`,
    })
  }

  const toggleStar = (contactId: string) => {
    // In a real app, this would update the database
    toast({
      title: "Contact updated",
      description: "Contact has been added to favorites",
    })
  }

  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Video Calls</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Contacts</CardTitle>
              <CardDescription>Start a video call with your connections</CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search contacts..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredContacts.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">No contacts found</p>
                ) : (
                  filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {contact.isOnline && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <p className="font-medium">{contact.name}</p>
                            {contact.isStarred && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">@{contact.username}</p>
                          {contact.lastCall && (
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{contact.lastCall.timestamp}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => toggleStar(contact.id)}
                        >
                          <Star
                            className={`h-4 w-4 ${contact.isStarred ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
                          />
                          <span className="sr-only">Favorite</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          onClick={() => handleStartCall(contact)}
                        >
                          <Video className="h-4 w-4" />
                          <span className="sr-only">Video Call</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          onClick={() => handleStartCall(contact)}
                        >
                          <Phone className="h-4 w-4" />
                          <span className="sr-only">Voice Call</span>
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <Button variant="outline" className="w-full mt-4 flex items-center justify-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Add New Contact</span>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Video Call</CardTitle>
              <CardDescription>Connect face-to-face with your friends and colleagues</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="mb-6">
                <Video className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Start a Video Call</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
                Connect with your friends and colleagues through high-quality video calls. Simply select a contact to
                get started.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-md">
                {contacts
                  .filter((c) => c.isOnline)
                  .slice(0, 3)
                  .map((contact) => (
                    <Button
                      key={contact.id}
                      variant="outline"
                      className="flex flex-col items-center p-4 h-auto"
                      onClick={() => handleStartCall(contact)}
                    >
                      <Avatar className="h-12 w-12 mb-2">
                        <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{contact.name}</span>
                      <span className="text-xs text-green-500">Online</span>
                    </Button>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Video Call Dialog */}
      {isCallActive && activeContact && (
        <VideoCall
          isOpen={isCallActive}
          onClose={handleEndCall}
          contactName={activeContact.name}
          contactAvatar={activeContact.avatar}
          contactUsername={activeContact.username}
          isIncoming={isIncomingCall}
          onAccept={handleAcceptCall}
          onDecline={handleDeclineCall}
        />
      )}

      {/* Add this in the video call controls */}
      <VirtualBackground
        videoRef={videoRef}
        onBackgroundChange={(background) => {
          console.log("Background changed:", background)
        }}
      />
    </div>
  )
}
