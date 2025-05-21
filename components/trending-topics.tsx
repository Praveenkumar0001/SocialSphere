"use client"

import { useState } from "react"
import Link from "next/link"
import { TrendingUp, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { TrendingTopic } from "@/lib/types"

interface TrendingTopicsProps {
  topics: TrendingTopic[]
}

export function TrendingTopics({ topics }: TrendingTopicsProps) {
  const [category, setCategory] = useState<string | null>(null)

  // Get unique categories
  const categories = Array.from(new Set(topics.map((topic) => topic.category || "General")))

  // Filter topics by category
  const filteredTopics = category ? topics.filter((topic) => (topic.category || "General") === category) : topics

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Trending Topics</h2>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/explore?tab=trending">
            See all
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-4">
          <TabsTrigger value="all" onClick={() => setCategory(null)}>
            All
          </TabsTrigger>
          {categories.slice(0, 3).map((cat) => (
            <TabsTrigger key={cat} value={cat} onClick={() => setCategory(cat)}>
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="space-y-3">
            {filteredTopics.slice(0, 5).map((topic) => (
              <Link
                key={topic.id}
                href={`/explore?tag=${topic.name.replace("#", "")}`}
                className="flex items-start hover:bg-muted p-2 rounded-md transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium">{topic.name}</p>
                  <p className="text-sm text-muted-foreground">{topic.count.toLocaleString()} posts</p>
                </div>
                <span className="text-xs text-muted-foreground">{topic.category || "General"}</span>
              </Link>
            ))}
          </div>
        </TabsContent>

        {categories.map((cat) => (
          <TabsContent key={cat} value={cat} className="mt-0">
            <div className="space-y-3">
              {topics
                .filter((topic) => (topic.category || "General") === cat)
                .slice(0, 5)
                .map((topic) => (
                  <Link
                    key={topic.id}
                    href={`/explore?tag=${topic.name.replace("#", "")}`}
                    className="flex items-start hover:bg-muted p-2 rounded-md transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{topic.name}</p>
                      <p className="text-sm text-muted-foreground">{topic.count.toLocaleString()} posts</p>
                    </div>
                  </Link>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
