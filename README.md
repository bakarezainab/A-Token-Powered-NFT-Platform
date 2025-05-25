# Token-Powered NFT Platform

A decentralized application where users can mint NFTs and creators earn ERC20 tokens as rewards.

## The Contract Adress is 0x346811cA80f5F630afc5F8C965fF721f233506BC

## Check Sepolia Lisk Blockscout Here https://sepolia-blockscout.lisk.com/tx/0x86caac12caea109e5e2397d3ae45407aa996235b64d4ca36a383b203091309fc

## Features

- **NFT Minting**: Create and mint ERC721 NFTs with metadata stored on IPFS
- **Creator Rewards**: Earn 100 Creator Tokens (CRT) for each NFT minted
- **Wallet Integration**: Connect with MetaMask on Lisk Sepolia testnet
- **NFT Gallery**: Browse all minted artworks
- **Reward Tracking**: View your earning history and token balance

## Smart Contract

The platform uses a single smart contract that implements:
- ERC20 token (CreatorToken - CRT)
- ERC721 NFT collection (ArtNFT)
- Automatic reward distribution to creators

## Setup Instructions

### 1. Deploy Smart Contract

1. Install dependencies:
\`\`\`bash
npm install @openzeppelin/contracts
\`\`\`

2. Deploy to Lisk Sepolia:
\`\`\`bash
# Using Hardhat or Remix
# Deploy CreatorRewardPlatform.sol
\`\`\`

3. Update contract address in `.env.local`

### 2. Frontend Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Configure environment variables:
\`\`\`bash
cp .env.example .env.local
# Add your Pinata API keys and contract address
\`\`\`

3. Run development server:
\`\`\`bash
npm run dev
\`\`\`

### 3. IPFS Configuration

Sign up for [Pinata](https://pinata.cloud/) and get your API keys:
- Add API key to `NEXT_PUBLIC_PINATA_API_KEY`
- Add secret key to `NEXT_PUBLIC_PINATA_SECRET_KEY`

## Usage

1. **Connect Wallet**: Connect your MetaMask wallet to Lisk Sepolia
2. **Mint NFT**: Upload an image, add metadata, and mint your NFT
3. **Earn Rewards**: Receive 100 CRT tokens automatically when minting
4. **Browse Gallery**: View all minted NFTs and their creators
5. **Track Rewards**: Monitor your token balance and earning history

## Contract Functions

### ERC20 Functions
- `balanceOf(address)`: Get token balance
- `transfer(address, uint256)`: Transfer tokens
- `approve(address, uint256)`: Approve token spending

### ERC721 Functions
- `mintNFT(address, string)`: Mint new NFT with metadata URI
- `getCreator(uint256)`: Get creator of specific NFT
- `totalSupply()`: Get total number of minted NFTs

### Reward System
- Automatic 100 CRT reward per NFT mint
- Rewards distributed from contract's token reserve
- Event emission for tracking rewards

## Deployment

### Frontend (Vercel)
\`\`\`bash
npm run build
# Deploy to Vercel
\`\`\`

### Smart Contract (Lisk Sepolia)
- Use Remix IDE or Hardhat
- Ensure sufficient testnet ETH for deployment
- Verify contract on Lisk Sepolia explorer

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Blockchain**: Solidity, OpenZeppelin contracts
- **Web3**: ethers.js for blockchain interaction
- **Storage**: IPFS via Pinata for metadata and images
- **Network**: Lisk Sepolia testnet

## License

MIT License
