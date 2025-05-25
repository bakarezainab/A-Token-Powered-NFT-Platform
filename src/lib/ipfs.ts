// IPFS integration utilities
// In production, integrate with Pinata or NFT.Storage

export async function uploadToIPFS(file: File, metadata: any) {
  // Example Pinata integration
  const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY
  const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY

  try {
    // Upload image first
    const imageFormData = new FormData()
    imageFormData.append("file", file)

    const imageResponse = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        pinata_api_key: PINATA_API_KEY!,
        pinata_secret_api_key: PINATA_SECRET_KEY!,
      },
      body: imageFormData,
    })

    const imageResult = await imageResponse.json()
    const imageURI = `https://gateway.pinata.cloud/ipfs/${imageResult.IpfsHash}`

    // Update metadata with image URI
    const updatedMetadata = {
      ...metadata,
      image: imageURI,
    }

    // Upload metadata
    const metadataResponse = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: PINATA_API_KEY!,
        pinata_secret_api_key: PINATA_SECRET_KEY!,
      },
      body: JSON.stringify(updatedMetadata),
    })

    const metadataResult = await metadataResponse.json()
    const metadataURI = `https://gateway.pinata.cloud/ipfs/${metadataResult.IpfsHash}`

    return {
      imageURI,
      metadataURI,
    }
  } catch (error) {
    console.error("IPFS upload error:", error)
    throw error
  }
}
