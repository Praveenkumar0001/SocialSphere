import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BarChart2, DollarSign, Users, Zap, Megaphone, Layers, Sparkles, Palette, ArrowRight } from "lucide-react"

export default function CreatorToolsPage() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="text-center mb-16">
        <div className="inline-block p-2 bg-cyan-100 text-cyan-600 rounded-lg mb-4">
          <BarChart2 className="h-6 w-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Creator Tools</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Analytics, monetization, and promotion tools for content creators.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Grow Your Audience</h2>
          <p className="text-lg text-gray-600 mb-6">
            Our creator tools give you everything you need to understand your audience, grow your following, and
            monetize your content—all in one place.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            From detailed analytics to multiple monetization options, we've designed our platform to help creators of
            all sizes succeed and build sustainable careers.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-cyan-100 flex items-center justify-center mt-1">
                <BarChart2 className="h-4 w-4 text-cyan-600" />
              </div>
              <div>
                <h3 className="font-semibold">Detailed Analytics</h3>
                <p className="text-gray-600">
                  Track performance with comprehensive insights about your audience and content.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-cyan-100 flex items-center justify-center mt-1">
                <DollarSign className="h-4 w-4 text-cyan-600" />
              </div>
              <div>
                <h3 className="font-semibold">Multiple Revenue Streams</h3>
                <p className="text-gray-600">
                  Earn from your content through ads, subscriptions, tips, and merchandise.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-cyan-100 flex items-center justify-center mt-1">
                <Megaphone className="h-4 w-4 text-cyan-600" />
              </div>
              <div>
                <h3 className="font-semibold">Promotion Tools</h3>
                <p className="text-gray-600">Reach more people with our suite of promotional and advertising tools.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-lg">Creator Dashboard</h3>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Followers", value: "24,568", change: "+12.4%", icon: Users },
                  { label: "Engagement", value: "8.7%", change: "+2.1%", icon: Zap },
                  { label: "Revenue", value: "$1,245", change: "+18.3%", icon: DollarSign },
                  { label: "Content", value: "86 posts", change: "+5 new", icon: Layers },
                ].map((stat, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="h-8 w-8 rounded-full bg-cyan-100 flex items-center justify-center">
                        {stat.icon && <stat.icon className="h-4 w-4 text-cyan-600" />}
                      </div>
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>

              <h4 className="font-medium mb-3">Audience Demographics</h4>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Age Groups</span>
                      <span>Percentage</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { group: "18-24", percentage: 35 },
                        { group: "25-34", percentage: 45 },
                        { group: "35-44", percentage: 15 },
                        { group: "45+", percentage: 5 },
                      ].map((age, i) => (
                        <div key={i} className="flex items-center">
                          <span className="text-sm w-16">{age.group}</span>
                          <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-cyan-500 rounded-full"
                              style={{ width: `${age.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm w-8 text-right">{age.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="font-medium mb-3">Monetization</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-medium">Creator Fund</p>
                    <p className="text-sm text-gray-500">Earnings from platform revenue sharing</p>
                  </div>
                  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">Withdraw</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Subscription Tiers</p>
                    <p className="text-sm text-gray-500">3 active tiers with 156 subscribers</p>
                  </div>
                  <Button variant="outline" className="border-cyan-200 text-cyan-600 hover:bg-cyan-50">
                    Manage
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
            title: "Analytics Dashboard",
            description: "Track performance with detailed insights about your audience and content.",
            icon: BarChart2,
          },
          {
            title: "Monetization Options",
            description: "Earn from your content through ads, subscriptions, tips, and merchandise.",
            icon: DollarSign,
          },
          {
            title: "Audience Insights",
            description: "Understand your audience with demographic and engagement data.",
            icon: Users,
          },
          {
            title: "Content Performance",
            description: "See which content performs best and optimize your strategy.",
            icon: Zap,
          },
          {
            title: "Promotion Tools",
            description: "Reach more people with our suite of promotional and advertising tools.",
            icon: Megaphone,
          },
          {
            title: "Content Management",
            description: "Organize and schedule your content across all formats.",
            icon: Layers,
          },
          {
            title: "Creator Recommendations",
            description: "Get personalized recommendations to grow your audience.",
            icon: Sparkles,
          },
          {
            title: "Brand Collaboration",
            description: "Connect with brands for sponsorships and partnerships.",
            icon: Palette,
          },
        ].map((feature, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center mb-4">
              {feature.icon && <feature.icon className="h-6 w-6 text-cyan-600" />}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to grow as a creator?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of creators building their audience and earning from their content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-cyan-700 hover:bg-gray-100 w-full sm:w-auto">
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
