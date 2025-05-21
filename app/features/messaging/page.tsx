import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  MessageCircle,
  Users,
  Clock,
  Layers,
  Smile,
  Mic,
  ImageIcon,
  Share2,
  Globe,
  Phone,
  Video,
  ArrowRight,
  Send,
  MoreHorizontal,
  Search,
} from "lucide-react"

export default function MessagingPage() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="text-center mb-16">
        <div className="inline-block p-2 bg-green-100 text-green-600 rounded-lg mb-4">
          <MessageCircle className="h-6 w-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Messaging & Calls</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay connected with friends and groups through our comprehensive messaging system.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Connect Instantly</h2>
          <p className="text-lg text-gray-600 mb-6">
            Our messaging platform brings together the best features from WhatsApp, Messenger, and Telegram to provide a
            seamless communication experience.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            From one-on-one chats to group conversations, voice messages to video calls, we've got all your
            communication needs covered in one place.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                <MessageCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Rich Messaging</h3>
                <p className="text-gray-600">
                  Send text, photos, videos, GIFs, stickers, and more in your conversations.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                <Phone className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Audio & Video Calls</h3>
                <p className="text-gray-600">Make high-quality voice and video calls to anyone in your contacts.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                <Users className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Group Chats</h3>
                <p className="text-gray-600">Create group conversations with roles and admin capabilities.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="flex h-[500px]">
              <div className="w-1/3 border-r border-gray-100">
                <div className="p-4 border-b border-gray-100">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search messages"
                      className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none"
                    />
                  </div>
                </div>
                <div className="overflow-y-auto">
                  {[1, 2, 3, 4, 5].map((chat) => (
                    <div
                      key={chat}
                      className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 ${chat === 1 ? "bg-green-50" : ""}`}
                    >
                      <div
                        className={`h-12 w-12 rounded-full bg-gradient-to-r ${
                          chat === 1
                            ? "from-blue-400 to-blue-500"
                            : chat === 2
                              ? "from-green-400 to-green-500"
                              : chat === 3
                                ? "from-amber-400 to-amber-500"
                                : chat === 4
                                  ? "from-red-400 to-red-500"
                                  : "from-purple-400 to-purple-500"
                        } flex items-center justify-center`}
                      >
                        <span className="text-white font-bold">
                          {chat === 1 ? "A" : chat === 2 ? "B" : chat === 3 ? "C" : chat === 4 ? "D" : "E"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">
                            {chat === 1
                              ? "Alex Johnson"
                              : chat === 2
                                ? "Bella Smith"
                                : chat === 3
                                  ? "Carlos Rodriguez"
                                  : chat === 4
                                    ? "Diana Lee"
                                    : "Eric Williams"}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {chat === 1 ? "2m" : chat === 2 ? "1h" : chat === 3 ? "3h" : chat === 4 ? "1d" : "2d"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {chat === 1
                            ? "Hey, how's it going?"
                            : chat === 2
                              ? "The project looks great!"
                              : chat === 3
                                ? "Are we meeting tomorrow?"
                                : chat === 4
                                  ? "Thanks for your help!"
                                  : "Let me know when you're free"}
                        </p>
                      </div>
                      {chat === 1 && (
                        <div className="h-5 w-5 rounded-full bg-green-600 text-white text-xs flex items-center justify-center">
                          2
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-2/3 flex flex-col">
                <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold">A</span>
                  </div>
                  <div>
                    <p className="font-medium">Alex Johnson</p>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none p-3 max-w-[70%]">
                        <p>Hey, how's it going?</p>
                        <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-green-600 text-white rounded-lg rounded-br-none p-3 max-w-[70%]">
                        <p>Pretty good! Working on that new feature we discussed.</p>
                        <p className="text-xs text-green-200 mt-1">10:32 AM</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none p-3 max-w-[70%]">
                        <p>Awesome! Can't wait to see it.</p>
                        <p className="text-xs text-gray-500 mt-1">10:33 AM</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-green-600 text-white rounded-lg rounded-br-none p-3 max-w-[70%]">
                        <p>I'll send you a preview once I have something to show.</p>
                        <p className="text-xs text-green-200 mt-1">10:35 AM</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full text-gray-500">
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full text-gray-500">
                      <Smile className="h-5 w-5" />
                    </Button>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 bg-gray-100 rounded-full py-2 px-4 focus:outline-none"
                    />
                    <Button variant="ghost" size="icon" className="rounded-full text-gray-500">
                      <Mic className="h-5 w-5" />
                    </Button>
                    <Button className="rounded-full bg-green-600 text-white hover:bg-green-700" size="icon">
                      <Send className="h-5 w-5" />
                    </Button>
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
            title: "One-on-One DMs",
            description: "Send private messages to friends with WhatsApp/Snapchat-style messaging.",
            icon: MessageCircle,
          },
          {
            title: "Group Chats",
            description: "Create group conversations with roles and admin capabilities.",
            icon: Users,
          },
          {
            title: "Disappearing Messages",
            description: "Send messages that automatically delete after being viewed.",
            icon: Clock,
          },
          {
            title: "Reply Threads",
            description: "Keep conversations organized with threaded replies to specific messages.",
            icon: Layers,
          },
          {
            title: "Message Reactions",
            description: "React to messages with emojis for quick responses.",
            icon: Smile,
          },
          {
            title: "Voice Notes",
            description: "Send audio messages when you prefer speaking over typing.",
            icon: Mic,
          },
          {
            title: "GIFs & Stickers",
            description: "Express yourself with GIFs and stickers in your conversations.",
            icon: ImageIcon,
          },
          {
            title: "Message Forwarding",
            description: "Share important messages with other contacts or groups.",
            icon: Share2,
          },
          {
            title: "Communities",
            description: "Create and join WhatsApp-style group-of-groups for broader connections.",
            icon: Globe,
          },
        ].map((feature, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              {feature.icon && <feature.icon className="h-6 w-6 text-green-600" />}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start messaging?</h2>
          <p className="text-xl opacity-90 mb-8">
            Connect with friends and family in a more personal way on SocialSphere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 w-full sm:w-auto">
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
