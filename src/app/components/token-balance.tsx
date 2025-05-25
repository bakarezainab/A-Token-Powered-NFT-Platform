"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coins, RefreshCw } from "lucide-react"
import { useWallet } from "@/hooks/use-wallet"
import { useContract } from "@/hooks/use-contract"

interface TokenBalanceProps {
  detailed?: boolean
}

export default function TokenBalance({ detailed = false }: TokenBalanceProps) {
  const [balance, setBalance] = useState("0")
  const [isLoading, setIsLoading] = useState(false)

  const { account, isConnected } = useWallet()
  const { getTokenBalance } = useContract()

  const fetchBalance = async () => {
    if (!account || !isConnected) return

    setIsLoading(true)
    try {
      const balance = await getTokenBalance(account)
      setBalance(balance)
    } catch (error) {
      console.error("Error fetching balance:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBalance()
  }, [account, isConnected])

  if (!detailed) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Creator Tokens</CardTitle>
          <Coins className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{balance} CRT</div>
          <p className="text-xs text-muted-foreground">Earned from creating NFTs</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5" />
          Creator Token Balance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">{balance} CRT</div>
          <p className="text-gray-600">Your Creator Token Balance</p>
        </div>

        <Button onClick={fetchBalance} variant="outline" className="w-full" disabled={isLoading}>
          {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
          Refresh Balance
        </Button>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">How to Earn CRT</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Mint an NFT: +100 CRT</li>
            <li>• Each time someone mints your NFT: +100 CRT</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}