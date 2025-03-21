import React, { useState, useEffect, useContext } from "react";
import { useReadContract } from "thirdweb/react";
import { getContract, defineChain } from "thirdweb";
import { TokenContext } from "../lib/tokenContext";

const NFTGallery = () => {
    const { ownedNFTs = [], currentChain } = useContext(TokenContext); // Default to an empty array
    const [nftDetails, setNftDetails] = useState([]);
  
    useEffect(() => {
      const fetchNFTData = async () => {
        if (!Array.isArray(ownedNFTs) || ownedNFTs.length === 0) return;
  
        let updatedNFTs = [];
        for (const nft of ownedNFTs) {
          try {
            const contract = getContract({
              chain: defineChain(currentChain?.id || 1116),
              address: nft.tokenAddress,
            });
  
            const { data: tokenURI, isPending } = useReadContract({
              contract,
              method: "tokenURI",
              params: [nft.tokenId],
            });
  
            if (!isPending && tokenURI) {
              updatedNFTs.push({
                ...nft,
                tokenURI,
              });
            }
          } catch (error) {
            console.error(`Error fetching tokenURI for ${nft.tokenId}:`, error);
          }
        }
        setNftDetails(updatedNFTs);
      };
  
      fetchNFTData();
    }, [ownedNFTs, currentChain]);
  
  return (
    <div className="nft-gallery">
      {nftDetails.map((nft) => (
        <div key={nft.tokenId} className="nft-card">
          <img
            src={nft.tokenURI}
            alt={`NFT ${nft.tokenId}`}
            className="nft-image"
          />
          <p>{nft.collectionName}</p>
        </div>
      ))}
    </div>
  );
};

export default NFTGallery;
