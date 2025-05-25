"use client"

import { useState, useEffect } from "react"
import { EnhancedPostTimeline } from "@/components/enhanced-post-timeline"
import { EnhancedReels } from "@/components/enhanced-reels"
import { EnhancedMarketplace } from "@/components/enhanced-marketplace"
import { SecureMessaging } from "@/components/secure-messaging"
import { ContentScheduler } from "@/components/content-scheduler"
import { VideoCall } from "@/components/video-call"
import { InteractiveTutorial } from "@/components/interactive-tutorial"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Video, ShoppingBag, MessageCircle, Calendar, Phone, GraduationCap, Settings, Bell } from "lucide-react"
import { getCurrentUser } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("home")
  const [notifications, setNotifications] = useState(3)
  const currentUser = getCurrentUser()
  const { toast } = useToast()

  useEffect(() => {
    // Show welcome message for activated features
    toast({
      title: "🎉 Welcome to SocialSphere!",
      description: "All features are now active and ready to use",
    })
  }, [])

  const features = [
    {
      id: "home",
      name: "Home",
      icon: Home,
      component: <EnhancedPostTimeline />,
      description: "Your personalized feed and timeline",
    },
    {
      id: "reels",
      name: "Reels",
      icon: Video,
      component: <EnhancedReels />,
      description: "Short-form videos and viral content",
    },
    {
      id: "marketplace",
      name: "Marketplace",
      icon: ShoppingBag,
      component: <EnhancedMarketplace />,
      description: "Buy and sell with your community",
    },
    {
      id: "messages",
      name: "Messages",
      icon: MessageCircle,
      component: <SecureMessaging currentUserId={currentUser.id} recipientId="user-2" conversationId="conv-1" />,
      description: "Secure end-to-end encrypted messaging",
    },
    {
      id: "scheduler",
      name: "Scheduler",
      icon: Calendar,
      component: <ContentScheduler />,
      description: "Schedule your content in advance",
    },
    {
      id: "video-call",
      name: "Video Calls",
      icon: Phone,
      component: (
        <VideoCall isOpen={false} onClose={() => {}} contactName="Demo" contactAvatar="" contactUsername="demo" />
      ),
      description: "High-quality video calling",
    },
    {
      id: "tutorials",
      name: "Tutorials",
      icon: GraduationCap,
      component: <InteractiveTutorial />,
      description: "Learn how to use SocialSphere",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SocialSphere
              </h1>
              <Badge className="bg-green-100 text-green-800">All Features Active</Badge>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {notifications}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Navigation Tabs */}
          <TabsList className="grid grid-cols-4 lg:grid-cols-7 w-full mb-6">
            {features.map((feature) => (
              <TabsTrigger key={feature.id} value={feature.id} className="flex items-center gap-2 text-xs lg:text-sm">
                <feature.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{feature.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Feature Content */}
          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id} className="mt-0">
              <Card className="mb-4">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{feature.name}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <div className="space-y-6">{feature.component}</div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Feature Status Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Posts Active</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Stories Active</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Reels Active</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Marketplace Active</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Messaging Active</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">All Systems Go</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
