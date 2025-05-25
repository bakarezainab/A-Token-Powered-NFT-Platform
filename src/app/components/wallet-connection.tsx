"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/hooks/use-wallet"
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut, CheckCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function WalletConnection() {
  const { account, isConnected, connect, disconnect } = useWallet()
  const [copied, setCopied] = useState(false)

  const copyAddress = async () => {
    if (account) {
      await navigator.clipboard.writeText(account)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const openInExplorer = () => {
    if (account) {
      window.open(`https://sepolia-blockscout.lisk.com/address/${account}`, "_blank")
    }
  }

  if (!isConnected) {
    return (
      <Button
        onClick={connect}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        size="lg"
        data-connect-wallet
      >
        <Wallet className="w-4 h-4 mr-2" />
        Connect Wallet
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-xl shadow-lg"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
          <span className="font-mono">
            {account?.slice(0, 6)}...{account?.slice(-4)}
          </span>
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-gray-900/95 backdrop-blur-xl border-gray-700 shadow-2xl">
        <div className="p-3 border-b border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-sm font-medium text-white">Connected</span>
          </div>
          <p className="text-xs text-gray-400 font-mono break-all">{account}</p>
        </div>

        <DropdownMenuItem
          onClick={copyAddress}
          className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
        >
          {copied ? <CheckCircle className="w-4 h-4 mr-2 text-green-400" /> : <Copy className="w-4 h-4 mr-2" />}
          {copied ? "Copied!" : "Copy Address"}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={openInExplorer}
          className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View on Explorer
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-gray-700" />

        <DropdownMenuItem
          onClick={disconnect}
          className="text-red-400 hover:text-red-300 hover:bg-red-900/20 cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
