"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, User } from "lucide-react"
import { useWallet } from "@/hooks/use-wallet"
import { useContract } from "@/hooks/use-contract"

interface NFT {
  tokenId: string
  name: string
  description: string
  image: string
  creator: string
  owner: string
  tokenURI: string
}

export default function NFTGallery() {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { account, isConnected } = useWallet()
  const { getAllNFTs } = useContract()

  const fetchNFTs = async () => {
    setIsLoading(true)
    try {
      // Mock NFT data - in production, fetch from contract events
      const mockNFTs: NFT[] = [
        {
          tokenId: "1",
          name: "Digital Sunset",
          description: "A beautiful digital sunset artwork",
          image: "/placeholder.svg?height=300&width=300",
          creator: "0x1234...5678",
          owner: "0x1234...5678",
          tokenURI: "ipfs://...",
        },
        {
          tokenId: "2",
          name: "Abstract Dreams",
          description: "An abstract representation of dreams",
          image: "/placeholder.svg?height=300&width=300",
          creator: "0x9876...4321",
          owner: "0x9876...4321",
          tokenURI: "ipfs://...",
        },
      ]

      setNfts(mockNFTs)
    } catch (error) {
      console.error("Error fetching NFTs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isConnected) {
      fetchNFTs()
    }
  }, [isConnected])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">NFT Gallery</h2>
          <p className="text-gray-600">Explore all minted artworks</p>
        </div>
        <Button onClick={fetchNFTs} variant="outline" disabled={isLoading}>
          {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
          Refresh
        </Button>
      </div>

      {nfts.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-gray-400 mb-4">
              <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No NFTs Found</h3>
            <p className="text-gray-600">Be the first to mint an NFT and start earning creator tokens!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <Card key={nft.tokenId} className="overflow-hidden">
              <div className="aspect-square relative">
                <img src={nft.image || "/placeholder.svg"} alt={nft.name} className="w-full h-full object-cover" />
                <Badge className="absolute top-2 right-2">#{nft.tokenId}</Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-lg">{nft.name}</CardTitle>
                <CardDescription>{nft.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>
                    Creator: {nft.creator.slice(0, 6)}...{nft.creator.slice(-4)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span>
                    Owner: {nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}
                  </span>
                </div>

                {nft.creator === account && (
                  <Badge variant="secondary" className="w-fit">
                    Your Creation
                  </Badge>
                )}

                {nft.owner === account && nft.creator !== account && (
                  <Badge variant="outline" className="w-fit">
                    You Own This
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
