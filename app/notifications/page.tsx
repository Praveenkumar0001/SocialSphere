"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AuthCheck from "@/app/components/auth-check"

export default function Notifications() {
  return (
    <AuthCheck>
      <div className="min-h-screen bg-white">
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4 flex items-center">
          <Link href="/dashboard" className="md:hidden mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold">Notifications</h1>
        </header>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-2 sticky top-[57px] bg-white z-10">
            <TabsTrigger
              value="all"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="mentions"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600"
            >
              Mentions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="divide-y divide-gray-100">
              {[1, 2, 3, 4, 5].map((notification) => (
                <div key={notification} className="p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                      <span className="font-medium text-gray-600">
                        {notification % 3 === 0 ? "AS" : notification % 3 === 1 ? "JD" : "MK"}
                      </span>
                    </div>
                    <div>
                      <p>
                        <span className="font-semibold">
                          {notification % 3 === 0 ? "Alex Smith" : notification % 3 === 1 ? "Jane Doe" : "Mike Kim"}
                        </span>{" "}
                        {notification % 4 === 0
                          ? "liked your post"
                          : notification % 4 === 1
                            ? "commented on your post"
                            : notification % 4 === 2
                              ? "started following you"
                              : "mentioned you in a comment"}
                      </p>
                      <p className="text-sm text-gray-500">{notification % 2 === 0 ? "2 hours ago" : "Yesterday"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mentions" className="mt-0">
            <div className="divide-y divide-gray-100">
              {[1, 3].map((notification) => (
                <div key={notification} className="p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                      <span className="font-medium text-gray-600">{notification % 3 === 0 ? "AS" : "JD"}</span>
                    </div>
                    <div>
                      <p>
                        <span className="font-semibold">{notification % 3 === 0 ? "Alex Smith" : "Jane Doe"}</span>{" "}
                        mentioned you in a comment
                      </p>
                      <p className="text-sm text-gray-500">{notification % 2 === 0 ? "2 hours ago" : "Yesterday"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AuthCheck>
  )
}
