import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Users,
  MessageSquare,
  Video,
  ImageIcon,
  Shield,
  MessageCircle,
  MapPin,
  ShoppingBag,
  BarChart2,
  Smile,
  Tv,
  Compass,
  ArrowRight,
} from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          All Features in One Platform
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore the comprehensive feature set that makes SocialSphere the ultimate social platform.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "User & Profile",
            icon: Users,
            description: "Comprehensive profile system with privacy controls",
            color: "bg-blue-100 text-blue-600 group-hover:bg-blue-200",
            link: "/features/user-profile",
          },
          {
            title: "Posts & Timeline",
            icon: MessageSquare,
            description: "Share text, photos, videos with rich engagement options",
            color: "bg-purple-100 text-purple-600 group-hover:bg-purple-200",
            link: "/features/posts-timeline",
          },
          {
            title: "Stories & Status",
            icon: ImageIcon,
            description: "24-hour ephemeral content with interactive elements",
            color: "bg-pink-100 text-pink-600 group-hover:bg-pink-200",
            link: "/features/stories-status",
          },
          {
            title: "Reels & Short Videos",
            icon: Video,
            description: "Vertical short-form video with AI-powered recommendations",
            color: "bg-red-100 text-red-600 group-hover:bg-red-200",
            link: "/features/reels-videos",
          },
          {
            title: "Long-form Video",
            icon: Tv,
            description: "YouTube-style videos and livestreaming capabilities",
            color: "bg-orange-100 text-orange-600 group-hover:bg-orange-200",
            link: "/features/long-form-video",
          },
          {
            title: "Messaging & Calls",
            icon: MessageCircle,
            description: "Private messaging, group chats, and audio/video calls",
            color: "bg-green-100 text-green-600 group-hover:bg-green-200",
            link: "/features/messaging",
          },
          {
            title: "Discovery & Explore",
            icon: Compass,
            description: "AI-curated content discovery and trending topics",
            color: "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200",
            link: "/features/discovery",
          },
          {
            title: "Location & Maps",
            icon: MapPin,
            description: "Interactive maps with friend locations and geo-filters",
            color: "bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200",
            link: "/features/location-maps",
          },
          {
            title: "Marketplace & Shopping",
            icon: ShoppingBag,
            description: "Buy, sell, and discover products with integrated shopping",
            color: "bg-teal-100 text-teal-600 group-hover:bg-teal-200",
            link: "/features/marketplace",
          },
          {
            title: "Creator Tools",
            icon: BarChart2,
            description: "Analytics, monetization, and promotion tools for creators",
            color: "bg-cyan-100 text-cyan-600 group-hover:bg-cyan-200",
            link: "/features/creator-tools",
          },
          {
            title: "Security & Customization",
            icon: Shield,
            description: "Advanced security features and personalization options",
            color: "bg-gray-100 text-gray-600 group-hover:bg-gray-200",
            link: "/features/security",
          },
          {
            title: "Fun & Add-ons",
            icon: Smile,
            description: "AR filters, games, memories, and other fun features",
            color: "bg-amber-100 text-amber-600 group-hover:bg-amber-200",
            link: "/features/fun-addons",
          },
        ].map((category, i) => (
          <Link
            key={i}
            href={category.link}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
          >
            <div
              className={`h-14 w-14 rounded-2xl ${category.color} flex items-center justify-center mb-6 transition-colors`}
            >
              {category.icon && <category.icon className="h-7 w-7" />}
            </div>
            <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <div className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
              Explore features <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to experience all these features?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 w-full sm:w-auto"
            >
              Sign Up Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/">
            <Button
              size="lg"
              variant="outline"
              className="border-purple-200 text-purple-700 hover:bg-purple-50 w-full sm:w-auto"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
