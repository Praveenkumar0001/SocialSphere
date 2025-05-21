import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Video, Smartphone, Sparkles, Camera, Music, Repeat, Hash, MessageCircle, ArrowRight, Play } from "lucide-react"

export default function ReelsVideosPage() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="text-center mb-16">
        <div className="inline-block p-2 bg-red-100 text-red-600 rounded-lg mb-4">
          <Video className="h-6 w-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Reels & Short Videos</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Create and discover short-form vertical videos with our TikTok-style video platform.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Go Viral with Short Videos</h2>
          <p className="text-lg text-gray-600 mb-6">
            Reels are short, entertaining videos where you can express your creativity and reach a wider audience. With
            advanced editing tools, effects, and music, you can create engaging content in seconds.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Our AI-powered recommendation system helps your content reach the right audience, increasing your chances of
            going viral.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-1">
                <Camera className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold">Easy Creation</h3>
                <p className="text-gray-600">
                  Create engaging short videos with our suite of editing tools and effects.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-1">
                <Sparkles className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold">AI-Powered Discovery</h3>
                <p className="text-gray-600">
                  Our algorithm helps your content reach the right audience based on interests.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-1">
                <Music className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold">Licensed Music</h3>
                <p className="text-gray-600">Add popular songs to your videos from our extensive music library.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="bg-black rounded-xl shadow-lg overflow-hidden relative h-[600px] w-full max-w-[300px] mx-auto">
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <Video className="h-16 w-16 mx-auto mb-4 opacity-75" />
                <p className="text-xl font-bold">Reels Preview</p>
                <p className="opacity-75 mb-6">Short vertical videos with music and effects</p>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:bg-opacity-10">
                  <Play className="mr-2 h-4 w-4" /> Watch Reels
                </Button>
              </div>
            </div>
            <div className="absolute right-4 bottom-20 flex flex-col items-center gap-6">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <span className="text-white text-xs">24.5K</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mb-1">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <span className="text-white text-xs">1.2K</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </div>
                <span className="text-white text-xs">Share</span>
              </div>
            </div>
            <div className="absolute bottom-6 left-4 text-white">
              <div>
                <p className="font-medium">@dancerextraordinaire</p>
                <p className="text-white text-opacity-75 text-sm mb-2">Check out this new dance trend! #dance #viral</p>
                <div className="flex items-center">
                  <Music className="h-4 w-4 mr-2" />
                  <p className="text-white text-opacity-75 text-xs">Original Sound - DJ Awesome</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {[
          {
            title: "Vertical Video Feed",
            description: "Swipe through an endless feed of short vertical videos tailored to your interests.",
            icon: Smartphone,
          },
          {
            title: "AI-Powered For You",
            description: "Discover content you'll love with our advanced recommendation algorithm.",
            icon: Sparkles,
          },
          {
            title: "Video Creation Tools",
            description: "Create engaging short videos with our suite of editing tools and effects.",
            icon: Camera,
          },
          {
            title: "Licensed Music",
            description: "Add popular songs to your videos from our extensive music library.",
            icon: Music,
          },
          {
            title: "Duets & Stitches",
            description: "Collaborate with other creators by duetting or stitching their videos.",
            icon: Repeat,
          },
          {
            title: "Trending Hashtags",
            description: "Join viral challenges and trends with popular hashtags.",
            icon: Hash,
          },
          {
            title: "Video Responses",
            description: "Reply to comments with video responses to engage with your audience.",
            icon: MessageCircle,
          },
          {
            title: "Effects & Filters",
            description: "Enhance your videos with a wide range of visual effects and filters.",
            icon: Sparkles,
          },
        ].map((feature, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              {feature.icon && <feature.icon className="h-6 w-6 text-red-600" />}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to create viral videos?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join millions of creators sharing short-form videos on SocialSphere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-red-700 hover:bg-gray-100 w-full sm:w-auto">
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
