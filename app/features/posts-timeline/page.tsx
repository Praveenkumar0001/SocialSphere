import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  MessageSquare,
  ImageIcon,
  Hash,
  Heart,
  Layers,
  Share2,
  Clock,
  PenTool,
  Bookmark,
  ArrowRight,
} from "lucide-react"

export default function PostsTimelinePage() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="text-center mb-16">
        <div className="inline-block p-2 bg-purple-100 text-purple-600 rounded-lg mb-4">
          <MessageSquare className="h-6 w-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Posts & Timeline Features</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Share your thoughts, photos, and videos with a rich set of posting options.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Express Yourself</h2>
          <p className="text-lg text-gray-600 mb-6">
            Your timeline is where your story unfolds. Share text posts, photos, videos, and more with your followers
            and friends.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            With features like hashtags, mentions, and rich media support, your posts can reach the right audience and
            make an impact.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-1">
                <MessageSquare className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Rich Content</h3>
                <p className="text-gray-600">Share text, photos, videos, links, and more in a single post.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-1">
                <Heart className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Engagement</h3>
                <p className="text-gray-600">Get likes, comments, and shares on your posts to boost engagement.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-1">
                <Hash className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Discoverability</h3>
                <p className="text-gray-600">Use hashtags and mentions to increase the reach of your posts.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 space-y-6">
          {[1, 2].map((post) => (
            <div key={post} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold">{post === 1 ? "JS" : "AS"}</span>
                </div>
                <div>
                  <p className="font-semibold">{post === 1 ? "John Smith" : "Alex Johnson"}</p>
                  <p className="text-xs text-gray-500">{post === 1 ? "2 hours ago" : "Yesterday"}</p>
                </div>
              </div>
              <p className="mb-4">
                {post === 1
                  ? "Just launched my new portfolio website! Check it out and let me know what you think 🚀 #webdev #portfolio"
                  : "Beautiful day for a hike! Nature always helps me clear my mind and find inspiration. 🌲🏞️ #outdoors #nature"}
              </p>
              {post === 1 && (
                <div className="rounded-lg overflow-hidden mb-4 bg-gray-100 h-48 flex items-center justify-center text-gray-400">
                  <ImageIcon className="h-8 w-8" />
                  <span className="ml-2">Post Image</span>
                </div>
              )}
              <div className="flex justify-between text-gray-500">
                <button className="flex items-center gap-1 hover:text-purple-600">
                  <Heart className="h-5 w-5" />
                  <span>{post === 1 ? "124" : "56"}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-purple-600">
                  <MessageSquare className="h-5 w-5" />
                  <span>{post === 1 ? "32" : "8"}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-purple-600">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
                <button className="flex items-center gap-1 hover:text-purple-600">
                  <Bookmark className="h-5 w-5" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {[
          {
            title: "Text Posts",
            description: "Share your thoughts with text posts similar to Tweets and Threads.",
            icon: MessageSquare,
          },
          {
            title: "Photo/Video Posts",
            description: "Share visual content with filters and editing tools like Instagram.",
            icon: ImageIcon,
          },
          {
            title: "Hashtags & Mentions",
            description: "Tag topics and people to increase discoverability and engagement.",
            icon: Hash,
          },
          {
            title: "Comments & Reactions",
            description: "Engage with posts through comments, likes, and a variety of reactions.",
            icon: Heart,
          },
          {
            title: "Threads",
            description: "Create linked text posts to tell longer stories or share detailed thoughts.",
            icon: Layers,
          },
          {
            title: "Share Options",
            description: "Reshare, quote, or send posts to friends through multiple channels.",
            icon: Share2,
          },
          {
            title: "Post Scheduling",
            description: "Plan your content by scheduling posts for future publication.",
            icon: Clock,
          },
          {
            title: "Drafts",
            description: "Save unfinished posts as drafts to complete and publish later.",
            icon: PenTool,
          },
          {
            title: "Bookmarks",
            description: "Save posts you want to revisit later with our bookmark feature.",
            icon: Bookmark,
          },
        ].map((feature, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              {feature.icon && <feature.icon className="h-6 w-6 text-purple-600" />}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start posting?</h2>
          <p className="text-xl opacity-90 mb-8">Join the conversation and share your story with the world.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 w-full sm:w-auto">
                Create Account <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/features">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
              >
                Explore More Features
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
