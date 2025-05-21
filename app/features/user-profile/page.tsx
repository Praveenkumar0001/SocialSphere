import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, CheckCircle2, Tag, Lock, BarChart2, PenTool, ArrowRight } from "lucide-react"

export default function UserProfilePage() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="text-center mb-16">
        <div className="inline-block p-2 bg-blue-100 text-blue-600 rounded-lg mb-4">
          <Users className="h-6 w-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">User & Profile Features</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Create your perfect online presence with our comprehensive profile features.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Your Digital Identity</h2>
          <p className="text-lg text-gray-600 mb-6">
            Your profile is your digital identity on SocialSphere. We provide you with all the tools you need to express
            yourself, connect with others, and control your online presence.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            From customizable profiles with cover photos and bios to verification badges and privacy controls, we've
            thought of everything to make your experience personal and secure.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Complete Customization</h3>
                <p className="text-gray-600">
                  Personalize every aspect of your profile to reflect your unique personality.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Privacy Controls</h3>
                <p className="text-gray-600">
                  Granular privacy settings give you complete control over who sees your content.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Verification System</h3>
                <p className="text-gray-600">
                  Get verified to establish authenticity and build trust with your audience.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="relative">
            <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl"></div>
            <div className="absolute -bottom-12 left-6">
              <div className="h-24 w-24 rounded-full border-4 border-white bg-white">
                <div className="h-full w-full rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="font-bold text-2xl text-blue-600">JS</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 px-2">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-xl">John Smith</h3>
              <div className="bg-blue-100 text-blue-600 rounded-full p-1">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>
            <p className="text-gray-500">@johnsmith</p>
            <p className="mt-3">
              Digital creator, photographer, and tech enthusiast. Sharing my journey and connecting with like-minded
              people.
            </p>
            <div className="flex flex-wrap gap-4 mt-4 text-gray-600 text-sm">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>1,248 Following</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>8,642 Followers</span>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700">Follow</Button>
              <Button variant="outline">Message</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {[
          {
            title: "Custom Profiles",
            description:
              "Personalize your profile with bio, photos, cover images, and more to showcase your personality.",
            icon: PenTool,
          },
          {
            title: "Verification Badges",
            description: "Get verified with our official badge system to establish authenticity and build trust.",
            icon: CheckCircle2,
          },
          {
            title: "Username & @handle",
            description: "Choose your unique username and handle to make your profile easily discoverable.",
            icon: Tag,
          },
          {
            title: "Followers & Friends",
            description: "Connect with others through both follower/following model and friend connections.",
            icon: Users,
          },
          {
            title: "Privacy Controls",
            description:
              "Manage who can see your content with granular privacy settings for each aspect of your profile.",
            icon: Lock,
          },
          {
            title: "Profile Stats",
            description: "Track your followers, posts, and engagement metrics all in one place.",
            icon: BarChart2,
          },
        ].map((feature, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              {feature.icon && <feature.icon className="h-6 w-6 text-blue-600" />}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to create your profile?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join millions of users already expressing themselves on SocialSphere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 w-full sm:w-auto">
                Create Your Profile <ArrowRight className="ml-2 h-5 w-5" />
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
