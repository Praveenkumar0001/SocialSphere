"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Users,
  DollarSign,
  MessageCircle,
  Video,
  Camera,
  MapPin,
  ShoppingBag,
  BarChart3,
  Sparkles,
  Shield,
  Star,
} from "lucide-react"

interface FeatureImpact {
  name: string
  icon: any
  status: "Live" | "Testing" | "Development"
  userEngagement: number
  revenueImpact: number
  retentionBoost: number
  keyBenefits: string[]
  businessImpact: string
  targetAudience: string[]
  competitiveAdvantage: string
}

export function FeatureImpactDashboard() {
  const features: FeatureImpact[] = [
    {
      name: "Posts & Timeline",
      icon: MessageCircle,
      status: "Live",
      userEngagement: 85,
      revenueImpact: 60,
      retentionBoost: 75,
      keyBenefits: ["Core social interaction", "Content discovery", "Community building"],
      businessImpact: "Foundation of user engagement - drives 80% of daily active usage",
      targetAudience: ["All users", "Content creators", "Businesses"],
      competitiveAdvantage: "Advanced algorithm with real-time trending",
    },
    {
      name: "Stories",
      icon: Camera,
      status: "Live",
      userEngagement: 70,
      revenueImpact: 45,
      retentionBoost: 60,
      keyBenefits: ["Ephemeral content", "Real-time sharing", "FOMO creation"],
      businessImpact: "Increases daily opens by 40% - perfect for brand awareness",
      targetAudience: ["Young adults", "Influencers", "Brands"],
      competitiveAdvantage: "24-hour expiry with advanced privacy controls",
    },
    {
      name: "Reels & Short Videos",
      icon: Video,
      status: "Live",
      userEngagement: 95,
      revenueImpact: 80,
      retentionBoost: 90,
      keyBenefits: ["Viral potential", "High engagement", "Discovery engine"],
      businessImpact: "Primary growth driver - can increase user acquisition by 300%",
      targetAudience: ["Gen Z", "Content creators", "Entertainment seekers"],
      competitiveAdvantage: "AI-powered editing tools and music library",
    },
    {
      name: "Long-form Videos",
      icon: Video,
      status: "Live",
      userEngagement: 75,
      revenueImpact: 90,
      retentionBoost: 85,
      keyBenefits: ["Creator monetization", "Educational content", "Deep engagement"],
      businessImpact: "Revenue powerhouse - enables subscription and ad revenue",
      targetAudience: ["Educators", "Professional creators", "Businesses"],
      competitiveAdvantage: "4K streaming with chapter navigation",
    },
    {
      name: "Secure Messaging",
      icon: MessageCircle,
      status: "Live",
      userEngagement: 80,
      revenueImpact: 40,
      retentionBoost: 95,
      keyBenefits: ["End-to-end encryption", "Privacy protection", "Trust building"],
      businessImpact: "Differentiator in privacy-conscious markets - builds user loyalty",
      targetAudience: ["Privacy advocates", "Business users", "All users"],
      competitiveAdvantage: "Military-grade encryption with user-controlled keys",
    },
    {
      name: "Location & Maps",
      icon: MapPin,
      status: "Live",
      userEngagement: 65,
      revenueImpact: 70,
      retentionBoost: 55,
      keyBenefits: ["Local discovery", "Geo-targeted content", "Real-world connections"],
      businessImpact: "Enables location-based advertising and local business partnerships",
      targetAudience: ["Local businesses", "Travelers", "Event organizers"],
      competitiveAdvantage: "Real-time friend tracking with privacy controls",
    },
    {
      name: "Marketplace",
      icon: ShoppingBag,
      status: "Live",
      userEngagement: 55,
      revenueImpact: 95,
      retentionBoost: 70,
      keyBenefits: ["Direct monetization", "Community commerce", "Trust system"],
      businessImpact: "Direct revenue stream - 5% transaction fees on all sales",
      targetAudience: ["Sellers", "Buyers", "Small businesses"],
      competitiveAdvantage: "Integrated social proof and secure payments",
    },
    {
      name: "Creator Tools",
      icon: BarChart3,
      status: "Live",
      userEngagement: 60,
      revenueImpact: 85,
      retentionBoost: 80,
      keyBenefits: ["Analytics dashboard", "Monetization options", "Audience insights"],
      businessImpact: "Retains top creators - prevents migration to competitors",
      targetAudience: ["Content creators", "Influencers", "Brands"],
      competitiveAdvantage: "Real-time analytics with AI-powered recommendations",
    },
    {
      name: "Fun Add-ons (AR/Games)",
      icon: Sparkles,
      status: "Live",
      userEngagement: 85,
      revenueImpact: 50,
      retentionBoost: 65,
      keyBenefits: ["Entertainment value", "Viral sharing", "Youth appeal"],
      businessImpact: "Increases session time by 45% - perfect for ad revenue",
      targetAudience: ["Teenagers", "Young adults", "Casual users"],
      competitiveAdvantage: "Custom AR filters with face recognition",
    },
    {
      name: "AI Content Moderation",
      icon: Shield,
      status: "Live",
      userEngagement: 30,
      revenueImpact: 20,
      retentionBoost: 90,
      keyBenefits: ["Safe environment", "Automated screening", "Community standards"],
      businessImpact: "Reduces moderation costs by 80% while improving safety",
      targetAudience: ["All users", "Parents", "Advertisers"],
      competitiveAdvantage: "OpenAI-powered with custom training for social content",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-100 text-green-800"
      case "Testing":
        return "bg-yellow-100 text-yellow-800"
      case "Development":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getImpactLevel = (score: number) => {
    if (score >= 80) return { level: "High", color: "text-green-600" }
    if (score >= 60) return { level: "Medium", color: "text-yellow-600" }
    return { level: "Low", color: "text-red-600" }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">SocialSphere Feature Impact Analysis</h1>
        <p className="text-gray-600">Comprehensive analysis of all platform features and their business impact</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Features</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{features.length}</div>
            <p className="text-xs text-green-600">All features live and tested</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Engagement Impact</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(features.reduce((acc, f) => acc + f.userEngagement, 0) / features.length)}%
            </div>
            <p className="text-xs text-blue-600">Above industry average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue Potential</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(features.reduce((acc, f) => acc + f.revenueImpact, 0) / features.length)}%
            </div>
            <p className="text-xs text-green-600">Multiple revenue streams</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Retention Boost</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(features.reduce((acc, f) => acc + f.retentionBoost, 0) / features.length)}%
            </div>
            <p className="text-xs text-purple-600">Strong user loyalty</p>
          </CardContent>
        </Card>
      </div>

      {/* Feature Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <feature.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{feature.name}</CardTitle>
                    <Badge className={getStatusColor(feature.status)}>{feature.status}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Impact Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">User Engagement</div>
                  <div className="flex items-center gap-2">
                    <Progress value={feature.userEngagement} className="flex-1" />
                    <span className={`text-sm font-medium ${getImpactLevel(feature.userEngagement).color}`}>
                      {feature.userEngagement}%
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Revenue Impact</div>
                  <div className="flex items-center gap-2">
                    <Progress value={feature.revenueImpact} className="flex-1" />
                    <span className={`text-sm font-medium ${getImpactLevel(feature.revenueImpact).color}`}>
                      {feature.revenueImpact}%
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Retention Boost</div>
                  <div className="flex items-center gap-2">
                    <Progress value={feature.retentionBoost} className="flex-1" />
                    <span className={`text-sm font-medium ${getImpactLevel(feature.retentionBoost).color}`}>
                      {feature.retentionBoost}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Business Impact */}
              <div>
                <h4 className="font-medium text-sm mb-2">Business Impact</h4>
                <p className="text-sm text-gray-600">{feature.businessImpact}</p>
              </div>

              {/* Key Benefits */}
              <div>
                <h4 className="font-medium text-sm mb-2">Key Benefits</h4>
                <div className="flex flex-wrap gap-1">
                  {feature.keyBenefits.map((benefit, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Target Audience */}
              <div>
                <h4 className="font-medium text-sm mb-2">Target Audience</h4>
                <div className="flex flex-wrap gap-1">
                  {feature.targetAudience.map((audience, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {audience}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Competitive Advantage */}
              <div>
                <h4 className="font-medium text-sm mb-2">Competitive Advantage</h4>
                <p className="text-sm text-blue-600 font-medium">{feature.competitiveAdvantage}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Strategic Recommendations */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Strategic Recommendations</CardTitle>
          <CardDescription>Priority actions for maximum business impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">🚀 Immediate Focus</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Promote Reels feature - highest viral potential</li>
                <li>• Launch creator monetization program</li>
                <li>• Optimize marketplace for mobile</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">💡 Growth Opportunities</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Expand AR filters library</li>
                <li>• Add live streaming to long videos</li>
                <li>• Integrate location-based advertising</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">🎯 Competitive Edge</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• E2E encryption as privacy differentiator</li>
                <li>• AI moderation for brand safety</li>
                <li>• Integrated social commerce</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
