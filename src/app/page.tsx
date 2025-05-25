"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, ImageIcon, Trophy } from "lucide-react"
import WalletConnection from "./components/wallet-connection"
import NFTMintingForm from "./components/nft-minting-form"
import TokenBalance from "./components/token-balance"
import NFTGallery from "./components/nft-gallery"
import RewardHistory from "./components/reward-history"
import { useWallet } from "@/hooks/use-wallet"

export default function NFTPlatform() {
  const { account, isConnected, connectWallet, disconnect } = useWallet()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Creator Reward Platform</h1>
            <p className="text-lg text-gray-600">Mint NFTs and earn tokens as a creator</p>
          </div>
          <WalletConnection />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Wallet</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isConnected ? "Connected" : "Disconnected"}</div>
              <p className="text-xs text-muted-foreground">
                {isConnected ? `${account?.slice(0, 6)}...${account?.slice(-4)}` : "Connect your wallet"}
              </p>
            </CardContent>
          </Card>

          <TokenBalance />

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">NFTs Created</CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Total artworks minted</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rewards Earned</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0 CRT</div>
              <p className="text-xs text-muted-foreground">Creator tokens earned</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        {isConnected ? (
          <Tabs defaultValue="mint" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="mint">Mint NFT</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
              <TabsTrigger value="tokens">Tokens</TabsTrigger>
            </TabsList>

            <TabsContent value="mint">
              <NFTMintingForm />
            </TabsContent>

            <TabsContent value="gallery">
              <NFTGallery />
            </TabsContent>

            <TabsContent value="rewards">
              <RewardHistory />
            </TabsContent>

            <TabsContent value="tokens">
              <Card>
                <CardHeader>
                  <CardTitle>Token Management</CardTitle>
                  <CardDescription>Manage your Creator Tokens (CRT)</CardDescription>
                </CardHeader>
                <CardContent>
                  <TokenBalance detailed />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Wallet className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-gray-600 mb-6">
                Connect your MetaMask wallet to start minting NFTs and earning creator tokens
              </p>
              <Button onClick={connectWallet} size="lg">
                Connect Wallet
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
