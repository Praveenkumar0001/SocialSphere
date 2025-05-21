import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Compass, Hash, Layers, Users, Search, Sparkles, ArrowRight } from "lucide-react"

export default function DiscoveryPage() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="text-center mb-16">
        <div className="inline-block p-2 bg-indigo-100 text-indigo-600 rounded-lg mb-4">
          <Compass className="h-6 w-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Discovery & Explore</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find new content, creators, and trends with our powerful discovery features.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Discover What You Love</h2>
          <p className="text-lg text-gray-600 mb-6">
            Our discovery features help you find content and creators that match your interests. Whether you're looking
            for new music, art, fashion, or technology, our AI-powered recommendation system has you covered.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Stay up-to-date with trending topics, hashtags, and challenges across the platform, all personalized to your
            preferences.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mt-1">
                <Sparkles className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold">Personalized For You</h3>
                <p className="text-gray-600">AI-curated content based on your interests and behavior.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mt-1">
                <Hash className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold">Trending Topics</h3>
                <p className="text-gray-600">See what's popular right now across the platform.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mt-1">
                <Users className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold">Creator Discovery</h3>
                <p className="text-gray-600">Find new creators and influencers that match your interests.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for content, people, or topics..."
                  className="w-full bg-gray-100 rounded-full py-3 pl-10 pr-4 focus:outline-none"
                />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-4">Trending Topics</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((trend) => (
                  <div key={trend} className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">
                      Trending{" "}
                      {trend === 1
                        ? "in Technology"
                        : trend === 2
                          ? "in Sports"
                          : trend === 3
                            ? "in Music"
                            : "in Business"}
                    </p>
                    <p className="font-semibold">
                      #{trend === 1 ? "AI" : trend === 2 ? "Olympics" : trend === 3 ? "NewMusic" : "Entrepreneurship"}
                    </p>
                    <p className="text-xs text-gray-500">{Math.floor(Math.random() * 100)}K posts</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-gray-100">
              <h3 className="font-bold text-lg mb-4">Suggested For You</h3>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-gray-100 rounded-lg p-3 hover:bg-gray-200 cursor-pointer">
                    <div className="h-24 bg-indigo-100 rounded-lg mb-2 flex items-center justify-center">
                      <Layers className="h-8 w-8 text-indigo-300" />
                    </div>
                    <p className="font-medium truncate">
                      {item === 1
                        ? "Digital Art Trends"
                        : item === 2
                          ? "Cooking Tutorials"
                          : item === 3
                            ? "Travel Photography"
                            : "Fitness Tips"}
                    </p>
                    <p className="text-xs text-gray-500">Based on your interests</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {[
          {
            title: "Explore Feed",
            description: "Discover new content curated by AI based on your interests.",
            icon: Compass,
          },
          {
            title: "Trending Topics",
            description: "See what's trending in real-time across the platform.",
            icon: Hash,
          },
          {
            title: "Content Categories",
            description: "Browse content by categories like Reels, Stories, News, and more.",
            icon: Layers,
          },
          {
            title: "Creator Discovery",
            description: "Find new creators, influencers, and businesses to follow.",
            icon: Users,
          },
          {
            title: "Search",
            description: "Find exactly what you're looking for with our powerful search feature.",
            icon: Search,
          },
          {
            title: "Personalized Recommendations",
            description: "Get content recommendations tailored to your preferences and behavior.",
            icon: Sparkles,
          },
        ].map((feature, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
              {feature.icon && <feature.icon className="h-6 w-6 text-indigo-600" />}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to explore?</h2>
          <p className="text-xl opacity-90 mb-8">
            Discover content and creators that match your interests on SocialSphere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 w-full sm:w-auto">
                Start Exploring <ArrowRight className="ml-2 h-5 w-5" />
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
