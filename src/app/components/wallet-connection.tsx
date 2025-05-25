"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, LogOut, AlertCircle } from "lucide-react"
import { useWallet } from "@/hooks/use-wallet"

export default function WalletConnection() {
  const { account, isConnected, connectWallet, disconnect, chainId } = useWallet()

  // Lisk Sepolia testnet chain ID
  const LISK_SEPOLIA_CHAIN_ID = 4202

  const isCorrectNetwork = chainId === LISK_SEPOLIA_CHAIN_ID

  if (!isConnected) {
    return (
      <Button onClick={connectWallet} className="flex items-center gap-2">
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
    )
  }

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            <span className="text-sm font-medium">Wallet Connected</span>
          </div>
          <Button variant="ghost" size="sm" onClick={disconnect}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">
            {account?.slice(0, 6)}...{account?.slice(-4)}
          </div>

          <div className="flex items-center gap-2">
            {isCorrectNetwork ? (
              <Badge variant="secondary" className="text-xs">
                Lisk Sepolia
              </Badge>
            ) : (
              <Badge variant="destructive" className="text-xs flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Wrong Network
              </Badge>
            )}
          </div>

          {!isCorrectNetwork && <p className="text-xs text-red-600">Please switch to Lisk Sepolia testnet</p>}
        </div>
      </CardContent>
    </Card>
  )
}