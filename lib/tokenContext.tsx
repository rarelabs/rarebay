import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useRef,
} from 'react';
import Token from '../types/token';
import {
  defineChain,
  getContract as thirdwebGetContract,
  Address,
  Chain,
  PreparedTransaction,
  prepareContractCall,
} from 'thirdweb';
import {
  useActiveAccount,
  useActiveWalletChain,
  useSwitchActiveWalletChain,
  useReadContract,
} from 'thirdweb/react';
import { client } from './thirdweb-client';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'; // Import js-cookie for client-side cookie management

// ---------------------
// 1. Global Context & Provider
// ---------------------

export const TokenContext = createContext<any>(null);

// Define chains
const chain1116 = defineChain(1116);
const chain1115 = defineChain(1115);

type TokenProviderProps = {
  children: ReactNode;
};



export const TokenProvider = ({ children }: TokenProviderProps) => {
  const [ownedNFTs, setOwnedNFTs] = useState<any[]>([]);
  const [token1, setToken1] = useState<any>(null);
  const [token2, setToken2] = useState<any>(null);

  // Retrieve active chain from thirdweb
  const activeWalletChain = useActiveWalletChain();
  const [currentChain, setCurrentChain] = useState(activeWalletChain);
  const [availableChains, setAvailableChains] = useState([chain1116, chain1115]);
  const activeChain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  const [tokenReserves, setTokenReserves] = useState<{
    [pair: string]: { reserveA: number; reserveB: number };
  }>({});
  // State to store token prices in USDT (USDT price = 1 by definition)
  const [tokenPrices, setTokenPrices] = useState<{ [symbol: string]: number }>({
    USDT: 1,
  });

  

  
  const TOLERANCE = 1; // 10% tolerance for price fluctuation

  // Update reserve pairs so that USDT is always token2
  const handleReserveUpdate = (
    tokenA: Token,
    tokenB: Token,
    reserves: { reserveA: number; reserveB: number }
  ) => {
    let key = '';
    let updatedReserves = { reserveA: reserves.reserveA, reserveB: reserves.reserveB };
  
    // If tokenA is USDT, swap so USDT is tokenB.
    if (tokenA.symbol === 'USDT' && tokenB.symbol !== 'USDT') {
      key = `${tokenB.symbol}-USDT`;
      // Swap reserves: originally, reserveA (USDT) and reserveB (token)
      updatedReserves = { reserveA: reserves.reserveB, reserveB: reserves.reserveA };
    } else if (tokenB.symbol === 'USDT' && tokenA.symbol !== 'USDT') {
      // Correct order: tokenA is non-USDT, tokenB is USDT.
      key = `${tokenA.symbol}-USDT`;
    } else {
      // For pairs without USDT, use the original order.
      key = `${tokenA.symbol}-${tokenB.symbol}`;
    }
    setTokenReserves((prev) => ({ ...prev, [key]: updatedReserves }));
  };


  // Calculate token prices based on the fetched reserves.
  // For direct USDT pairs, calculate: price = reserveUSDT / reserveTOKEN.
  // Calculate and update prices every second.
// Price calculation: update token prices every 5 seconds.
useEffect(() => {
  const interval = setInterval(async () => {
    // Start with USDT price set as 1.
    const newPrices: { [symbol: string]: number } = { USDT: 1 };

    // Ensure we initialize prices for all tokens except USDT.
    const allTokens = Object.values(tokens)
      .map((token) => token.symbol)
      .filter((symbol) => symbol !== 'USDT');
    allTokens.forEach((symbol) => {
      // Carry over the last known price (or 0 if not set).
      newPrices[symbol] = tokenPrices[symbol] || 0;
    });

    // Process each pair in tokenReserves.
    for (const pairKey of Object.keys(tokenReserves)) {
      const { reserveA, reserveB } = tokenReserves[pairKey];
      const [tokenSymbol, pairToken] = pairKey.split('-');

      // Only process pairs where the second token is USDT.
      if (reserveA > 0) {
        // Calculate price as: price = reserveUSDT / reserveTOKEN.
        // Here, reserveB is USDT and reserveA is the token's reserve.
        const price = reserveB / reserveA;
        const currentPrice = tokenPrices[tokenSymbol] || 0;

        await fetch('/api/prices', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
    
              tokenSymbol,
              price,
            }),
          });
      }
      // Ignore pairs where USDT is not in the token2 position.
    }

    setTokenPrices(newPrices);
  }, 1000);

  return () => clearInterval(interval);
}, [tokenReserves, tokens, tokenPrices]);


const getTokenPrice = async (tokenSymbol?: string): Promise<number | undefined> => {
    if (!tokenSymbol) return undefined;
    try {
      const res = await fetch('/api/getPrices');
      const { prices } = await res.json();
      const tokenData = prices.find((item: any) => item.token_symbol === tokenSymbol);
      return tokenData ? Number(tokenData.price) : undefined;
    } catch (error) {
      console.error('Error fetching token price', error);
      return undefined;
    }
  };

   // Returns the current liquidity (USDT pooled) for a given token symbol.
   const getLiquidity = (tokenSymbol: string): number => {
    // If the token is USDT, you might want to handle it differently.
    if (tokenSymbol === 'USDT') return 0;
    const pairKey = `${tokenSymbol}-USDT`;
    const pair = tokenReserves[pairKey];
    if (pair && pair.reserveB) {
      return Math.floor(pair.reserveB);
    }
    return 0;
  };

  const [tokenLiquidity, setTokenLiquidity] = useState<{ [symbol: string]: number }>({});

  
  const changeChain = async (chainId: number) => {
    if (availableChains) {
      try {
        if (activeChain?.id === 1116) {
          await switchChain(chain1115);
        } else {
          await switchChain(chain1116);
        }
        if (activeChain?.id === 1115)  {
          await switchChain(chain1116);
        } else {
          await switchChain(chain1115);
        }
      } catch (error) {
        console.error("Failed to switch chain:", error);
      }
    } else {
      console.warn(`Chain with ID ${chainId} is not available.`);
    }
  };

  // For demonstration, we set token1 and token2 on mount.
  // (They will be replaced with the ones defined below.)
 // Load tokens from cookies on mount
 useEffect(() => {
  const savedToken2 = Cookies.get('token2');

  // If tokens exist in cookies, set them; otherwise, use defaults
  setToken2(savedToken2 ? JSON.parse(savedToken2) : tokens["RareCoin"]);
}, []);



useEffect(() => {
  if (token2) {
    Cookies.set('token2', JSON.stringify(token2), { expires: 7 }); // Expires in 7 days
  }
}, [token2]);

useEffect(() => {
  if (activeWalletChain) {
    setCurrentChain(activeWalletChain);
  } else {
    setCurrentChain(chain1116);
  }
}, [activeWalletChain]);


  // ---------------------
  // Refresh App on Chain Change
  // ---------------------
  const router = useRouter();
  const prevChainRef = useRef<Chain | undefined>(currentChain);

  useEffect(() => {
    if (currentChain && currentChain.id) {
      // Update the URL to include the currentChain query parameter
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, chain: currentChain.id },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [currentChain, router]);

  const account = useActiveAccount();

  // Example NFT fetch (adjust logic as needed)
  useEffect(() => {
    const fetchNFTData = async () => {
      if (!Array.isArray(ownedNFTs) || ownedNFTs.length === 0) return;

      let updatedNFTs: any[] = [];
      for (const nft of ownedNFTs) {
        try {
          const contract = thirdwebGetContract({
            client,
            chain: defineChain(currentChain?.id || 1116),
            address: nft.collectionAddress,
          });

          const { data: tokenURI, isPending } = useReadContract({
            contract,
            method: 'tokenURI',
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
      // You can update state here if needed.
      // setNftDetails(updatedNFTs);
    };

    fetchNFTData();
  }, [ownedNFTs, currentChain]);
  const [slippage, setSlippage] = useState<any>('auto');
  const [gasPriority, setGasPriority] = useState("auto");
  // Calculates the minimum amount after applying slippage on a given inputAmount.
  // For instance, for an inputAmount of 100 and slippage of 0.5%, the minimum output will be 100 * (1 - 0.005) = 99.5.
  const getMinimumAmount = (inputAmount: number): number => {
    return inputAmount * (1 - slippage / 100);
  };
  return (
    <TokenContext.Provider
      value={{
        token1,
        getTokenPrice,
        getLiquidity,
        setToken1,
        token2,
        setToken2,
        currentChain,
        changeChain,
        availableChains,
        slippage,
        setSlippage,
        getMinimumAmount,
        tokens,
        tokenReserves,
        tokenPrices,
        handleReserveUpdate
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};


// ---------------------
// 2. Global Contract Hook
// ---------------------

/**
 * Custom hook to return a contract instance using the global chain
 * from context. If a chain is provided via options, it will override
 * the global chain.
 */
export const useGlobalContract = (options: {
  address: Address;
  chain?: Chain;
}) => {
  const { currentChain } = useContext(TokenContext);
  
  if (!currentChain) {
    throw new Error("No active chain found");
  }

  return thirdwebGetContract({
    client,
    chain: currentChain,
    address: options.address,
    abi:   [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "newAdjustableFee",
            "type": "uint256"
          }
        ],
        "name": "AdjustFee",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount1",
            "type": "uint256"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "Burn",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount1",
            "type": "uint256"
          }
        ],
        "name": "DividendsWithdrawn",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount1",
            "type": "uint256"
          }
        ],
        "name": "Mint",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount1",
            "type": "uint256"
          }
        ],
        "name": "OwnerRewardsWithdrawn",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "priceOracle",
            "type": "address"
          }
        ],
        "name": "PriceOracleSet",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount0In",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount1In",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount0Out",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount1Out",
            "type": "uint256"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "Swap",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint112",
            "name": "reserve0",
            "type": "uint112"
          },
          {
            "indexed": false,
            "internalType": "uint112",
            "name": "reserve1",
            "type": "uint112"
          }
        ],
        "name": "Sync",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "DOMAIN_SEPARATOR",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "MINIMUM_LIQUIDITY",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "PERMIT_TYPEHASH",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount0Desired",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount1Desired",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "addLiquidity",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount1",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "liquidity",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "adjustableFee",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "burn",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount1",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "inputAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "minOutput",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "expiration",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "inputToken",
            "type": "address"
          }
        ],
        "name": "calculateDynamicLimitPrice",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "limitPrice",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "dividendLockTime",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "dividendPerToken0Stored",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "dividendPerToken1Stored",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "inputAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "minOutput",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "expiration",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "inputToken",
            "type": "address"
          }
        ],
        "name": "executeTimedLimitOrder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "factory",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "fixedFee",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "tokenIn",
            "type": "address"
          }
        ],
        "name": "getAmountOut",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "amountOut",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "inputAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "minOutput",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "duration",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "inputToken",
            "type": "address"
          }
        ],
        "name": "getCurrentValidPrice",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getReserves",
        "outputs": [
          {
            "internalType": "uint112",
            "name": "_reserve0",
            "type": "uint112"
          },
          {
            "internalType": "uint112",
            "name": "_reserve1",
            "type": "uint112"
          },
          {
            "internalType": "uint32",
            "name": "_blockTimestampLast",
            "type": "uint32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          }
        ],
        "name": "getUserLiquidity",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_token0",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_token1",
            "type": "address"
          }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "kLast",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "lastTotalFee",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount0Out",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount1Out",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          },
          {
            "internalType": "uint256",
            "name": "limitPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "expiration",
            "type": "uint256"
          }
        ],
        "name": "limitSwap",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "mint",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "liquidity",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "nonces",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ownerReward0",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ownerReward1",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ownerRewardLockTimestamp",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ownerWithdrawn0",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ownerWithdrawn1",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "pendingDividends0",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "pendingDividends1",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
          },
          {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
          }
        ],
        "name": "permit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "price0CumulativeLast",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "price1CumulativeLast",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "priceOracle",
        "outputs": [
          {
            "internalType": "contract PriceOracle",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "liquidity",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount0Min",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount1Min",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "removeLiquidity",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount1",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_fee",
            "type": "uint256"
          }
        ],
        "name": "setAdjustableFee",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_priceOracle",
            "type": "address"
          }
        ],
        "name": "setPriceOracle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "skim",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount0Out",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount1Out",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "name": "swap",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "inputAmount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "inputToken",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "outputToken",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "swapTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "sync",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "token0",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "token1",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "userDividendPerToken0Paid",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "userDividendPerToken1Paid",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "withdrawDividends",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "withdrawOwnerRewards",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
  });
};

export const useGlobalContract2 = (options: {
  address: Address;
  chain?: Chain;
}) => {
  const { currentChain } = useContext(TokenContext);
  
  if (!currentChain) {
    throw new Error("No active chain found");
  }

  return thirdwebGetContract({
    client,
    chain: currentChain,
    address: options.address,
    abi:  [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_feeToSetter",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "pair",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "fee",
            "type": "uint256"
          }
        ],
        "name": "AdjustableFeeSet",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "pair",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "oracle",
            "type": "address"
          }
        ],
        "name": "OracleSet",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "token0",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "token1",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "pair",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "PairCreated",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "allPairs",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "allPairsLength",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "tokenA",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "tokenB",
            "type": "address"
          }
        ],
        "name": "createPair",
        "outputs": [
          {
            "internalType": "address",
            "name": "pair",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "feeTo",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "feeToSetter",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "getPair",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "pair",
            "type": "address"
          }
        ],
        "name": "getPairOracle",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          }
        ],
        "name": "getUserPositions",
        "outputs": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "pair",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "liquidity",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "pendingDividends0",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "pendingDividends1",
                "type": "uint256"
              }
            ],
            "internalType": "struct RareBayV2Factory.UserPosition[]",
            "name": "positions",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "pairOracles",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "pair",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_fee",
            "type": "uint256"
          }
        ],
        "name": "setAdjustableFee",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_feeTo",
            "type": "address"
          }
        ],
        "name": "setFeeTo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_feeToSetter",
            "type": "address"
          }
        ],
        "name": "setFeeToSetter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
  });
};

// ---------------------
// 3. Merged Constants & Contract Helpers
// ---------------------

export const tokens: { [id: string]: Token } = {
  "CORE Native": {
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    symbol: 'CORE',
    decimals: 18,
    image: '/core-200w.webp',
    name: 'CORE',
  },
  "RareCoin": {
    address: '0xe280766d22517626A17944Fe11380f13EFf711AD',
    symbol: 'RARE',
    decimals: 18,
    image: '/jhjj-200w.webp',
    name: 'RareCoin',
  },
  'Tether USDT': {
    address: '0x900101d06a7426441ae63e9ab3b9b0f63be145f1',
    symbol: 'USDT',
    decimals: 6,
    image: '/tether-usdt-logo-200h.webp',
    name: 'Tether USDT',
  },
  "USD Coin": {
    address: "0xeab3ac417c4d6df6b143346a46fee1b847b50296",
    symbol: "USDC",
    decimals: 6,
    image: "/usd-coin-usdc-logo-200h.webp",
    name: "USD Coin",
  },
  'Whales Token': {
    address: '0x3a202ee3e212c2884e9ec7001488caf14119754e',
    symbol: 'WHLS',
    decimals: 18,
    image: '/logo.png',
    name: 'Whales Token',
  },
  'Wrapped CORE': {
    address: '0x191e94fa59739e188dce837f7f6978d84727ad01',
    symbol: 'WCORE',
    decimals: 18,
    image: '/core-200w.webp',
    name: 'Wrapped CORE',
  },
  "Wrapped Bitcoin": {
    address: "0x5832f53d147b3d6cd4578b9cbd62425c7ea9d0bd",
    symbol: "WBTC",
    decimals: 18,
    image: "/bitcoin-btc-logo-200h.webp",
    name: "Wrapped Bitcoin",
  },
  "Liquid Staked CORE": {
    address: "0x5832f53d147b3d6cd4578b9cbd62425c7ea9d0bd",
    symbol: "stCORE",
    decimals: 18,
    image: "/stcore.png",
    name: "Liquid Staked CORE",
  },
  "Wrapped Ethereum": {
    address: "0xeab3ac417c4d6df6b143346a46fee1b847b50296",
    symbol: "WETH",
    decimals: 18,
    image: "/ethereum-eth-logo-200h.webp",
    name: "Wrapped Ethereum",
  }
} as const;

export const tokenst: { [id: string]: Token } = {
  "CORE Native": {
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    symbol: "CORE",
    decimals: 18,
    image: "/core-200w.webp",
    name: "CORE",
  },
  "Wrapped Bitcoin": {
    address: "0x977D2eF69Ed2C194f4666B291BCA74F51cF43Bfb",
    symbol: "WBTC",
    decimals: 18,
    image: "/bitcoin-btc-logo-200h.webp",
    name: "Wrapped Bitcoin",
  },
  "RareCoin": {
    address: "0x3ba7144cFefc12F8C9687C676A65731C9E2339d0",
    symbol: "TRARE",
    decimals: 18,
    image: "/jhjj-200w.webp",
    name: "RareCoin",
  },
  "Tether USDT": {
    address: "0x809F26F719c0Cd95d64A1cbCE6C34B67E1613498",
    symbol: "USDT",
    decimals: 6,
    image: "/tether-usdt-logo-200h.webp",
    name: "Tether USDT",
  },
  "USD Coin": {
    address: "0x99661adb50173B9423719864dcfc8569D15f3255",
    symbol: "USDC",
    decimals: 6,
    image: "/usd-coin-usdc-logo-200h.webp",
    name: "USD Coin",
  },
  "Whales Token": {
    address: "0xc800e1E1FbC42CA9381Efd8991276A576dcd87AD",
    symbol: "TWHLS",
    decimals: 18,
    image: "/logo.png",
    name: "Whales Token",
  },
} as const;

export const FACTORY = '0xF747e68b3c52A887A88f4f7c110D3de3c80c32a5' as const;
export const FACTORYT = "0x849A8591eC76e1Fd946db21c5F210c048697bF0B" as const;

/**
 * Custom hook to get the factory contract using the global chain.
 * Must be used within a component wrapped by TokenProvider.
 */
export const FACTORY_CONTRACT = () => {
  const { currentChain } = useContext(TokenContext);
  return useGlobalContract2({ 
    address: FACTORY,
    chain: currentChain
   });

};

export const FACTORY_CONTRACTT = () => {
  const { currentChain } = useContext(TokenContext);
  return useGlobalContract2({ 
    address: FACTORYT,
    chain: currentChain
   });

};

/**
 * Custom hook to get an AMM contract using the global chain.
 * @param address The contract address.
 */
export const getAmmContract = (address: Address, chain: any) => {

  return useGlobalContract({ 
    address: address,
    chain: chain
   });

};

/**
 * Custom hook to get an Oracle contract using the global chain.
 * @param address The contract address.
 */
export const getOracle = (address: `0x${string}`) => {
  return useGlobalContract({ address });
};

export const getAmmContractt = (address: Address, chain: any) => {

  return useGlobalContract({ 
    address: address,
    chain: chain
   });

};

export const getOraclet = (address: `0x${string}`) => useGlobalContract({ address });

export type SwapOptions = {
  inputToken: Token;
  inputAmount: bigint;
  outputToken: Token;
  minOutputAmount: bigint;
  poolAmm: Address;
  recepient: Address;
  Data: any
};

