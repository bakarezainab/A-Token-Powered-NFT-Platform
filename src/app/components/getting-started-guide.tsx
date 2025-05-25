"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Wallet, Upload, CheckCircle, ArrowRight, Sparkles, ImageIcon, Trophy } from "lucide-react"

interface GettingStartedGuideProps {
  isOpen: boolean
  onClose: () => void
  onConnectWallet: () => void
}

export function GettingStartedGuide({ isOpen, onClose, onConnectWallet }: GettingStartedGuideProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Connect Your Wallet",
      description: "Connect your MetaMask wallet to get started with CreatorVerse",
      icon: Wallet,
      color: "from-blue-500 to-cyan-500",
      action: "Connect Wallet",
      details: [
        "Install MetaMask browser extension",
        "Create or import your wallet",
        "Connect to Lisk Sepolia testnet",
        "Get some test ETH from the faucet",
      ],
    },
    {
      title: "Upload Your Artwork",
      description: "Choose your best digital artwork to mint as an NFT",
      icon: ImageIcon,
      color: "from-purple-500 to-pink-500",
      action: "Upload Image",
      details: [
        "Supported formats: PNG, JPG, GIF",
        "Maximum file size: 10MB",
        "High resolution recommended",
        "Original artwork only",
      ],
    },
    {
      title: "Add Metadata",
      description: "Give your NFT a name and description",
      icon: Upload,
      color: "from-green-500 to-emerald-500",
      action: "Add Details",
      details: [
        "Choose a catchy name",
        "Write a compelling description",
        "Add relevant attributes",
        "Preview your NFT",
      ],
    },
    {
      title: "Mint & Earn",
      description: "Mint your NFT and earn 100 Creator Tokens instantly",
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
      action: "Mint NFT",
      details: ["Pay gas fees for minting", "NFT stored on IPFS", "Earn 100 CRT tokens", "Share with the community"],
    },
  ]

  const handleStepAction = (stepIndex: number) => {
    if (stepIndex === 0) {
      onConnectWallet()
      onClose()
    } else if (stepIndex < steps.length - 1) {
      setCurrentStep(stepIndex + 1)
    } else {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gray-900/95 backdrop-blur-xl border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Getting Started with CreatorVerse
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Follow these simple steps to create your first NFT and start earning Creator Tokens.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="flex items-center space-x-2">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      index < currentStep ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Current Step */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${steps[currentStep].color} rounded-xl flex items-center justify-center`}
                >
                  {(() => {
                    const Icon = steps[currentStep].icon
                    return <Icon className="w-6 h-6 text-white" />
                  })()}
                </div>
                <div>
                  <CardTitle className="text-white">{steps[currentStep].title}</CardTitle>
                  <p className="text-gray-400 text-sm">{steps[currentStep].description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {steps[currentStep].details.map((detail, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{detail}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* All Steps Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <Card
                  key={index}
                  className={`bg-white/5 backdrop-blur-xl border-white/10 cursor-pointer transition-all duration-300 ${
                    index === currentStep ? "border-purple-500/50 shadow-lg" : "hover:border-gray-600"
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  <CardContent className="p-4 text-center">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${step.color} rounded-lg flex items-center justify-center mx-auto mb-2`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-white text-sm mb-1">{step.title}</h4>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        index <= currentStep
                          ? "bg-green-900/30 text-green-300 border-green-500/30"
                          : "bg-gray-800 text-gray-400 border-gray-600"
                      }`}
                    >
                      {index < currentStep ? "Completed" : index === currentStep ? "Current" : "Pending"}
                    </Badge>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={() => handleStepAction(currentStep)}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {steps[currentStep].action}
              <ArrowRight className="w-4 h-4 ml-2" />
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
