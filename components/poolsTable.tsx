import React, { useContext, useEffect, useState } from "react";
import { useReadContract } from "thirdweb/react";
import { TokenContext } from "../lib/tokenContext";
import {
  FACTORY_CONTRACT,
  FACTORY_CONTRACTT,
  getAmmContract,
  tokens,
} from "../lib/tokenContext";
import { formatNumber } from "./swap";
import { toEther } from "thirdweb";

const PoolsTable = () => {
  const { currentChain, tokenPrices } = useContext(TokenContext);
  const factoryContract =
    currentChain?.id === 1116 ? FACTORY_CONTRACT() : FACTORY_CONTRACTT();

  const [pairAddresses, setPairAddresses] = useState([]);
  const [constants, setConstants] = useState([]);

  // Fetch total number of pairs from the contract
  const { data: pairsLength, isPending } = useReadContract({
    contract: factoryContract,
    method: "allPairsLength",
    params: [],
  });

  // Generate constants array once pairsLength is available (0-indexed)
  useEffect(() => {
    if (pairsLength) {
      const num = Number(pairsLength);
      const newConstants = [];
      for (let i = 0; i < num; i++) {
        const letter = String.fromCharCode(97 + i);
        newConstants.push({ letter, value: i });
      }
      setConstants(newConstants);
    }
  }, [pairsLength]);

  // Fetch all pair addresses using the constants array
  useEffect(() => {
    const fetchPairAddresses = async () => {
      if (factoryContract && constants.length > 0) {
        try {
          // Cast to any so that we can access the "allPairs" method
          const contractAny = factoryContract as any;
          const addresses = await Promise.all(
            constants.map(async (c) => {
              const pairAddress = await contractAny.allPairs(c.value);
              return pairAddress;
            })
          );
          setPairAddresses(addresses);
        } catch (err) {
          console.error("Error fetching pair addresses:", err);
        }
      }
    };

    fetchPairAddresses();
  }, [constants, factoryContract]);

  return (
    <div className="pools-table-container">
      {isPending && <div>Loading...</div>}
      <table className="pools-table">
        <thead>
          <tr>
            <th>Pair</th>
            <th>Pool</th>
            <th>Liquidity (USD)</th>
          </tr>
        </thead>
        <tbody>
          {pairAddresses.map((pairAddress) => (
            <PairItem
              key={pairAddress}
              pairAddress={pairAddress}
              currentChain={currentChain}
              tokenPrices={tokenPrices}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PairItem = ({ pairAddress, currentChain, tokenPrices }) => {
  const pairContract = getAmmContract(pairAddress, currentChain);

  // Fetch token addresses
  const { data: token0 } = useReadContract({
    contract: pairContract,
    method: "token0",
    params: [],
  });

  const { data: token1 } = useReadContract({
    contract: pairContract,
    method: "token1",
    params: [],
  });

  // Fetch reserves for liquidity calculations
  const { data: reserves } = useReadContract({
    contract: pairContract,
    method: "getReserves",
    params: [],
  });

  // Map tokens using your tokens config
  const tokenA = token0
    ? Object.values(tokens).find(
        (t) => t.address.toLowerCase() === token0.toLowerCase()
      )
    : null;
  const tokenB = token1
    ? Object.values(tokens).find(
        (t) => t.address.toLowerCase() === token1.toLowerCase()
      )
    : null;

  // Calculate liquidity (converting reserves if available)
  const reserveA = reserves ? Number(toEther(reserves[0])) : 0;
  const reserveB = reserves ? Number(toEther(reserves[1])) : 0;
  const liquidityUSD =
    (tokenA ? reserveA * (tokenPrices[tokenA.symbol] || 0) : 0) +
    (tokenB ? reserveB * (tokenPrices[tokenB.symbol] || 0) : 0);

  return (
    <tr className="pool-row">
      <td className="pool-pair">
        <div className="token-images">
          {tokenA && (
            <img
              src={tokenA.image}
              alt={tokenA.symbol}
              className="token-image"
            />
          )}
          {tokenB && (
            <img
              src={tokenB.image}
              alt={tokenB.symbol}
              className="token-image"
            />
          )}
        </div>
        {tokenA?.symbol || "Unknown"}/{tokenB?.symbol || "Unknown"}
      </td>
      <td className="pool-address">{pairAddress}</td>
      <td className="pool-liquidity">${formatNumber(liquidityUSD, 2)}</td>
      <td className="pool-volume">-</td>
    </tr>
  );
};

export default PoolsTable;
