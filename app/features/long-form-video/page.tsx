import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tv, Play, Clock, BarChart2, MessageCircle, Heart, Share2, Bookmark, ArrowRight } from "lucide-react"

export default function LongFormVideoPage() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="text-center mb-16">
        <div className="inline-block p-2 bg-orange-100 text-orange-600 rounded-lg mb-4">
          <Tv className="h-6 w-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Long-form Video</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Create, share, and discover longer videos and livestreams with our YouTube-style platform.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Express Yourself in Depth</h2>
          <p className="text-lg text-gray-600 mb-6">
            When short-form content isn't enough, our long-form video platform gives you the space to create in-depth
            content like tutorials, vlogs, documentaries, and more.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            With features like chapters, playlists, and monetization options, you can build a dedicated audience and
            even earn from your content—all within the same platform as your other social media activities.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mt-1">
                <Tv className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">High-Quality Videos</h3>
                <p className="text-gray-600">Upload and stream videos in HD and 4K quality with no time limits.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mt-1">
                <Play className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Live Streaming</h3>
                <p className="text-gray-600">
                  Broadcast live to your audience with real-time comments and interactions.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mt-1">
                <BarChart2 className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Creator Tools</h3>
                <p className="text-gray-600">
                  Access analytics, monetization options, and audience insights for your videos.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="aspect-video bg-black relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <Tv className="h-16 w-16 mx-auto mb-4 opacity-75" />
                  <p className="text-xl font-bold">Video Player</p>
                  <p className="opacity-75 mb-6">Watch high-quality videos and livestreams</p>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:bg-opacity-10">
                    <Play className="mr-2 h-4 w-4" /> Play Video
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center">
                  <span className="text-white font-bold">JS</span>
                </div>
                <div>
                  <p className="font-semibold">John Smith</p>
                  <p className="text-xs text-gray-500">1.2M subscribers</p>
                </div>
                <Button className="ml-auto bg-orange-600 hover:bg-orange-700 text-white">Subscribe</Button>
              </div>

              <h3 className="font-bold text-lg mb-2">How I Built My Dream Home Office Setup</h3>
              <p className="text-gray-600 text-sm mb-4">
                In this video, I walk through my entire process of designing and building my ultimate home office setup
                for productivity and comfort.
              </p>

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="mr-4">245K views</span>
                <span className="mr-4">2 weeks ago</span>
                <span>15:42</span>
              </div>

              <div className="flex justify-between border-t border-b border-gray-100 py-3">
                <button className="flex items-center gap-1 hover:text-orange-600">
                  <Heart className="h-5 w-5" />
                  <span>24K</span>
                </button>
                <button className="flex items-center gap-1 hover:text-orange-600">
                  <MessageCircle className="h-5 w-5" />
                  <span>1.2K</span>
                </button>
                <button className="flex items-center gap-1 hover:text-orange-600">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
                <button className="flex items-center gap-1 hover:text-orange-600">
                  <Bookmark className="h-5 w-5" />
                  <span>Save</span>
                </button>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2">Up Next</h4>
                <div className="space-y-3">
                  {[1, 2].map((video) => (
                    <div key={video} className="flex gap-3">
                      <div className="w-32 h-20 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                        <Play className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm line-clamp-2">
                          {video === 1
                            ? "10 Productivity Tips for Remote Workers"
                            : "Budget-Friendly Office Upgrades That Make a Difference"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">John Smith</p>
                        <p className="text-xs text-gray-500">
                          {video === 1 ? "189K views • 1 month ago" : "78K views • 3 weeks ago"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {[
          {
            title: "HD & 4K Video",
            description: "Upload and watch high-quality videos with no time limits.",
            icon: Tv,
          },
          {
            title: "Live Streaming",
            description: "Broadcast live to your audience with real-time comments and interactions.",
            icon: Play,
          },
          {
            title: "Video Chapters",
            description: "Add chapters to your videos to help viewers navigate longer content.",
            icon: Clock,
          },
          {
            title: "Analytics",
            description: "Track performance with detailed analytics on views, watch time, and audience.",
            icon: BarChart2,
          },
          {
            title: "Comments & Community",
            description: "Build a community around your videos with comments and discussions.",
            icon: MessageCircle,
          },
          {
            title: "Playlists",
            description: "Organize your videos into playlists for better viewer experience.",
            icon: Bookmark,
          },
          {
            title: "Monetization",
            description: "Earn from your content through ads, memberships, and direct support.",
            icon: Heart,
          },
          {
            title: "Cross-Platform Sharing",
            description: "Easily share your videos across other social platforms and websites.",
            icon: Share2,
          },
        ].map((feature, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
              {feature.icon && <feature.icon className="h-6 w-6 text-orange-600" />}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to create longer videos?</h2>
          <p className="text-xl opacity-90 mb-8">
            Share your knowledge, stories, and creativity with in-depth video content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-orange-700 hover:bg-gray-100 w-full sm:w-auto">
                Start Creating <ArrowRight className="ml-2 h-5 w-5" />
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
