"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calculator, Coins, TrendingUp, DollarSign, Sparkles, Target, Calendar } from "lucide-react"

interface EarningsCalculatorProps {
  isOpen: boolean
  onClose: () => void
}

export function EarningsCalculator({ isOpen, onClose }: EarningsCalculatorProps) {
  const [nftCount, setNftCount] = useState(1)
  const [timeframe, setTimeframe] = useState(30) // days

  const tokensPerNFT = 100
  const estimatedValue = 0.05 // USD per token (example)

  const calculations = {
    totalTokens: nftCount * tokensPerNFT,
    estimatedValue: nftCount * tokensPerNFT * estimatedValue,
    dailyRate: (nftCount * tokensPerNFT) / timeframe,
    monthlyProjection: ((nftCount * tokensPerNFT) / timeframe) * 30,
  }

  const milestones = [
    { nfts: 1, tokens: 100, title: "First Creator", description: "Welcome to CreatorVerse!" },
    { nfts: 10, tokens: 1000, title: "Rising Artist", description: "Building your portfolio" },
    { nfts: 50, tokens: 5000, title: "Established Creator", description: "Making your mark" },
    { nfts: 100, tokens: 10000, title: "Master Creator", description: "Leading the community" },
    { nfts: 500, tokens: 50000, title: "Creator Legend", description: "Inspiring others" },
  ]

  const currentMilestone = milestones.reverse().find((m) => nftCount >= m.nfts) || milestones[milestones.length - 1]
  const nextMilestone = milestones.find((m) => nftCount < m.nfts)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gray-900/95 backdrop-blur-xl border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Creator Earnings Calculator
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Calculate your potential earnings and track your creator journey milestones.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center">
                  <Calculator className="w-5 h-5 mr-2 text-green-400" />
                  Calculator Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="nftCount" className="text-white">
                    Number of NFTs
                  </Label>
                  <Input
                    id="nftCount"
                    type="number"
                    min="1"
                    value={nftCount}
                    onChange={(e) => setNftCount(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="timeframe" className="text-white">
                    Timeframe (days)
                  </Label>
                  <Input
                    id="timeframe"
                    type="number"
                    min="1"
                    value={timeframe}
                    onChange={(e) => setTimeframe(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center">
                  <Coins className="w-5 h-5 mr-2 text-green-400" />
                  Earnings Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Tokens:</span>
                  <span className="text-green-400 font-bold">{calculations.totalTokens.toLocaleString()} CRT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Est. Value:</span>
                  <span className="text-green-400 font-bold">${calculations.estimatedValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Daily Rate:</span>
                  <span className="text-green-400 font-bold">{calculations.dailyRate.toFixed(1)} CRT/day</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Monthly Projection:</span>
                  <span className="text-green-400 font-bold">{calculations.monthlyProjection.toFixed(0)} CRT</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm text-gray-400">Tokens per NFT</p>
                <p className="text-xl font-bold text-white">{tokensPerNFT}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm text-gray-400">Token Value</p>
                <p className="text-xl font-bold text-white">${estimatedValue}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm text-gray-400">Growth Rate</p>
                <p className="text-xl font-bold text-white">+15%</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm text-gray-400">Timeframe</p>
                <p className="text-xl font-bold text-white">{timeframe}d</p>
              </CardContent>
            </Card>
          </div>

          {/* Milestones */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
                Creator Milestones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/30 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{currentMilestone.title}</h4>
                      <p className="text-yellow-300 text-sm">{currentMilestone.description}</p>
                      <p className="text-xs text-gray-400">
                        {currentMilestone.nfts} NFTs • {currentMilestone.tokens} CRT
                      </p>
                    </div>
                  </div>
                </div>

                {nextMilestone && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-white">Next: {nextMilestone.title}</h4>
                        <p className="text-gray-400 text-sm">{nextMilestone.nfts - nftCount} more NFTs to unlock</p>
                      </div>
                      <div className="text-right">
                        <p className="text-purple-400 font-bold">{nextMilestone.tokens} CRT</p>
                        <p className="text-xs text-gray-400">{nextMilestone.nfts} NFTs</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Coins className="w-4 h-4 mr-2" />
              Start Creating
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
