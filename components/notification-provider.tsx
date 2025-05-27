"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { Bell } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { notifications as initialNotifications } from "@/lib/data"
import type { Notification } from "@/lib/types"

type NotificationContextType = {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "read" | "createdAt">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications ?? [])
  const { toast } = useToast()

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const addNotification = useCallback(
    (notification: Omit<Notification, "id" | "read" | "createdAt">) => {
      const newNotification: Notification = {
        ...notification,
        id: `n${Date.now()}`,
        read: false,
        createdAt: new Date().toISOString(),
      }

      setNotifications((prev) => [newNotification, ...prev])

      toast({
        title: `New ${notification.type}`,
        description:
          notification.type === "follow"
            ? `${notification.sender.name} started following you`
            : notification.content || `${notification.sender.name} ${notification.type}d your post`,
        duration: 5000,
      })
    },
    [toast],
  )

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }, [])

  useEffect(() => {
    const types: Notification["type"][] = ["like", "comment", "follow", "mention", "message"]
    const senders = [
      { id: "2", name: "Alex Smith", username: "alexsmith", avatar: "AS" },
      { id: "3", name: "Jane Doe", username: "janedoe", avatar: "JD" },
      { id: "4", name: "Taylor Swift", username: "taylorswift", avatar: "TS" },
      { id: "5", name: "Michael Jordan", username: "michaeljordan", avatar: "MJ" },
    ]

    const interval = setInterval(() => {
      const randomType = types[Math.floor(Math.random() * types.length)]
      const randomSender = senders[Math.floor(Math.random() * senders.length)]

      let content: string | undefined
      let postId: string | undefined

      switch (randomType) {
        case "like":
          postId = `${Math.floor(Math.random() * 5) + 1}`
          break
        case "comment":
          postId = `${Math.floor(Math.random() * 5) + 1}`
          content = "Great post! I really enjoyed reading this."
          break
        case "mention":
          postId = `${Math.floor(Math.random() * 5) + 1}`
          content = `Hey @johnsmith, check this out!`
          break
        case "message":
          content = "Hey, how are you doing today?"
          break
      }

      addNotification({
        type: randomType,
        sender: randomSender,
        content,
        postId,
      })
    }, 45000)

    return () => clearInterval(interval)
  }, [addNotification])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

export function NotificationBell() {
  const { unreadCount } = useNotifications()

  return (
    <>
      <Bell className="h-6 w-6" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </>
  )
}
