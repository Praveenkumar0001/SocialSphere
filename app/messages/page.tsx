"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send, ArrowLeft, Paperclip, ImageIcon, File, X, Check, CheckCheck, Smile } from "lucide-react"
import {
  getCurrentUser,
  users,
  conversations,
  messages as allMessages,
  addMessageReaction,
  markMessageAsRead,
} from "@/lib/data"
import { isLoggedIn } from "@/app/utils/auth"
import { useToast } from "@/components/ui/use-toast"
import type { User, Message, Conversation, MessageAttachment, MessageReaction } from "@/lib/types"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Common emoji reactions
const commonEmojis = ["👍", "❤️", "😂", "😮", "😢", "👏", "🔥", "🎉"]

export default function MessagesPage() {
  // Store current user in state to avoid recreating on every render
  const [currentUser] = useState(getCurrentUser)

  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [conversationList, setConversationList] = useState<Conversation[]>([])
  const [messageList, setMessageList] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [isMobileView, setIsMobileView] = useState(false)
  const [showConversations, setShowConversations] = useState(true)
  const [initialized, setInitialized] = useState(false)
  const [attachments, setAttachments] = useState<MessageAttachment[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Handle window resize - separate effect with no dependencies on component state
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobileView(mobile)
    }

    // Initial check
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, []) // Empty dependency array - only runs once on mount

  // Handle authentication and initial conversation setup
  useEffect(() => {
    if (initialized) return

    if (!isLoggedIn()) {
      router.push("/login")
      return
    }

    // Get user's conversations
    const userConversations = [...conversations]
      .filter((conv) => conv.participants.includes(currentUser.id))
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

    setConversationList(userConversations)

    // Check if there's a user param in the URL
    const userParam = searchParams.get("user")
    if (userParam) {
      const targetUser = users.find((u) => u.username === userParam || u.id === userParam)
      if (targetUser) {
        // Find existing conversation
        const existingConv = userConversations.find(
          (conv) => conv.participants.includes(targetUser.id) && conv.participants.includes(currentUser.id),
        )

        if (existingConv) {
          setActiveConversation(existingConv.id)
        } else {
          // Create new conversation object
          const newConvId = `conv-${Date.now()}`
          const newConv = {
            id: newConvId,
            participants: [currentUser.id, targetUser.id],
            updatedAt: new Date().toISOString(),
          }

          // Add to conversations array (create a copy to avoid mutation)
          conversations.push(newConv)

          // Update state
          setConversationList((prev) => [newConv, ...prev])
          setActiveConversation(newConvId)
        }

        setShowConversations(false)
      }
    } else if (userConversations.length > 0) {
      setActiveConversation(userConversations[0].id)
    }

    setInitialized(true)
  }, [initialized, router, searchParams, currentUser.id])

  // Load messages when active conversation changes
  useEffect(() => {
    if (!activeConversation) return

    // Get messages for active conversation
    const conversation = conversations.find((c) => c.id === activeConversation)
    if (!conversation) return

    const [user1, user2] = conversation.participants

    const conversationMessages = [...allMessages]
      .filter(
        (msg) =>
          (msg.senderId === user1 && msg.receiverId === user2) || (msg.senderId === user2 && msg.receiverId === user1),
      )
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

    // Mark unread messages as read
    conversationMessages.forEach((message) => {
      if (message.receiverId === currentUser.id && !message.read) {
        markMessageAsRead(message.id)
      }
    })

    setMessageList(conversationMessages)

    // On mobile, show the conversation view
    if (isMobileView) {
      setShowConversations(false)
    }
  }, [activeConversation, isMobileView, currentUser.id])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messageList])

  // Handle search query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      const filtered = users.filter(
        (user) =>
          user.id !== currentUser.id &&
          (user.name.toLowerCase().includes(query) || user.username.toLowerCase().includes(query)),
      )
      setFilteredUsers(filtered)
    } else {
      setFilteredUsers([])
    }
  }, [searchQuery, currentUser.id])

  // Memoize functions to prevent recreating on every render
  const getOtherParticipant = useCallback(
    (conversation: Conversation): User => {
      const otherUserId = conversation.participants.find((id) => id !== currentUser.id)
      return users.find((user) => user.id === otherUserId) || currentUser
    },
    [currentUser],
  )

  const handleSendMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if ((!newMessage.trim() && attachments.length === 0) || !activeConversation) return

      const conversation = conversations.find((c) => c.id === activeConversation)
      if (!conversation) return

      const otherUserId = conversation.participants.find((id) => id !== currentUser.id)
      if (!otherUserId) return

      // Create new message
      const newMsg: Message = {
        id: `msg-${Date.now()}`,
        senderId: currentUser.id,
        receiverId: otherUserId,
        content: newMessage,
        createdAt: new Date().toISOString(),
        read: false,
        reactions: [],
        attachments: attachments.length > 0 ? [...attachments] : undefined,
      }

      // Add to messages
      allMessages.push(newMsg)
      setMessageList((prev) => [...prev, newMsg])
      setNewMessage("")
      setAttachments([])

      // Update conversation timestamp
      const updatedAt = new Date().toISOString()

      // Update the conversation in the original array
      const convIndex = conversations.findIndex((c) => c.id === activeConversation)
      if (convIndex >= 0) {
        conversations[convIndex] = {
          ...conversations[convIndex],
          updatedAt,
        }
      }

      // Update the conversation list state
      setConversationList((prev) => {
        const updated = prev.map((conv) => (conv.id === activeConversation ? { ...conv, updatedAt } : conv))

        return updated.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      })

      // Show success toast
      toast({
        description: "Message sent",
      })
    },
    [newMessage, activeConversation, currentUser.id, toast, attachments],
  )

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    setIsUploading(true)

    // Simulate file upload delay
    setTimeout(() => {
      const files = Array.from(e.target.files || [])

      const newAttachments: MessageAttachment[] = files.map((file) => {
        const isImage = file.type.startsWith("image/")

        return {
          id: `attach-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          type: isImage ? "image" : "file",
          url: isImage
            ? `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(file.name)}`
            : `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(file.name)}`,
          name: file.name,
          size: file.size,
          thumbnailUrl: isImage
            ? `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(file.name)}`
            : undefined,
        }
      })

      setAttachments((prev) => [...prev, ...newAttachments])
      setIsUploading(false)

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }, 1500)
  }, [])

  const removeAttachment = useCallback((attachmentId: string) => {
    setAttachments((prev) => prev.filter((attachment) => attachment.id !== attachmentId))
  }, [])

  const startNewConversation = useCallback(
    (user: User) => {
      // Check if conversation already exists
      const existingConv = conversationList.find(
        (conv) => conv.participants.includes(user.id) && conv.participants.includes(currentUser.id),
      )

      if (existingConv) {
        setActiveConversation(existingConv.id)
      } else {
        // Create new conversation
        const newConv: Conversation = {
          id: `conv-${Date.now()}`,
          participants: [currentUser.id, user.id],
          updatedAt: new Date().toISOString(),
        }

        conversations.push(newConv)
        setConversationList((prev) => [newConv, ...prev])
        setActiveConversation(newConv.id)
      }

      setSearchQuery("")
      setFilteredUsers([])
    },
    [conversationList, currentUser.id],
  )

  const handleReaction = useCallback(
    (messageId: string, emoji: string) => {
      const updatedMessage = addMessageReaction(messageId, currentUser.id, emoji)

      // Update message list with the updated message
      setMessageList((prev) => prev.map((msg) => (msg.id === messageId ? updatedMessage : msg)))
    },
    [currentUser.id],
  )

  const formatTime = useCallback((dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }, [])

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }, [])

  const getLastMessage = useCallback((conversation: Conversation) => {
    const [user1, user2] = conversation.participants

    const conversationMessages = allMessages
      .filter(
        (msg) =>
          (msg.senderId === user1 && msg.receiverId === user2) || (msg.senderId === user2 && msg.receiverId === user1),
      )
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return conversationMessages[0]
  }, [])

  const getUnreadCount = useCallback(
    (conversation: Conversation) => {
      const [user1, user2] = conversation.participants
      const otherUserId = user1 === currentUser.id ? user2 : user1

      return allMessages.filter((msg) => msg.senderId === otherUserId && msg.receiverId === currentUser.id && !msg.read)
        .length
    },
    [currentUser.id],
  )

  const handleBackToList = useCallback(() => {
    setShowConversations(true)
  }, [])

  const renderReactions = useCallback(
    (reactions: MessageReaction[], messageId: string) => {
      if (reactions.length === 0) return null

      // Group reactions by emoji
      const groupedReactions: Record<string, string[]> = {}
      reactions.forEach((reaction) => {
        if (!groupedReactions[reaction.emoji]) {
          groupedReactions[reaction.emoji] = []
        }
        groupedReactions[reaction.emoji].push(reaction.userId)
      })

      return (
        <div className="flex flex-wrap gap-1 mt-1">
          {Object.entries(groupedReactions).map(([emoji, userIds]) => (
            <TooltipProvider key={emoji}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="flex items-center bg-muted rounded-full px-2 py-0.5 text-xs cursor-pointer hover:bg-muted/80"
                    onClick={() => handleReaction(messageId, emoji)}
                  >
                    <span className="mr-1">{emoji}</span>
                    <span>{userIds.length}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {userIds.map((userId) => users.find((u) => u.id === userId)?.name).join(", ")}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      )
    },
    [handleReaction],
  )

  const renderAttachment = useCallback((attachment: MessageAttachment) => {
    if (attachment.type === "image") {
      return (
        <div key={attachment.id} className="relative rounded-md overflow-hidden mt-2 max-w-[240px]">
          <img
            src={attachment.url || "/placeholder.svg"}
            alt={attachment.name}
            className="w-full h-auto object-cover rounded-md"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
            {attachment.name}
          </div>
        </div>
      )
    } else {
      return (
        <div key={attachment.id} className="flex items-center gap-2 p-2 bg-muted rounded-md mt-2">
          <File className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{attachment.name}</p>
            <p className="text-xs text-muted-foreground">
              {attachment.size ? `${Math.round(attachment.size / 1024)} KB` : ""}
            </p>
          </div>
        </div>
      )
    }
  }, [])

  const renderReadStatus = useCallback(
    (message: Message) => {
      if (message.senderId !== currentUser.id) return null

      if (message.read) {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-primary">
                  <CheckCheck className="h-3 w-3" />
                </div>
              </TooltipTrigger>
              <TooltipContent>Read {message.readAt ? `at ${formatTime(message.readAt)}` : ""}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      } else {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-muted-foreground">
                  <Check className="h-3 w-3" />
                </div>
              </TooltipTrigger>
              <TooltipContent>Delivered</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      }
    },
    [currentUser.id, formatTime],
  )

  // If not initialized yet, show loading
  if (!initialized) {
    return (
      <div className="container max-w-6xl py-6">
        <div className="border rounded-lg overflow-hidden h-[calc(100vh-200px)] bg-background flex items-center justify-center">
          <p>Loading messages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl py-6">
      <div className="border rounded-lg overflow-hidden h-[calc(100vh-200px)] bg-background">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          {/* Conversations list */}
          {(!isMobileView || showConversations) && (
            <div className="md:col-span-1 border-r flex flex-col h-full">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-lg mb-4">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Search results */}
              {filteredUsers.length > 0 ? (
                <div className="flex-1 overflow-y-auto">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-4 hover:bg-muted cursor-pointer border-b"
                      onClick={() => startNewConversation(user)}
                    >
                      <Avatar>
                        <AvatarImage src={user.avatar || "/placeholder.svg?height=40&width=40"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">@{user.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto">
                  {conversationList.length > 0 ? (
                    conversationList.map((conversation) => {
                      const otherUser = getOtherParticipant(conversation)
                      const lastMessage = getLastMessage(conversation)
                      const unreadCount = getUnreadCount(conversation)

                      return (
                        <div
                          key={conversation.id}
                          className={`flex items-center gap-3 p-4 cursor-pointer border-b hover:bg-muted ${
                            activeConversation === conversation.id ? "bg-muted" : ""
                          }`}
                          onClick={() => setActiveConversation(conversation.id)}
                        >
                          <Avatar>
                            <AvatarImage
                              src={otherUser.avatar || "/placeholder.svg?height=40&width=40"}
                              alt={otherUser.name}
                            />
                            <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <p className="font-medium truncate">{otherUser.name}</p>
                              {lastMessage && (
                                <span className="text-xs text-muted-foreground">
                                  {formatTime(lastMessage.createdAt)}
                                </span>
                              )}
                            </div>
                            {lastMessage && (
                              <div className="flex items-center gap-1">
                                <p
                                  className={`text-sm truncate ${unreadCount > 0 ? "font-medium" : "text-muted-foreground"}`}
                                >
                                  {lastMessage.senderId === currentUser.id ? "You: " : ""}
                                  {lastMessage.attachments && lastMessage.attachments.length > 0
                                    ? lastMessage.content
                                      ? `${lastMessage.content} [${lastMessage.attachments.length} attachment${lastMessage.attachments.length > 1 ? "s" : ""}]`
                                      : `[${lastMessage.attachments.length} attachment${lastMessage.attachments.length > 1 ? "s" : ""}]`
                                    : lastMessage.content}
                                </p>
                                {lastMessage.senderId === currentUser.id && (
                                  <div className="flex-shrink-0 ml-1">
                                    {lastMessage.read ? (
                                      <CheckCheck className="h-3 w-3 text-primary" />
                                    ) : (
                                      <Check className="h-3 w-3 text-muted-foreground" />
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          {unreadCount > 0 && (
                            <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground">
                              {unreadCount}
                            </div>
                          )}
                        </div>
                      )
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                      <p className="text-muted-foreground mb-2">No conversations yet</p>
                      <p className="text-sm text-muted-foreground">Search for users to start a conversation</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Chat window */}
          {(!isMobileView || !showConversations) && (
            <div className="md:col-span-2 flex flex-col h-full">
              {activeConversation ? (
                <>
                  {/* Chat header */}
                  <div className="p-4 border-b flex items-center gap-3">
                    {isMobileView && (
                      <Button variant="ghost" size="icon" onClick={handleBackToList}>
                        <ArrowLeft className="h-5 w-5" />
                      </Button>
                    )}

                    {(() => {
                      const conversation = conversations.find((c) => c.id === activeConversation)
                      if (!conversation) return null

                      const otherUser = getOtherParticipant(conversation)

                      return (
                        <>
                          <Avatar>
                            <AvatarImage
                              src={otherUser.avatar || "/placeholder.svg?height=40&width=40"}
                              alt={otherUser.name}
                            />
                            <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{otherUser.name}</p>
                            <p className="text-xs text-muted-foreground">@{otherUser.username}</p>
                          </div>
                        </>
                      )
                    })()}
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messageList.length > 0 ? (
                      <>
                        {messageList.map((message, index) => {
                          const isCurrentUser = message.senderId === currentUser.id
                          const showDate =
                            index === 0 ||
                            formatDate(messageList[index - 1].createdAt) !== formatDate(message.createdAt)

                          return (
                            <div key={message.id} className="space-y-4">
                              {showDate && (
                                <div className="flex justify-center">
                                  <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                                    {formatDate(message.createdAt)}
                                  </span>
                                </div>
                              )}
                              <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                                <div className="flex gap-2 max-w-[80%]">
                                  {!isCurrentUser && (
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage
                                        src={
                                          users.find((u) => u.id === message.senderId)?.avatar ||
                                          "/placeholder.svg?height=32&width=32" ||
                                          "/placeholder.svg" ||
                                          "/placeholder.svg"
                                        }
                                        alt="Avatar"
                                      />
                                      <AvatarFallback>
                                        {users.find((u) => u.id === message.senderId)?.name.charAt(0) || "?"}
                                      </AvatarFallback>
                                    </Avatar>
                                  )}
                                  <div className="relative group">
                                    <div
                                      className={`p-3 rounded-lg ${
                                        isCurrentUser
                                          ? "bg-primary text-primary-foreground rounded-br-none"
                                          : "bg-muted rounded-bl-none"
                                      }`}
                                    >
                                      <p>{message.content}</p>

                                      {/* Render attachments */}
                                      {message.attachments && message.attachments.length > 0 && (
                                        <div className="space-y-2 mt-2">
                                          {message.attachments.map((attachment) => renderAttachment(attachment))}
                                        </div>
                                      )}
                                    </div>

                                    {/* Message reactions */}
                                    {renderReactions(message.reactions, message.id)}

                                    {/* Message info and reaction button */}
                                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                                      <span>{formatTime(message.createdAt)}</span>
                                      {renderReadStatus(message)}

                                      {/* Reaction button */}
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-5 w-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                          >
                                            <Smile className="h-3 w-3" />
                                          </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-2" align="start">
                                          <div className="flex gap-1">
                                            {commonEmojis.map((emoji) => (
                                              <button
                                                key={emoji}
                                                className="text-lg hover:bg-muted p-1 rounded-full"
                                                onClick={() => handleReaction(message.id, emoji)}
                                              >
                                                {emoji}
                                              </button>
                                            ))}
                                          </div>
                                        </PopoverContent>
                                      </Popover>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                        <div ref={messagesEndRef} />
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <p className="text-muted-foreground mb-2">No messages yet</p>
                        <p className="text-sm text-muted-foreground">Send a message to start the conversation</p>
                      </div>
                    )}
                  </div>

                  {/* Attachments preview */}
                  {attachments.length > 0 && (
                    <div className="p-2 border-t flex gap-2 overflow-x-auto">
                      {attachments.map((attachment) => (
                        <div key={attachment.id} className="relative">
                          <div className="w-16 h-16 border rounded-md flex items-center justify-center bg-muted">
                            {attachment.type === "image" ? (
                              <img
                                src={attachment.thumbnailUrl || attachment.url}
                                alt={attachment.name}
                                className="max-w-full max-h-full object-cover"
                              />
                            ) : (
                              <File className="h-8 w-8 text-muted-foreground" />
                            )}
                          </div>
                          <button
                            className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5"
                            onClick={() => removeAttachment(attachment.id)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Message input */}
                  <div className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="pr-20"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                          >
                            <Paperclip className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                          >
                            <ImageIcon className="h-4 w-4" />
                          </Button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileSelect}
                            multiple
                            accept="image/*,application/pdf,application/zip,text/plain"
                          />
                        </div>
                      </div>
                      <Button type="submit" disabled={(!newMessage.trim() && attachments.length === 0) || isUploading}>
                        {isUploading ? (
                          <div className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Uploading...
                          </div>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                  <p className="text-muted-foreground mb-2">Select a conversation</p>
                  <p className="text-sm text-muted-foreground">
                    Choose a conversation from the list or search for users to start a new one
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
