import { ethers } from "ethers"
import { useState, useEffect } from "react"
import axios from "axios"
import Web3Modal from "web3modal"

import { nftaddress, nftmarketaddress } from "../src/contracts/config"

import NFT from "../src/contracts/artifacts/contracts/NFT.sol/NFT.json"
import NFTMarket from "../src/contracts/artifacts/contracts/NFTMarket.sol/NFTMarket.json"

export default function Home() {

  const [nfts,setNfts] = useState([])
  const[loadingState,setLoadingState] = useState('not-loaded')

  useEffect(() => {
    loadNFTs()
  },[])

  async function loadNFTs()
  {
    const provider = new ethers.providers.JsonRpcProvider()
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi,provider)
    const marketContract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, provider)
    const data = await marketContract.fetchMarketItems()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenUri(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description:meta.data.description,
      }

      return item
    }))

    setNfts(item)
    setLoadingState("loaded")
  }

  if(loadingState === "loaded" && !nfts.length)
  {
    return(
      <h1 className="px-20 py-10 text-3xl">No items in Marketplace</h1>
    )
  }
  return (
    <div>
      
    </div>
  )
}
