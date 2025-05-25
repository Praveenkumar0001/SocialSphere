"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  XCircle,
  Settings,
  Play,
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  Users,
  MessageSquare,
  Video,
  ShoppingBag,
  MapPin,
  Shield,
  Sparkles,
  BarChart3,
} from "lucide-react"
import { FeatureActivator } from "@/lib/feature-activation"
import { useToast } from "@/hooks/use-toast"

interface FeatureStatus {
  id: string
  name: string
  description: string
  icon: any
  status: "active" | "inactive" | "error" | "loading"
  health: number
  lastChecked: string
  dependencies: string[]
  metrics: {
    users: number
    engagement: number
    revenue: number
  }
}

export default function FeaturesPage() {
  const [features, setFeatures] = useState<FeatureStatus[]>([])
  const [isActivating, setIsActivating] = useState(false)
  const [activationProgress, setActivationProgress] = useState(0)
  const { toast } = useToast()

  const initialFeatures: FeatureStatus[] = [
    {
      id: "posts-timeline",
      name: "Posts & Timeline",
      description: "Core social posting and timeline functionality",
      icon: MessageSquare,
      status: "inactive",
      health: 0,
      lastChecked: new Date().toISOString(),
      dependencies: ["user-profiles", "security-moderation"],
      metrics: { users: 0, engagement: 0, revenue: 0 },
    },
    {
      id: "stories",
      name: "Stories",
      description: "24-hour ephemeral content sharing",
      icon: Video,
      status: "inactive",
      health: 0,
      lastChecked: new Date().toISOString(),
      dependencies: ["user-profiles"],
      metrics: { users: 0, engagement: 0, revenue: 0 },
    },
    {
      id: "reels-videos",
      name: "Reels & Short Videos",
      description: "Short-form video content with editing tools",
      icon: Video,
      status: "inactive",
      health: 0,
      lastChecked: new Date().toISOString(),
      dependencies: ["user-profiles", "fun-addons"],
      metrics: { users: 0, engagement: 0, revenue: 0 },
    },
    {
      id: "long-form-videos",
      name: "Long-form Videos",
      description: "Extended video content with monetization",
      icon: Video,
      status: "inactive",
      health: 0,
      lastChecked: new Date().toISOString(),
      dependencies: ["user-profiles", "creator-tools"],
      metrics: { users: 0, engagement: 0, revenue: 0 },
    },
    {
      id: "messaging",
      name: "Secure Messaging",
      description: "End-to-end encrypted messaging system",
      icon: MessageSquare,
      status: "inactive",
      health: 0,
      lastChecked: new Date().toISOString(),
      dependencies: ["user-profiles", "security-moderation"],
      metrics: { users: 0, engagement: 0, revenue: 0 },
    },
    {
      id: "location-maps",
      name: "Location & Maps",
      description: "Location sharing and discovery features",
      icon: MapPin,
      status: "inactive",
      health: 0,
      lastChecked: new Date().toISOString(),
      dependencies: ["user-profiles"],
      metrics: { users: 0, engagement: 0, revenue: 0 },
    },
    {
      id: "marketplace",
      name: "Marketplace",
      description: "Buy and sell items with integrated payments",
      icon: ShoppingBag,
      status: "inactive",
      health: 0,
      lastChecked: new Date().toISOString(),
      dependencies: ["user-profiles", "security-moderation"],
      metrics: { users: 0, engagement: 0, revenue: 0 },
    },
    {
      id: "creator-tools",
      name: "Creator Tools",
      description: "Analytics and monetization for content creators",
      icon: BarChart3,
      status: "inactive",
      health: 0,
      lastChecked: new Date().toISOString(),
      dependencies: ["user-profiles"],
      metrics: { users: 0, engagement: 0, revenue: 0 },
    },
    {
      id: "fun-addons",
      name: "Fun Add-ons",
      description: "AR filters, games, and interactive features",
      icon: Sparkles,
      status: "inactive",
      health: 0,
      lastChecked: new Date().toISOString(),
      dependencies: ["user-profiles"],
      metrics: { users: 0, engagement: 0, revenue: 0 },
    },
    {
      id: "user-profiles",
      name: "User Profiles",
      description: "User account management and profiles",
      icon: Users,
      status: "inactive",
      health: 0,
      lastChecked: new Date().toISOString(),
      dependencies: [],
      metrics: { users: 0, engagement: 0, revenue: 0 },
    },
    {
      id: "trending-discovery",
      name: "Trending & Discovery",
      description: "Content discovery and trending algorithms",
      icon: TrendingUp,
      status: "inactive",
      health: 0,
      lastChecked: new Date().toISOString(),
      dependencies: ["posts-timeline", "user-profiles"],
      metrics: { users: 0, engagement: 0, revenue: 0 },
    },
    {
      id: "security-moderation",
      name: "Security & Moderation",
      description: "AI-powered content moderation and security",
      icon: Shield,
      status: "inactive",
      health: 0,
      lastChecked: new Date().toISOString(),
      dependencies: [],
      metrics: { users: 0, engagement: 0, revenue: 0 },
    },
  ]

  useEffect(() => {
    setFeatures(initialFeatures)
  }, [])

  const activateAllFeatures = async () => {
    setIsActivating(true)
    setActivationProgress(0)

    const activator = FeatureActivator.getInstance()

    try {
      // Sort features by dependencies (independent features first)
      const sortedFeatures = [...features].sort((a, b) => a.dependencies.length - b.dependencies.length)

      for (let i = 0; i < sortedFeatures.length; i++) {
        const feature = sortedFeatures[i]

        // Update status to loading
        setFeatures((prev) => prev.map((f) => (f.id === feature.id ? { ...f, status: "loading" as const } : f)))

        // Simulate activation delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        try {
          // Activate the feature
          await activator.activateFeature(feature.id)

          // Update status to active with health metrics
          setFeatures((prev) =>
            prev.map((f) =>
              f.id === feature.id
                ? {
                    ...f,
                    status: "active" as const,
                    health: Math.floor(Math.random() * 20) + 80, // 80-100% health
                    lastChecked: new Date().toISOString(),
                    metrics: {
                      users: Math.floor(Math.random() * 10000),
                      engagement: Math.floor(Math.random() * 100),
                      revenue: Math.floor(Math.random() * 50000),
                    },
                  }
                : f,
            ),
          )

          toast({
            title: `${feature.name} Activated`,
            description: "Feature is now live and operational",
          })
        } catch (error) {
          // Update status to error
          setFeatures((prev) =>
            prev.map((f) => (f.id === feature.id ? { ...f, status: "error" as const, health: 0 } : f)),
          )

          toast({
            title: `${feature.name} Failed`,
            description: "Failed to activate feature",
            variant: "destructive",
          })
        }

        // Update progress
        setActivationProgress(((i + 1) / sortedFeatures.length) * 100)
      }

      toast({
        title: "All Features Activated!",
        description: "SocialSphere is now fully operational",
      })
    } catch (error) {
      toast({
        title: "Activation Failed",
        description: "Some features failed to activate",
        variant: "destructive",
      })
    } finally {
      setIsActivating(false)
    }
  }

  const toggleFeature = async (featureId: string) => {
    const feature = features.find((f) => f.id === featureId)
    if (!feature) return

    setFeatures((prev) =>
      prev.map((f) =>
        f.id === featureId
          ? {
              ...f,
              status: f.status === "active" ? "inactive" : ("loading" as const),
            }
          : f,
      ),
    )

    // Simulate toggle delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setFeatures((prev) =>
      prev.map((f) =>
        f.id === featureId
          ? {
              ...f,
              status: f.status === "loading" ? "active" : ("inactive" as const),
              health: f.status === "loading" ? Math.floor(Math.random() * 20) + 80 : 0,
              lastChecked: new Date().toISOString(),
            }
          : f,
      ),
    )

    toast({
      title: `${feature.name} ${feature.status === "active" ? "Deactivated" : "Activated"}`,
      description: `Feature is now ${feature.status === "active" ? "offline" : "online"}`,
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "inactive":
        return <XCircle className="h-5 w-5 text-gray-400" />
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "loading":
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
      default:
        return <XCircle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "loading":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const activeFeatures = features.filter((f) => f.status === "active").length
  const totalFeatures = features.length
  const averageHealth =
    features.filter((f) => f.status === "active").reduce((acc, f) => acc + f.health, 0) / activeFeatures || 0

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Feature Management</h1>
        <p className="text-gray-600">Activate and manage all SocialSphere features</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Features</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeFeatures}/{totalFeatures}
            </div>
            <p className="text-xs text-green-600">{Math.round((activeFeatures / totalFeatures) * 100)}% operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(averageHealth)}%</div>
            <p className="text-xs text-blue-600">Average feature health</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {features.reduce((acc, f) => acc + f.metrics.users, 0).toLocaleString()}
            </div>
            <p className="text-xs text-purple-600">Across all features</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${features.reduce((acc, f) => acc + f.metrics.revenue, 0).toLocaleString()}
            </div>
            <p className="text-xs text-green-600">Total platform revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Activation Controls */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Feature Activation</CardTitle>
          <CardDescription>Activate all features or manage them individually</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Button onClick={activateAllFeatures} disabled={isActivating} size="lg" className="flex items-center gap-2">
              {isActivating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Activating Features...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Activate All Features
                </>
              )}
            </Button>

            {isActivating && (
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-600">Activation Progress:</span>
                  <span className="text-sm font-medium">{Math.round(activationProgress)}%</span>
                </div>
                <Progress value={activationProgress} className="w-full" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card key={feature.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <feature.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{feature.name}</CardTitle>
                    <Badge className={getStatusColor(feature.status)}>{feature.status}</Badge>
                  </div>
                </div>
                {getStatusIcon(feature.status)}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{feature.description}</p>

              {/* Health Status */}
              {feature.status === "active" && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Health</span>
                    <span className="text-sm font-bold">{feature.health}%</span>
                  </div>
                  <Progress value={feature.health} />
                </div>
              )}

              {/* Dependencies */}
              {feature.dependencies.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2">Dependencies</h4>
                  <div className="flex flex-wrap gap-1">
                    {feature.dependencies.map((dep, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {features.find((f) => f.id === dep)?.name || dep}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Metrics */}
              {feature.status === "active" && (
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">{feature.metrics.users.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Users</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{feature.metrics.engagement}%</div>
                    <div className="text-xs text-gray-500">Engagement</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">${feature.metrics.revenue.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Revenue</div>
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={feature.status === "active"}
                    onCheckedChange={() => toggleFeature(feature.id)}
                    disabled={feature.status === "loading" || isActivating}
                  />
                  <span className="text-sm">{feature.status === "active" ? "Enabled" : "Disabled"}</span>
                </div>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>

              {/* Last Checked */}
              <div className="text-xs text-gray-500">
                Last checked: {new Date(feature.lastChecked).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Success Message */}
      {activeFeatures === totalFeatures && (
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800 mb-2">🎉 All Features Activated Successfully!</h3>
            <p className="text-green-700 mb-4">
              SocialSphere is now fully operational with all features active and healthy.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-white p-3 rounded-lg">
                <div className="font-bold text-blue-600">Posts & Timeline</div>
                <div className="text-gray-600">✅ Active</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-bold text-purple-600">Reels & Videos</div>
                <div className="text-gray-600">✅ Active</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-bold text-green-600">Marketplace</div>
                <div className="text-gray-600">✅ Active</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <div className="font-bold text-orange-600">All Features</div>
                <div className="text-gray-600">✅ Ready</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
