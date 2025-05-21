import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Eye, Bell, UserCog, FileText, Fingerprint, RefreshCw, ArrowRight } from "lucide-react"

export default function SecurityPage() {
  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="text-center mb-16">
        <div className="inline-block p-2 bg-gray-100 text-gray-600 rounded-lg mb-4">
          <Shield className="h-6 w-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Security & Customization</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Advanced security features and personalization options to keep you safe and in control.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Your Safety, Your Control</h2>
          <p className="text-lg text-gray-600 mb-6">
            We take your security and privacy seriously. Our comprehensive security features give you peace of mind
            while our customization options let you make SocialSphere truly yours.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            From two-factor authentication to granular privacy controls, we've built security into every aspect of our
            platform, while also giving you the freedom to personalize your experience.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mt-1">
                <Lock className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold">Advanced Security</h3>
                <p className="text-gray-600">Protect your account with two-factor authentication and login alerts.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mt-1">
                <Eye className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold">Privacy Controls</h3>
                <p className="text-gray-600">Manage who can see your content with granular privacy settings.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mt-1">
                <UserCog className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold">Personalization</h3>
                <p className="text-gray-600">
                  Customize your experience with themes, layouts, and content preferences.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-lg">Security & Privacy Settings</h3>
            </div>

            <div className="p-4">
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Account Security</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <Lock className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                      </div>
                      <div className="h-6 w-12 bg-green-100 rounded-full flex items-center p-1">
                        <div className="h-4 w-4 rounded-full bg-green-600 ml-auto"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <Bell className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">Login Alerts</p>
                          <p className="text-sm text-gray-500">Get notified of new logins to your account</p>
                        </div>
                      </div>
                      <div className="h-6 w-12 bg-green-100 rounded-full flex items-center p-1">
                        <div className="h-4 w-4 rounded-full bg-green-600 ml-auto"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <RefreshCw className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">Automatic Logout</p>
                          <p className="text-sm text-gray-500">Automatically log out after period of inactivity</p>
                        </div>
                      </div>
                      <div className="h-6 w-12 bg-gray-200 rounded-full flex items-center p-1">
                        <div className="h-4 w-4 rounded-full bg-gray-400"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Privacy Controls</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <Eye className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">Profile Privacy</p>
                          <p className="text-sm text-gray-500">Control who can see your profile information</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-gray-600">
                        Manage
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">Data Usage</p>
                          <p className="text-sm text-gray-500">Manage how your data is used and shared</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="text-gray-600">
                        Manage
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Customization</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {["Light", "Dark", "System"].map((theme, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-lg text-center cursor-pointer ${
                          theme === "Dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
                        } ${theme === "Dark" ? "border-2 border-blue-500" : "border border-gray-200"}`}
                      >
                        {theme}
                      </div>
                    ))}
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
            title: "Two-Factor Authentication",
            description: "Add an extra layer of security to your account with 2FA.",
            icon: Lock,
          },
          {
            title: "Privacy Controls",
            description: "Manage who can see your content with granular privacy settings.",
            icon: Eye,
          },
          {
            title: "Login Alerts",
            description: "Get notified of new logins to your account from unfamiliar devices.",
            icon: Bell,
          },
          {
            title: "Account Customization",
            description: "Personalize your experience with themes, layouts, and content preferences.",
            icon: UserCog,
          },
          {
            title: "Data Management",
            description: "Control how your data is used and download your information anytime.",
            icon: FileText,
          },
          {
            title: "Biometric Security",
            description: "Use fingerprint or face recognition to secure your account on mobile.",
            icon: Fingerprint,
          },
          {
            title: "Content Filtering",
            description: "Control the types of content you see with advanced filtering options.",
            icon: Shield,
          },
          {
            title: "Regular Security Audits",
            description: "We regularly audit our systems to ensure your data remains secure.",
            icon: RefreshCw,
          },
        ].map((feature, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              {feature.icon && <feature.icon className="h-6 w-6 text-gray-600" />}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Your security is our priority</h2>
          <p className="text-xl opacity-90 mb-8">
            Join SocialSphere and experience a platform that puts your privacy and security first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-gray-800 hover:bg-gray-100 w-full sm:w-auto">
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
