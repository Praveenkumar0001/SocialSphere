"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Compass, Users, ImageIcon, Video } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AuthCheck from "@/app/components/auth-check"
import { TrendingUpIcon as TrendingIcon } from "lucide-react"

// Custom Trending icon
function Trending(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <AuthCheck>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="md:hidden">
              <ArrowLeft className="h-5 w-5 dark:text-gray-300" />
            </Link>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search SocialSphere"
                className="pl-9 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        <Tabs defaultValue="for-you" className="w-full">
          <TabsList className="w-full grid grid-cols-4 sticky top-[73px] bg-white dark:bg-gray-900 z-10">
            <TabsTrigger
              value="for-you"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600"
            >
              <Compass className="h-4 w-4 mr-2" />
              For You
            </TabsTrigger>
            <TabsTrigger
              value="trending"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600"
            >
              <TrendingIcon className="h-4 w-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger
              value="people"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600"
            >
              <Users className="h-4 w-4 mr-2" />
              People
            </TabsTrigger>
            <TabsTrigger
              value="media"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Media
            </TabsTrigger>
          </TabsList>

          <TabsContent value="for-you" className="mt-0 p-4">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="border border-gray-100 dark:border-gray-800 rounded-lg overflow-hidden">
                  <div className="h-32 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    {item % 2 === 0 ? (
                      <ImageIcon className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                    ) : (
                      <Video className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                    )}
                  </div>
                  <div className="p-3 dark:bg-gray-800">
                    <p className="font-medium text-sm line-clamp-2 dark:text-white">
                      {item % 3 === 0
                        ? "Amazing travel destinations you need to visit this year"
                        : item % 3 === 1
                          ? "Top tech trends to watch in 2023"
                          : "Delicious recipes for your next dinner party"}
                    </p>
                    <div className="flex items-center mt-2">
                      <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center">
                        <span className="font-medium text-gray-600 dark:text-gray-300 text-xs">
                          {item % 3 === 0 ? "AS" : item % 3 === 1 ? "JD" : "MK"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        {item % 3 === 0 ? "Alex Smith" : item % 3 === 1 ? "Jane Doe" : "Mike Kim"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="mt-0">
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {[1, 2, 3, 4, 5].map((trend) => (
                <div key={trend} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Trending{" "}
                    {trend === 1
                      ? "in Technology"
                      : trend === 2
                        ? "in Sports"
                        : trend === 3
                          ? "in Music"
                          : trend === 4
                            ? "in Business"
                            : "in Entertainment"}
                  </p>
                  <p className="font-semibold dark:text-white">
                    #
                    {trend === 1
                      ? "AI"
                      : trend === 2
                        ? "Olympics"
                        : trend === 3
                          ? "NewMusic"
                          : trend === 4
                            ? "Entrepreneurship"
                            : "Movies"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{Math.floor(Math.random() * 100)}K posts</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="people" className="mt-0">
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {[1, 2, 3, 4, 5].map((person) => (
                <div key={person} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center">
                      <span className="font-medium text-gray-600 dark:text-gray-300">
                        {person === 1 ? "TS" : person === 2 ? "MJ" : person === 3 ? "RK" : person === 4 ? "JB" : "AR"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium dark:text-white">
                        {person === 1
                          ? "Taylor Swift"
                          : person === 2
                            ? "Michael Jordan"
                            : person === 3
                              ? "Robert Kiyosaki"
                              : person === 4
                                ? "Jeff Bezos"
                                : "Ana Rodriguez"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        @
                        {person === 1
                          ? "taylorswift"
                          : person === 2
                            ? "michaeljordan"
                            : person === 3
                              ? "robertkiyosaki"
                              : person === 4
                                ? "jeffbezos"
                                : "anarodriguez"}
                      </p>
                    </div>
                    <button className="rounded-full border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 px-3 py-1 text-sm font-medium">
                      Follow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="media" className="mt-0">
            <div className="grid grid-cols-3 gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <div key={item} className="aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  {item % 3 === 0 ? (
                    <Video className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AuthCheck>
  )
}
