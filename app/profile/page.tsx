import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Calendar,
  LinkIcon,
  MapPin,
  MoreHorizontal,
  Settings,
  Bookmark,
  Heart,
  MessageCircle,
  Repeat,
  Share,
  ImageIcon,
} from "lucide-react"

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center gap-6 p-4">
          <Link href="/dashboard" className="text-gray-800">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-bold text-xl">John Smith</h1>
            <p className="text-gray-500 text-sm">1,242 posts</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto bg-white border-x border-gray-200 min-h-screen pb-20">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-500 relative">
          <div className="absolute -bottom-16 left-4">
            <div className="h-32 w-32 rounded-full border-4 border-white bg-white">
              <div className="h-full w-full rounded-full bg-gray-200 flex items-center justify-center">
                <span className="font-bold text-2xl text-gray-600">JS</span>
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm">
              <Settings className="h-4 w-4 mr-2" />
              Edit profile
            </Button>
            <Button variant="outline" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-20 px-4">
          <div className="mb-4">
            <h2 className="font-bold text-xl">John Smith</h2>
            <p className="text-gray-500">@johnsmith</p>
            <p className="mt-2">
              Digital creator, photographer, and tech enthusiast. Sharing my journey and connecting with like-minded
              people.
            </p>

            <div className="flex flex-wrap gap-4 mt-3 text-gray-500 text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-1">
                <LinkIcon className="h-4 w-4" />
                <a href="#" className="text-purple-600">
                  johnsmith.com
                </a>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Joined June 2018</span>
              </div>
            </div>

            <div className="flex gap-4 mt-3">
              <div>
                <span className="font-bold">1,248</span> <span className="text-gray-500">Following</span>
              </div>
              <div>
                <span className="font-bold">8,642</span> <span className="text-gray-500">Followers</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger
                value="posts"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600"
              >
                Posts
              </TabsTrigger>
              <TabsTrigger
                value="media"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600"
              >
                Media
              </TabsTrigger>
              <TabsTrigger
                value="likes"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600"
              >
                Likes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-0">
              {[1, 2, 3, 4].map((post) => (
                <div key={post} className="py-4 border-b border-gray-200">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                      <span className="font-medium text-gray-600">JS</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="font-semibold">John Smith</p>
                        <p className="text-gray-500">@johnsmith</p>
                        <span className="text-gray-500">·</span>
                        <p className="text-gray-500">{post}d</p>
                      </div>
                      <p className="mt-1">
                        {post % 2 === 0
                          ? "Working on some exciting new features for my latest project. Stay tuned for updates! #coding #developer"
                          : "Just got back from an amazing photography trip. Can't wait to share the shots with everyone! 📸 #photography #travel"}
                      </p>
                      {post % 2 === 1 && (
                        <div className="mt-3 rounded-xl overflow-hidden bg-gray-100 h-48 flex items-center justify-center text-gray-400">
                          <ImageIcon className="h-8 w-8" />
                          <span className="ml-2">Post Image</span>
                        </div>
                      )}
                      <div className="flex justify-between mt-3 text-gray-500">
                        <button className="flex items-center gap-1 hover:text-purple-600">
                          <MessageCircle className="h-4 w-4" />
                          <span>{Math.floor(Math.random() * 50)}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-green-600">
                          <Repeat className="h-4 w-4" />
                          <span>{Math.floor(Math.random() * 100)}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-red-600">
                          <Heart className="h-4 w-4" />
                          <span>{Math.floor(Math.random() * 500)}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-purple-600">
                          <Bookmark className="h-4 w-4" />
                        </button>
                        <button className="flex items-center gap-1 hover:text-purple-600">
                          <Share className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="media" className="mt-0">
              <div className="grid grid-cols-3 gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <div key={item} className="aspect-square bg-gray-100 flex items-center justify-center text-gray-400">
                    <ImageIcon className="h-8 w-8" />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="likes" className="mt-0">
              <div className="py-8 text-center text-gray-500">
                <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-1">No likes yet</h3>
                <p>When you like posts, they'll show up here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 md:hidden">
        <Link href="/dashboard" className="flex flex-col items-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/explore" className="flex flex-col items-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="text-xs mt-1">Explore</span>
        </Link>
        <Link href="/create" className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white -mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </Link>
        <Link href="/notifications" className="flex flex-col items-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="text-xs mt-1">Alerts</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-purple-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </nav>
    </div>
  )
}
