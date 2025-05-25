"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Users, MessageCircle, Twitter, Github, ExternalLink, Trophy, Sparkles, Heart } from "lucide-react"

interface CommunityModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CommunityModal({ isOpen, onClose }: CommunityModalProps) {
  const communityLinks = [
    {
      name: "Discord",
      description: "Join our vibrant Discord community",
      icon: MessageCircle,
      url: "https://discord.gg/creatorverse",
      members: "2.5K",
      color: "from-indigo-500 to-purple-500",
    },
    {
      name: "Twitter",
      description: "Follow us for updates and announcements",
      icon: Twitter,
      url: "https://twitter.com/creatorverse",
      members: "8.2K",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "GitHub",
      description: "Contribute to our open-source project",
      icon: Github,
      url: "https://github.com/creatorverse/platform",
      members: "1.1K",
      color: "from-gray-600 to-gray-800",
    },
  ]

  const communityStats = [
    { label: "Total Creators", value: "12.5K", icon: Users },
    { label: "NFTs Minted", value: "45.2K", icon: Sparkles },
    { label: "Tokens Distributed", value: "4.5M", icon: Trophy },
    { label: "Community Love", value: "∞", icon: Heart },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gray-900/95 backdrop-blur-xl border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Join the CreatorVerse Community
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Connect with fellow creators, share your work, and grow together in our thriving ecosystem.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {communityStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="bg-white/5 backdrop-blur-xl border-white/10">
                  <CardContent className="p-4 text-center">
                    <Icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <p className="text-lg font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-gray-400">{stat.label}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Community Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect With Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {communityLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <Card
                    key={index}
                    className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer group"
                    onClick={() => window.open(link.url, "_blank")}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <div
                          className={`w-10 h-10 bg-gradient-to-r ${link.color} rounded-lg flex items-center justify-center`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{link.name}</h4>
                          <Badge variant="secondary" className="bg-purple-900/30 text-purple-300 border-purple-500/30">
                            {link.members} members
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{link.description}</p>
                      <div className="flex items-center text-purple-400 text-sm font-medium group-hover:text-purple-300 transition-colors">
                        <span>Join Now</span>
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Community Guidelines */}
          <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg text-white">Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Be respectful and supportive of fellow creators</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Share your work and provide constructive feedback</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Help newcomers learn and grow in the space</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Keep discussions relevant and valuable</span>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={() => window.open("https://discord.gg/creatorverse", "_blank")}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Join Discord
            </Button>
            <Button onClick={onClose} variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
