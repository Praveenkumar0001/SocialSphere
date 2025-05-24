"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart2, Calendar, Video, MessageCircle, Settings, Menu, ShoppingBag } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface FeatureLink {
  name: string
  href: string
  icon: React.ElementType
  description?: string
  isNew?: boolean
}

export function FeatureNavigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const features: FeatureLink[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: BarChart2,
      description: "Your personalized feed and activity",
    },
    {
      name: "Marketplace",
      href: "/marketplace",
      icon: ShoppingBag,
      description: "Buy and sell items with your community",
      isNew: true,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart2,
      description: "Track your social media performance",
      isNew: true,
    },
    {
      name: "Video Call",
      href: "/video-call",
      icon: Video,
      description: "Connect with friends through video",
      isNew: true,
    },
    {
      name: "Messages",
      href: "/messages",
      icon: MessageCircle,
      description: "Chat with your connections",
    },
    {
      name: "Content Calendar",
      href: "/content-calendar",
      icon: Calendar,
      description: "Schedule and manage your posts",
      isNew: true,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      description: "Manage your account preferences",
    },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <nav className="space-y-1">
          {features.map((feature) => {
            const isActive = pathname === feature.href

            return (
              <Link key={feature.name} href={feature.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start ${isActive ? "" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                >
                  <feature.icon className="mr-2 h-5 w-5" />
                  <span>{feature.name}</span>
                  {feature.isNew && (
                    <span className="ml-auto bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                      New
                    </span>
                  )}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>SocialSphere</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 space-y-1">
              {features.map((feature) => {
                const isActive = pathname === feature.href

                return (
                  <Link key={feature.name} href={feature.href} className="block">
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start ${isActive ? "" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                    >
                      <feature.icon className="mr-2 h-5 w-5" />
                      <span>{feature.name}</span>
                      {feature.isNew && (
                        <span className="ml-auto bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                          New
                        </span>
                      )}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
