import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ImageIcon, Clock, Smile, MessageCircle, Music, Heart, Lock, Bookmark, ArrowRight } from "lucide-react"

export default function StoriesStatusPage() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="text-center mb-16">
        <div className="inline-block p-2 bg-pink-100 text-pink-600 rounded-lg mb-4">
          <ImageIcon className="h-6 w-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Stories & Status Features</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Share ephemeral content that disappears after 24 hours with interactive elements.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Capture the Moment</h2>
          <p className="text-lg text-gray-600 mb-6">
            Stories let you share moments of your day that disappear after 24 hours. Perfect for casual, in-the-moment
            updates without cluttering your profile.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Add interactive elements like polls, questions, music, and more to engage your audience in new ways.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center mt-1">
                <Clock className="h-4 w-4 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold">Ephemeral Content</h3>
                <p className="text-gray-600">
                  Share content that disappears after 24 hours for a more casual experience.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center mt-1">
                <MessageCircle className="h-4 w-4 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold">Interactive Elements</h3>
                <p className="text-gray-600">
                  Add polls, questions, and other interactive features to engage your audience.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center mt-1">
                <Bookmark className="h-4 w-4 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold">Highlights</h3>
                <p className="text-gray-600">Save your favorite stories to your profile as permanent highlights.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex gap-4 overflow-x-auto pb-4 mb-6">
              {[1, 2, 3, 4, 5, 6].map((story) => (
                <div key={story} className="flex-shrink-0">
                  <div
                    className={`h-16 w-16 rounded-full p-0.5 bg-gradient-to-br ${
                      story === 1 ? "from-pink-500 to-purple-500" : "from-gray-200 to-gray-300"
                    }`}
                  >
                    <div className="h-full w-full rounded-full bg-white flex items-center justify-center p-0.5">
                      <div
                        className={`h-full w-full rounded-full bg-gradient-to-r ${
                          story === 1
                            ? "from-blue-400 to-blue-500"
                            : story === 2
                              ? "from-green-400 to-green-500"
                              : story === 3
                                ? "from-amber-400 to-amber-500"
                                : story === 4
                                  ? "from-red-400 to-red-500"
                                  : story === 5
                                    ? "from-purple-400 to-purple-500"
                                    : "from-teal-400 to-teal-500"
                        } flex items-center justify-center`}
                      >
                        <span className="text-white font-bold text-xs">
                          {story === 1
                            ? "You"
                            : story === 2
                              ? "A"
                              : story === 3
                                ? "B"
                                : story === 4
                                  ? "C"
                                  : story === 5
                                    ? "D"
                                    : "E"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-center mt-1 text-gray-700">
                    {story === 1
                      ? "Your story"
                      : story === 2
                        ? "Alex"
                        : story === 3
                          ? "Bella"
                          : story === 4
                            ? "Carlos"
                            : story === 5
                              ? "Diana"
                              : "Eric"}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl h-96 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center">
                  <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-75" />
                  <p className="text-xl font-bold">Story Preview</p>
                  <p className="opacity-75">Interactive stories with filters, music, and more</p>
                </div>
              </div>
              <div className="absolute top-4 left-0 right-0 flex justify-between px-4">
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((segment) => (
                    <div key={segment} className="h-1 bg-white bg-opacity-50 rounded-full w-16">
                      {segment === 1 && <div className="h-full w-3/4 bg-white rounded-full"></div>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-6 left-0 right-0 px-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                      <span className="text-pink-600 font-bold">A</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Alex Johnson</p>
                      <p className="text-white text-opacity-75 text-xs">2h ago</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Heart className="h-6 w-6 text-white" />
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {[
          {
            title: "24-hour Stories",
            description: "Share moments that disappear after 24 hours like Instagram and Snapchat.",
            icon: Clock,
          },
          {
            title: "Stickers & GIFs",
            description: "Add fun stickers and GIFs to make your stories more engaging.",
            icon: Smile,
          },
          {
            title: "Polls & Questions",
            description: "Engage your audience with interactive polls and question stickers.",
            icon: MessageCircle,
          },
          {
            title: "Music Integration",
            description: "Add your favorite songs to stories to set the perfect mood.",
            icon: Music,
          },
          {
            title: "Countdowns",
            description: "Create excitement for upcoming events with countdown stickers.",
            icon: Clock,
          },
          {
            title: "Story Reactions",
            description: "Allow viewers to react to your stories with quick emoji responses.",
            icon: Heart,
          },
          {
            title: "Private Stories",
            description: "Share stories with select groups of friends for more private moments.",
            icon: Lock,
          },
          {
            title: "Highlights",
            description: "Save your favorite stories as permanent collections on your profile.",
            icon: Bookmark,
          },
        ].map((feature, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center mb-4">
              {feature.icon && <feature.icon className="h-6 w-6 text-pink-600" />}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to share your stories?</h2>
          <p className="text-xl opacity-90 mb-8">Join millions of users sharing their daily moments on SocialSphere.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-pink-700 hover:bg-gray-100 w-full sm:w-auto">
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
