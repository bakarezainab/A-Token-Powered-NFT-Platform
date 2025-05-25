"use client"

import { useState } from "react"
import { WalletConnection } from "./components/wallet-connection"
// import { NFTMintingForm } from "@/components/nft-minting-form"
import { NFTMintingForm } from "./components/nft-minting-form"
import { TokenBalance } from "./components/token-balance"
import { NFTGallery } from "./components/nft-gallery"
import { RewardHistory } from "./components/reward-history"
import { useWallet } from "@/hooks/use-wallet"
import { Palette, Coins, Trophy, Sparkles, ImageIcon } from "lucide-react"
import { CommunityModal } from "./components/community-modal"
import { GettingStartedGuide } from "./components/getting-started-guide"
import { EarningsCalculator } from "./components/earnings-calculator"

export default function NFTPlatform() {
  const { account, isConnected, connect } = useWallet()
  const [activeTab, setActiveTab] = useState("mint")
  const [showCommunityModal, setShowCommunityModal] = useState(false)
  const [showGettingStarted, setShowGettingStarted] = useState(false)
  const [showEarningsCalculator, setShowEarningsCalculator] = useState(false)

  const tabs = [
    { id: "mint", label: "Create NFT", icon: Palette },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "rewards", label: "Rewards", icon: Trophy },
    { id: "tokens", label: "Tokens", icon: Coins },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fillOpacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    CreatorVerse
                  </h1>
                  <p className="text-sm text-gray-400">Token-Powered NFT Platform</p>
                </div>
              </div>
              <div data-connect-wallet>
                <WalletConnection />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {!isConnected ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Welcome to CreatorVerse</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                A revolutionary platform where creators earn tokens for every NFT minted. Connect your wallet to start
                creating and earning rewards.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
                <div
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 cursor-pointer hover:border-blue-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  onClick={() => setShowGettingStarted(true)}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Create NFTs</h3>
                  <p className="text-gray-400 mb-4">Upload your artwork and mint unique NFTs on the blockchain</p>
                  <div className="flex items-center text-blue-400 text-sm font-medium">
                    <span>Get Started</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                <div
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 cursor-pointer hover:border-green-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  onClick={() => setShowEarningsCalculator(true)}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                    <Coins className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Earn Tokens</h3>
                  <p className="text-gray-400 mb-4">
                    Get rewarded with Creator Tokens every time someone mints your NFT
                  </p>
                  <div className="flex items-center text-green-400 text-sm font-medium">
                    <span>Start Earning</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                <div
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 cursor-pointer hover:border-purple-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  onClick={() => setShowCommunityModal(true)}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Build Community</h3>
                  <p className="text-gray-400 mb-4">Join a thriving community of creators and collectors</p>
                  <div className="flex items-center text-purple-400 text-sm font-medium">
                    <span>Join Community</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Account Info */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-2">Welcome back, Creator!</h2>
                    <p className="text-gray-400 font-mono text-sm">
                      {account?.slice(0, 6)}...{account?.slice(-4)}
                    </p>
                  </div>
                  <TokenBalance />
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2">
                <div className="flex space-x-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                          activeTab === tab.id
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Tab Content */}
              <div className="min-h-[600px]">
                {activeTab === "mint" && <NFTMintingForm />}
                {activeTab === "gallery" && <NFTGallery />}
                {activeTab === "rewards" && <RewardHistory />}
                {activeTab === "tokens" && (
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Token Management</h3>
                    <TokenBalance detailed />
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
        {/* Community Modal */}
        <CommunityModal isOpen={showCommunityModal} onClose={() => setShowCommunityModal(false)} />
        {/* Getting Started Guide */}
        <GettingStartedGuide
          isOpen={showGettingStarted}
          onClose={() => setShowGettingStarted(false)}
          onConnectWallet={connect}
        />
        {/* Earnings Calculator */}
        <EarningsCalculator isOpen={showEarningsCalculator} onClose={() => setShowEarningsCalculator(false)} />
      </div>
    </div>
  )
}
