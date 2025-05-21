import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Sparkles, Globe, CheckCircle2, ArrowRight } from "lucide-react"

export default function LocationMapsPage() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="text-center mb-16">
        <div className="inline-block p-2 bg-yellow-100 text-yellow-600 rounded-lg mb-4">
          <MapPin className="h-6 w-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Location & Maps</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Share your location and discover what's happening around you.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Connect in the Real World</h2>
          <p className="text-lg text-gray-600 mb-6">
            Our location features help you connect with friends in the real world, discover local events, and share your
            experiences with location tags.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            With our interactive map, you can see where your friends are (if they choose to share), find nearby
            activities, and explore content from specific locations around the world.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center mt-1">
                <MapPin className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold">Interactive Maps</h3>
                <p className="text-gray-600">See where your friends are and discover nearby activities.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center mt-1">
                <Sparkles className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold">Geo-filters</h3>
                <p className="text-gray-600">Access location-specific filters and stickers for your content.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center mt-1">
                <Globe className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold">Location-based Content</h3>
                <p className="text-gray-600">Discover posts and stories from specific locations around the world.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="h-[400px] bg-yellow-50 relative">
              {/* Map Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-yellow-300 mx-auto mb-4" />
                  <p className="text-xl font-bold text-gray-700">Interactive Map</p>
                  <p className="text-gray-500">Find friends and discover nearby activities</p>
                </div>
              </div>

              {/* Friend Markers */}
              <div className="absolute top-1/4 left-1/3">
                <div className="h-10 w-10 rounded-full bg-white p-1 shadow-md">
                  <div className="h-full w-full rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">A</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 right-1/4">
                <div className="h-10 w-10 rounded-full bg-white p-1 shadow-md">
                  <div className="h-full w-full rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">B</span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-1/3 right-1/3">
                <div className="h-10 w-10 rounded-full bg-white p-1 shadow-md">
                  <div className="h-full w-full rounded-full bg-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">C</span>
                  </div>
                </div>
              </div>

              {/* Location Markers */}
              <div className="absolute top-1/3 right-1/5">
                <div className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs shadow-md">Coffee Shop</div>
              </div>

              <div className="absolute bottom-1/4 left-1/4">
                <div className="bg-orange-500 text-white px-2 py-1 rounded-lg text-xs shadow-md">Park</div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-lg mb-4">Nearby Friends</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((friend) => (
                  <div key={friend} className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full bg-gradient-to-r ${
                        friend === 1
                          ? "from-blue-400 to-blue-500"
                          : friend === 2
                            ? "from-green-400 to-green-500"
                            : "from-purple-400 to-purple-500"
                      } flex items-center justify-center`}
                    >
                      <span className="text-white font-bold">{friend === 1 ? "A" : friend === 2 ? "B" : "C"}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        {friend === 1 ? "Alex Johnson" : friend === 2 ? "Bella Smith" : "Carlos Rodriguez"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {friend === 1
                          ? "Coffee Shop • 0.5 miles away"
                          : friend === 2
                            ? "Downtown • 1.2 miles away"
                            : "Park • 0.8 miles away"}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                    >
                      Meet Up
                    </Button>
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
            title: "Interactive Friend Map",
            description: "See where your friends are on an interactive map like Snap Map.",
            icon: MapPin,
          },
          {
            title: "Location Tagging",
            description: "Tag your location in posts and stories to share where you are.",
            icon: MapPin,
          },
          {
            title: "Nearby Friends",
            description: "Discover which friends are close to your current location.",
            icon: Users,
          },
          {
            title: "Geo-filters",
            description: "Access location-specific filters and stickers for your content.",
            icon: Sparkles,
          },
          {
            title: "Location-based Content",
            description: "Discover posts and stories from specific locations around the world.",
            icon: Globe,
          },
          {
            title: "Check-ins",
            description: "Check in at businesses, events, and landmarks to share your experiences.",
            icon: CheckCircle2,
          },
        ].map((feature, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
              {feature.icon && <feature.icon className="h-6 w-6 text-yellow-600" />}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to connect in the real world?</h2>
          <p className="text-xl opacity-90 mb-8">
            Share your location and discover what's happening around you on SocialSphere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-yellow-700 hover:bg-gray-100 w-full sm:w-auto">
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
