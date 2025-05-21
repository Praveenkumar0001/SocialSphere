import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Smile, Sparkles, Gamepad, Clock, Camera, Music, Gift, Heart, ArrowRight } from "lucide-react"

export default function FunAddonsPage() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="text-center mb-16">
        <div className="inline-block p-2 bg-amber-100 text-amber-600 rounded-lg mb-4">
          <Smile className="h-6 w-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Fun & Add-ons</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          AR filters, games, memories, and other fun features to enhance your social experience.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Add More Fun to Your Experience</h2>
          <p className="text-lg text-gray-600 mb-6">
            Social media isn't just about connecting—it's about having fun! Our platform includes a variety of
            entertaining features to make your experience more enjoyable and creative.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            From AR filters and effects to mini-games and interactive features, we've packed SocialSphere with fun
            add-ons that bring joy and creativity to your social experience.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mt-1">
                <Camera className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold">AR Filters & Effects</h3>
                <p className="text-gray-600">
                  Enhance your photos and videos with augmented reality filters and effects.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mt-1">
                <Gamepad className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold">Mini-Games</h3>
                <p className="text-gray-600">Play games with friends directly within the app, no downloads required.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mt-1">
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold">Memories</h3>
                <p className="text-gray-600">
                  Rediscover past moments with our Memories feature that resurfaces your old posts.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-lg">Fun Features</h3>
            </div>

            <div className="p-4">
              <h4 className="font-medium mb-3">AR Filters</h4>
              <div className="grid grid-cols-4 gap-3 mb-6">
                {[1, 2, 3, 4].map((filter) => (
                  <div key={filter} className="relative cursor-pointer group">
                    <div className="h-20 bg-amber-50 rounded-lg overflow-hidden flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-amber-300" />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg flex items-center justify-center transition-all">
                      <div className="opacity-0 group-hover:opacity-100">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white text-amber-600 border-amber-200 hover:bg-amber-50"
                        >
                          Try
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-center mt-1">
                      {filter === 1
                        ? "Party Mode"
                        : filter === 2
                          ? "Animal Ears"
                          : filter === 3
                            ? "Neon Glow"
                            : "Vintage"}
                    </p>
                  </div>
                ))}
              </div>

              <h4 className="font-medium mb-3">Mini-Games</h4>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[1, 2].map((game) => (
                  <div key={game} className="border border-gray-100 rounded-lg overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center">
                      <Gamepad className="h-12 w-12 text-white" />
                    </div>
                    <div className="p-3">
                      <p className="font-medium">{game === 1 ? "Word Challenge" : "Basketball Toss"}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <Gamepad className="h-3 w-3 mr-1" />
                          <span>{game === 1 ? "2.5M plays" : "4.1M plays"}</span>
                        </div>
                        <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                          Play
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h4 className="font-medium mb-3">Memories</h4>
              <div className="border border-gray-100 rounded-lg p-4 bg-gradient-to-r from-amber-50 to-orange-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium">On This Day</p>
                    <p className="text-sm text-gray-500">3 years ago</p>
                  </div>
                </div>
                <div className="h-40 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <Camera className="h-8 w-8 text-gray-300" />
                </div>
                <p className="text-sm text-gray-600">"Amazing day at the beach with friends! #throwback #memories"</p>
                <div className="flex justify-between mt-3">
                  <Button variant="ghost" size="sm" className="text-amber-600 hover:bg-amber-50">
                    <Heart className="h-4 w-4 mr-1" /> Like
                  </Button>
                  <Button variant="ghost" size="sm" className="text-amber-600 hover:bg-amber-50">
                    <Gift className="h-4 w-4 mr-1" /> Reshare
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {[
          {
            title: "AR Filters & Effects",
            description: "Enhance your photos and videos with augmented reality filters and effects.",
            icon: Camera,
          },
          {
            title: "Mini-Games",
            description: "Play games with friends directly within the app, no downloads required.",
            icon: Gamepad,
          },
          {
            title: "Memories",
            description: "Rediscover past moments with our Memories feature that resurfaces your old posts.",
            icon: Clock,
          },
          {
            title: "Stickers & GIFs",
            description: "Express yourself with a vast library of stickers and GIFs in your posts and messages.",
            icon: Smile,
          },
          {
            title: "Music Integration",
            description: "Add your favorite songs to your posts, stories, and profile.",
            icon: Music,
          },
          {
            title: "Special Effects",
            description: "Add special effects to your posts for birthdays, achievements, and other celebrations.",
            icon: Sparkles,
          },
          {
            title: "Virtual Gifts",
            description: "Send virtual gifts to friends to show appreciation and celebrate special occasions.",
            icon: Gift,
          },
          {
            title: "Reactions",
            description: "Express yourself with a variety of reactions beyond the standard like button.",
            icon: Heart,
          },
        ].map((feature, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
              {feature.icon && <feature.icon className="h-6 w-6 text-amber-600" />}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to have more fun?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join SocialSphere and discover all the fun features that make social media enjoyable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-amber-700 hover:bg-gray-100 w-full sm:w-auto">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
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
