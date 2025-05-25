"use client"

import { ethers } from "ethers"
import { useWallet } from "./use-wallet"

// Contract ABI (simplified for demo)
const CONTRACT_ABI = [
  "function mintNFT(address to, string memory tokenURI) public returns (uint256)",
  "function balanceOf(address account) public view returns (uint256)",
  "function totalSupply() public view returns (uint256)",
  "function getCreator(uint256 tokenId) public view returns (address)",
  "function tokenURI(uint256 tokenId) public view returns (string)",
  "event NFTMinted(uint256 indexed tokenId, address indexed creator, string tokenURI)",
  "event CreatorRewarded(address indexed creator, uint256 amount, uint256 indexed tokenId)",
]

// Replace with your deployed contract address
const CONTRACT_ADDRESS = "0x346811cA80f5F630afc5F8C965fF721f233506BC" // Your deployed contract address

export function useContract() {
  const { signer, provider } = useWallet()

  const getContract = () => {
    if (!signer) throw new Error("Wallet not connected")
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
  }

  const mintNFT = async (to: string, tokenURI: string) => {
    const contract = getContract()
    const tx = await contract.mintNFT(to, tokenURI)
    await tx.wait()
    return tx.hash
  }

  const getTokenBalance = async (address: string) => {
    if (!provider) return "0"
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)
    const balance = await contract.balanceOf(address)
    return ethers.formatEther(balance)
  }

  const getAllNFTs = async () => {
    // Implementation to fetch all NFTs from contract events
    // This would involve listening to NFTMinted events
    return []
  }

  return {
    mintNFT,
    getTokenBalance,
    getAllNFTs,
  }
}
