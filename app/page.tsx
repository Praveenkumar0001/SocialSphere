"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Users,
  MessageCircle,
  Video,
  Camera,
  ShoppingBag,
  MapPin,
  Mic,
  Radio,
  Calendar,
  Gamepad2,
  Star,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Globe,
  Shield,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [stats, setStats] = useState({
    users: 0,
    posts: 0,
    messages: 0,
    features: 0,
  })

  const features = [
    {
      name: "Instagram Features",
      icon: Camera,
      color: "from-purple-500 to-pink-500",
      items: ["Stories", "Reels", "Live Streaming", "Shopping", "Close Friends", "Boomerang"],
    },
    {
      name: "WhatsApp Features",
      icon: MessageCircle,
      color: "from-green-500 to-emerald-500",
      items: ["End-to-End Encryption", "Disappearing Messages", "Communities", "Business Profile"],
    },
    {
      name: "Twitter Features",
      icon: MessageCircle,
      color: "from-blue-500 to-cyan-500",
      items: ["Audio Spaces", "Lists", "Communities", "Premium Features", "Trending"],
    },
    {
      name: "Facebook Features",
      icon: Users,
      color: "from-blue-600 to-indigo-600",
      items: ["Groups", "Events", "Pages", "Gaming", "Marketplace", "Watch"],
    },
    {
      name: "Snapchat Features",
      icon: Camera,
      color: "from-yellow-400 to-orange-500",
      items: ["Snap Map", "Bitmoji", "AR Filters", "Games", "Originals", "Memories"],
    },
  ]

  // Animate stats on load
  useEffect(() => {
    const animateStats = () => {
      const targets = { users: 2500000, posts: 15000000, messages: 45000000, features: 50 }
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      let step = 0
      const interval = setInterval(() => {
        step++
        const progress = step / steps

        setStats({
          users: Math.floor(targets.users * progress),
          posts: Math.floor(targets.posts * progress),
          messages: Math.floor(targets.messages * progress),
          features: Math.floor(targets.features * progress),
        })

        if (step >= steps) {
          clearInterval(interval)
        }
      }, stepDuration)
    }

    animateStats()
  }, [])

  // Cycle through features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-10"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Badge className="gradient-bg text-white border-0 px-6 py-2 text-lg pulse-glow">
                🌟 All Social Media Features in One Platform
              </Badge>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
              SocialSphere
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience Instagram, WhatsApp, Twitter, Facebook, and Snapchat features all in one beautiful, secure
              platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="gradient-bg text-white border-0 px-8 py-4 text-lg hover:scale-105 transition-transform"
                >
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg hover:scale-105 transition-transform">
                  Create Account
                </Button>
              </Link>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{stats.users.toLocaleString()}+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.posts.toLocaleString()}+</div>
                <div className="text-sm text-muted-foreground">Posts Shared</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{stats.messages.toLocaleString()}+</div>
                <div className="text-sm text-muted-foreground">Messages Sent</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">{stats.features}+</div>
                <div className="text-sm text-muted-foreground">Features Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">All Your Favorite Features</h2>
            <p className="text-xl text-muted-foreground">Every feature from the top 5 social media platforms</p>
          </div>

          {/* Animated Feature Display */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="glass-effect border-0 p-8">
              <div className="text-center">
                <div
                  className={`h-20 w-20 rounded-full bg-gradient-to-r ${features[currentFeature].color} mx-auto mb-6 flex items-center justify-center float-animation`}
                >
                  {React.createElement(features[currentFeature].icon, { className: "h-10 w-10 text-white" })}
                </div>
                <h3 className="text-2xl font-bold mb-4">{features[currentFeature].name}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {features[currentFeature].items.map((item, index) => (
                    <Badge key={index} variant="secondary" className="py-2">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Stories & Reels",
                icon: Video,
                description: "Share moments with stories and create viral short videos",
                color: "from-purple-500 to-pink-500",
              },
              {
                name: "Live Streaming",
                icon: Radio,
                description: "Broadcast live to your audience with real-time interaction",
                color: "from-red-500 to-orange-500",
              },
              {
                name: "Secure Messaging",
                icon: Shield,
                description: "End-to-end encrypted messaging with disappearing messages",
                color: "from-green-500 to-emerald-500",
              },
              {
                name: "Audio Spaces",
                icon: Mic,
                description: "Host live audio conversations and join discussions",
                color: "from-blue-500 to-indigo-500",
              },
              {
                name: "Marketplace",
                icon: ShoppingBag,
                description: "Buy and sell items with integrated secure payments",
                color: "from-emerald-500 to-teal-500",
              },
              {
                name: "Events & Groups",
                icon: Calendar,
                description: "Create events, join communities, and build connections",
                color: "from-orange-500 to-red-500",
              },
              {
                name: "Location Sharing",
                icon: MapPin,
                description: "Share your location and discover nearby friends",
                color: "from-cyan-500 to-blue-500",
              },
              {
                name: "Gaming Platform",
                icon: Gamepad2,
                description: "Play games with friends and compete in challenges",
                color: "from-yellow-500 to-orange-500",
              },
              {
                name: "AR Filters",
                icon: Sparkles,
                description: "Express yourself with augmented reality filters",
                color: "from-pink-500 to-purple-500",
              },
            ].map((feature, index) => (
              <Card key={index} className="glass-effect border-0 hover:scale-105 transition-transform cursor-pointer">
                <CardContent className="p-6">
                  <div
                    className={`h-12 w-12 rounded-lg bg-gradient-to-r ${feature.color} mb-4 flex items-center justify-center`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Comparison */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose SocialSphere?</h2>
            <p className="text-xl text-muted-foreground">All platforms combined with enhanced features</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                {
                  title: "All-in-One Platform",
                  description:
                    "No need to switch between multiple apps. Everything you love about social media in one place.",
                  icon: Globe,
                },
                {
                  title: "Enhanced Privacy",
                  description: "Military-grade encryption and granular privacy controls across all features.",
                  icon: Shield,
                },
                {
                  title: "Better Monetization",
                  description: "More ways for creators to earn money with integrated marketplace and premium features.",
                  icon: TrendingUp,
                },
                {
                  title: "Unified Experience",
                  description: "Seamless integration between all features with a consistent, beautiful interface.",
                  icon: Zap,
                },
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <Card className="glass-effect border-0 p-8">
                <div className="text-center">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { name: "Instagram", color: "from-purple-500 to-pink-500", features: 8 },
                      { name: "WhatsApp", color: "from-green-500 to-emerald-500", features: 6 },
                      { name: "Twitter", color: "from-blue-500 to-cyan-500", features: 7 },
                      { name: "Facebook", color: "from-blue-600 to-indigo-600", features: 9 },
                      { name: "Snapchat", color: "from-yellow-400 to-orange-500", features: 6 },
                      { name: "SocialSphere", color: "gradient-bg", features: 50 },
                    ].map((platform, index) => (
                      <div key={index} className={`p-4 rounded-lg ${index === 5 ? "col-span-2 pulse-glow" : ""}`}>
                        <div className={`h-8 w-8 rounded-full bg-gradient-to-r ${platform.color} mx-auto mb-2`}></div>
                        <div className="font-semibold">{platform.name}</div>
                        <div className="text-sm text-muted-foreground">{platform.features} features</div>
                      </div>
                    ))}
                  </div>
                  <Badge className="gradient-bg text-white border-0">
                    <Star className="h-4 w-4 mr-2" />
                    50+ Features Combined
                  </Badge>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Card className="glass-effect border-0 p-12 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Ready to Experience the Future of Social Media?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join millions of users who have already discovered the power of having all social features in one
              platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="gradient-bg text-white border-0 px-8 py-4 text-lg hover:scale-105 transition-transform"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Try All Features Now
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg hover:scale-105 transition-transform">
                  Create Free Account
                </Button>
              </Link>
            </div>

            <div className="flex justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Free to use
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                No ads
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                End-to-end encryption
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                All features included
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              SocialSphere
            </h3>
            <p className="text-muted-foreground mb-6">
              The ultimate social media platform combining the best features from Instagram, WhatsApp, Twitter,
              Facebook, and Snapchat.
            </p>
            <div className="flex justify-center gap-6 text-sm text-muted-foreground">
              <span>© 2024 SocialSphere</span>
              <span>•</span>
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
