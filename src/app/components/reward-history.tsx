"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Trophy, Calendar, Coins } from "lucide-react"
import { useWallet } from "@/hooks/use-wallet"

interface RewardEvent {
  id: string
  tokenId: string
  amount: string
  timestamp: string
  txHash: string
  nftName: string
}

export default function RewardHistory() {
  const [rewards, setRewards] = useState<RewardEvent[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { account, isConnected } = useWallet()

  const fetchRewards = async () => {
    setIsLoading(true)
    try {
      // Mock reward data - in production, fetch from contract events
      const mockRewards: RewardEvent[] = [
        {
          id: "1",
          tokenId: "1",
          amount: "100",
          timestamp: new Date().toISOString(),
          txHash: "0x1234567890abcdef",
          nftName: "Digital Sunset",
        },
        {
          id: "2",
          tokenId: "2",
          amount: "100",
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          txHash: "0xabcdef1234567890",
          nftName: "Abstract Dreams",
        },
      ]

      setRewards(mockRewards)
    } catch (error) {
      console.error("Error fetching rewards:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isConnected) {
      fetchRewards()
    }
  }, [isConnected])

  const totalRewards = rewards.reduce((sum, reward) => sum + Number.parseInt(reward.amount), 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Reward History</h2>
          <p className="text-gray-600">Track your creator token earnings</p>
        </div>
        <Button onClick={fetchRewards} variant="outline" disabled={isLoading}>
          {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
          Refresh
        </Button>
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Total Rewards Earned
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600 mb-2">{totalRewards} CRT</div>
          <p className="text-gray-600">
            From {rewards.length} NFT{rewards.length !== 1 ? "s" : ""} minted
          </p>
        </CardContent>
      </Card>

      {/* Rewards List */}
      {rewards.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Rewards Yet</h3>
            <p className="text-gray-600">Start minting NFTs to earn creator token rewards!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {rewards.map((reward) => (
            <Card key={reward.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Coins className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{reward.nftName}</h4>
                      <p className="text-sm text-gray-600">NFT #{reward.tokenId} minted</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">+{reward.amount} CRT</div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {new Date(reward.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Transaction Hash:</span>
                    <span className="font-mono">{reward.txHash}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
