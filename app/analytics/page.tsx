"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  ArrowUpRight,
  Users,
  Heart,
  MessageSquare,
  Share2,
  TrendingUp,
  Eye,
  Calendar,
  Clock,
  MapPin,
  Activity,
  BarChart2,
  PieChartIcon,
  LineChartIcon,
} from "lucide-react"
import { getCurrentUser } from "@/app/utils/auth"

// Mock data for analytics
const engagementData = [
  { name: "Mon", likes: 120, comments: 85, shares: 25 },
  { name: "Tue", likes: 145, comments: 97, shares: 35 },
  { name: "Wed", likes: 135, comments: 110, shares: 40 },
  { name: "Thu", likes: 180, comments: 130, shares: 55 },
  { name: "Fri", likes: 210, comments: 170, shares: 70 },
  { name: "Sat", likes: 250, comments: 200, shares: 90 },
  { name: "Sun", likes: 190, comments: 150, shares: 65 },
]

const followerGrowthData = [
  { name: "Jan", followers: 1200 },
  { name: "Feb", followers: 1350 },
  { name: "Mar", followers: 1500 },
  { name: "Apr", followers: 1750 },
  { name: "May", followers: 2100 },
  { name: "Jun", followers: 2400 },
  { name: "Jul", followers: 2800 },
]

const contentPerformanceData = [
  { name: "Photos", value: 45 },
  { name: "Videos", value: 30 },
  { name: "Text", value: 15 },
  { name: "Polls", value: 10 },
]

const demographicsData = [
  { name: "18-24", value: 25 },
  { name: "25-34", value: 40 },
  { name: "35-44", value: 20 },
  { name: "45-54", value: 10 },
  { name: "55+", value: 5 },
]

const locationData = [
  { name: "United States", value: 40 },
  { name: "United Kingdom", value: 15 },
  { name: "Canada", value: 12 },
  { name: "Australia", value: 8 },
  { name: "Germany", value: 7 },
  { name: "Other", value: 18 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("week")
  const user = getCurrentUser() || { followers: [] }

  // Ensure followers exists and has a length property
  const followerCount = user?.followers?.length || 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Track your social media performance and audience insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={timeRange === "week" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("week")}>
            Week
          </Button>
          <Button
            variant={timeRange === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("month")}
          >
            Month
          </Button>
          <Button variant={timeRange === "year" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("year")}>
            Year
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
            <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{followerCount}</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>+12% from last {timeRange}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <Activity className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6%</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>+0.8% from last {timeRange}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Post Reach</CardTitle>
            <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8K</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>+18% from last {timeRange}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Profile Visits</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2K</div>
            <div className="flex items-center pt-1 text-xs text-red-500">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>-2% from last {timeRange}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="engagement" className="mb-8">
        <TabsList className="grid grid-cols-3 md:w-[400px] mb-4">
          <TabsTrigger value="engagement" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span className="hidden sm:inline">Engagement</span>
          </TabsTrigger>
          <TabsTrigger value="audience" className="flex items-center gap-2">
            <PieChartIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Audience</span>
          </TabsTrigger>
          <TabsTrigger value="growth" className="flex items-center gap-2">
            <LineChartIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Growth</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Overview</CardTitle>
              <CardDescription>Your post engagement metrics for the past {timeRange}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="likes" fill="#8884d8" name="Likes" />
                    <Bar dataKey="comments" fill="#82ca9d" name="Comments" />
                    <Bar dataKey="shares" fill="#ffc658" name="Shares" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Top Performing Post</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <img
                      src="/placeholder.svg?height=48&width=48"
                      alt="Post thumbnail"
                      className="h-full w-full object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium line-clamp-1">Just launched my new website! Check it out...</p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Heart className="h-3 w-3" /> 245
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MessageSquare className="h-3 w-3" /> 42
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Share2 className="h-3 w-3" /> 18
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Best Time to Post</CardTitle>
                <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">Thursdays, 7-9 PM</div>
                <p className="text-xs text-gray-500 mt-1">Based on your audience's activity patterns</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Content Performance</CardTitle>
              </CardHeader>
              <CardContent className="h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={contentPerformanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={50}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {contentPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Age Demographics</CardTitle>
                <CardDescription>Age distribution of your audience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={demographicsData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {demographicsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographical Distribution</CardTitle>
                <CardDescription>Where your audience is located</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={locationData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {locationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Top Locations</CardTitle>
                <CardDescription>Cities where your content performs best</CardDescription>
              </div>
              <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { city: "New York, USA", percentage: 18 },
                  { city: "London, UK", percentage: 12 },
                  { city: "Los Angeles, USA", percentage: 10 },
                  { city: "Toronto, Canada", percentage: 8 },
                  { city: "Sydney, Australia", percentage: 6 },
                ].map((location, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium">{location.city}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-600 rounded-full"
                          style={{ width: `${location.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">{location.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="growth" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Follower Growth</CardTitle>
              <CardDescription>Your follower growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={followerGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="followers" stroke="#8884d8" activeDot={{ r: 8 }} name="Followers" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Follower Milestones</CardTitle>
                <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { milestone: "1,000 followers", date: "March 15, 2023" },
                    { milestone: "2,000 followers", date: "June 22, 2023" },
                    { milestone: "2,500 followers", date: "August 10, 2023" },
                  ].map((milestone, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-purple-600" />
                        <span className="font-medium">{milestone.milestone}</span>
                      </div>
                      <span className="text-sm text-gray-500">{milestone.date}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between text-purple-600">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-purple-600" />
                      <span className="font-medium">3,000 followers</span>
                    </div>
                    <span className="text-sm">Projected: Oct 2023</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Growth Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h3 className="font-medium mb-2 text-purple-700 dark:text-purple-300">Recommendation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Post more video content to increase engagement. Videos get 2.5x more engagement than photos on
                      your profile.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="font-medium mb-2 text-blue-700 dark:text-blue-300">Opportunity</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Your audience is growing fastest in Australia. Consider creating content relevant to this region.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
