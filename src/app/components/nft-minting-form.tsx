"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Loader2, CheckCircle } from "lucide-react"
import { useWallet } from "@/hooks/use-wallet"
import { useContract } from "@/hooks/use-contract"

export default function NFTMintingForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null as File | null,
  })
  const [isUploading, setIsUploading] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [txHash, setTxHash] = useState("")
  const [imagePreview, setImagePreview] = useState("")

  const { account } = useWallet()
  const { mintNFT } = useContract()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const uploadToIPFS = async (file: File, metadata: any) => {
    // Simulate IPFS upload - in production, use Pinata or NFT.Storage
    setIsUploading(true)

    try {
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock IPFS hash
      const imageHash = `Qm${Math.random().toString(36).substring(2, 15)}`
      const metadataHash = `Qm${Math.random().toString(36).substring(2, 15)}`

      return {
        imageURI: `https://ipfs.io/ipfs/${imageHash}`,
        metadataURI: `https://ipfs.io/ipfs/${metadataHash}`,
      }
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.image || !formData.name || !account) return

    try {
      // Upload to IPFS
      const metadata = {
        name: formData.name,
        description: formData.description,
        image: "", // Will be set after image upload
        attributes: [
          {
            trait_type: "Creator",
            value: account,
          },
          {
            trait_type: "Created",
            value: new Date().toISOString(),
          },
        ],
      }

      const { imageURI, metadataURI } = await uploadToIPFS(formData.image, metadata)

      // Mint NFT
      setIsMinting(true)
      const hash = await mintNFT(account, metadataURI)
      setTxHash(hash)

      // Reset form
      setFormData({ name: "", description: "", image: null })
      setImagePreview("")
    } catch (error) {
      console.error("Error minting NFT:", error)
      alert("Error minting NFT. Please try again.")
    } finally {
      setIsMinting(false)
    }
  }

  if (txHash) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">NFT Minted Successfully!</h3>
          <p className="text-gray-600 mb-4">Your NFT has been minted and you've earned 100 Creator Tokens!</p>
          <div className="bg-gray-100 p-3 rounded-lg mb-4">
            <p className="text-sm text-gray-600">Transaction Hash:</p>
            <p className="font-mono text-xs break-all">{txHash}</p>
          </div>
          <Button onClick={() => setTxHash("")}>Mint Another NFT</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mint New NFT</CardTitle>
        <CardDescription>Create a new NFT artwork and earn 100 Creator Tokens as a reward</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="image">Artwork Image</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {imagePreview ? (
                <div className="space-y-4">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="max-w-full h-48 object-contain mx-auto rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("image-input")?.click()}
                  >
                    Change Image
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("image-input")?.click()}
                    >
                      Choose Image
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              )}
              <input id="image-input" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">NFT Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter NFT name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your artwork"
              rows={3}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Creator Reward</h4>
            <p className="text-sm text-blue-700">
              You'll receive <strong>100 Creator Tokens (CRT)</strong> when someone mints your NFT!
            </p>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!formData.image || !formData.name || isUploading || isMinting}
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading to IPFS...
              </>
            ) : isMinting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Minting NFT...
              </>
            ) : (
              "Mint NFT"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
