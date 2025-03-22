import React, { useEffect, useState } from 'react'

import { FACTORY_CONTRACTT, FACTORY_CONTRACT, TokenContext, getAmmContract
} from '../lib/tokenContext';
import { useContext } from 'react';
import { getContract, Address, toWei, toEther } from 'thirdweb';
import { client } from '../lib/thirdweb-client';
import { useReadContract } from 'thirdweb/react';
import { formatNumber } from './swap';
import { truncateAddress } from '../utils/truncateAddress';
import useCopyToClipboard from './copy';
import { useToast } from '../utils/toast';
import { ethers } from 'ethers';


interface Props {
  openModal3: () => void;
  closeModal: () => void;
  openModal1: () => void;
  closeModal1: () => void;

}
const TokenHeader: React.FC<Props> = ({
  openModal3,
  closeModal,
  openModal1,
  closeModal1,
}) => {
  const [priceChanges, setPriceChanges] = useState<Record<string, string>>({
    '30min': '0.00%',
    '1hr': '0.00%',
    '5hr': '0.00%',
    '24hr': '0.00%',
  });
  
  // And update the ranges type:
  const ranges: Record<string, number> = {
    '1min': 5 * 60,
    '30min': 30 * 60,
    '1hr': 60 * 60,
    '5hr': 5 * 60 * 60,
    '24hr': 24 * 60 * 60,
  };

  const { token1, setToken1, token2, setToken2, currentChain, tokenReserves, getTokenPrice, getLiquidity } = useContext(TokenContext);
  const factoryContract = FACTORY_CONTRACT();
  const factoryContractt = FACTORY_CONTRACTT();
  const { data: pair } = useReadContract({
    contract: currentChain.id===1116?factoryContract : factoryContractt,
  method:
    "getPair",
  params: [token1?.address, token2?.address],
});

const { data: oracle, isPending: loading } = useReadContract({
    contract: currentChain.id===1116?factoryContract : factoryContractt,
  method:
    "getPairOracle",
  params: [pair],
});
const contract = getContract({
  client: client,
  chain: currentChain, // Set your chain ID
  address: oracle || '0x5b1670639F70645D207d23e97D097BD9E8620c4b',
  abi: [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_amm",
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
          "name": "token1",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "token2",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "PriceUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "token1",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "token2",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isBuy",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "TransactionRecorded",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "HISTORY_INTERVAL",
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
      "name": "MAX_STALE",
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
      "name": "PRECISION",
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
      "name": "WINDOW_SIZE",
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
      "name": "amm",
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
          "name": "tokenA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "range",
          "type": "uint256"
        }
      ],
      "name": "getPriceHistory",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
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
      "name": "getTWAP",
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
      "name": "getTransactionData",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "buyCount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "sellCount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "lastUpdated",
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
      "name": "priceRecords",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "cumulativePrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "lastPrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
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
      "name": "transactionRecords",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "buyCount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "sellCount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "lastUpdated",
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
        },
        {
          "internalType": "uint256",
          "name": "newPrice",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isBuy",
          "type": "bool"
        }
      ],
      "name": "updatePrice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
});

const { data: reserves, isPending: twapLoading } = useReadContract({
  contract: getAmmContract(pair as Address || token2?.address, currentChain),
  method: "getReserves",
  params: [token1?.address, token2?.address],
});

const { data: currentPrice } = useReadContract({
  contract: getAmmContract(pair as Address || token2?.address, currentChain),
  method: "getTokenPriceInUSDT",
  params: [token1?.address],
});

const { addToast } = useToast();
const [isCopied, setIsCopied] = useState<boolean>(false);
const { copyToClipboard } = useCopyToClipboard();
useEffect(() => {
  if (isCopied) {
    const timer = setTimeout(() => setIsCopied(false), 2000);
    return () => clearTimeout(timer);
  }
}, [isCopied]);
const handleCopyClick = () => {
  copyToClipboard(pair || '').then((success) => {
    if (success) {
      addToast('success', 'Address copied');
    } else {
      addToast('error', 'Failed to copy address.');
    }
  });
};
const tokenC = getContract({
  client: client,
  chain: currentChain, // Set your chain ID
  address: token1?.address ?? token2?.address 
});

const { data: totalSupply} = useReadContract({
  contract: tokenC,
  method: "function totalSupply() view returns (uint256)",
  params: [],
});

const { data: history30m } = useReadContract({
  contract: contract,
  method: "getPriceHistory",
  params: [token1?.address, token2?.address, BigInt(ranges['30min'])],
})
const { data: history1m } = useReadContract({
  contract: contract,
  method: "getPriceHistory",
  params: [token1?.address, token2?.address, BigInt(ranges['1min'])],
})
const { data: history1hr } = useReadContract({
  contract: contract,
  method: "getPriceHistory",
  params: [token1?.address, token2?.address, BigInt(ranges['1hr'])],
})

const { data: history5hr } = useReadContract({
  contract: contract,
  method: "getPriceHistory",
  params: [token1?.address, token2?.address, BigInt(ranges['5hr'])],
})

const { data: history24hr } = useReadContract({
  contract: contract,
  method: "getPriceHistory",
  params: [token1?.address, token2?.address, BigInt(ranges['24hr'])],
})

  // Calculate percentage changes
  useEffect(() => {

    const calculateChange = (history: any[] | readonly [readonly bigint[], readonly bigint[]]) => {
      if (!history || !history[0]?.length || history[0].length < 2) return 0
      
      const prices = history[0]
      const initialPrice = Number(prices[0]) / 1e18
      const finalPrice = Number(prices[prices.length - 1]) / 1e18
      
      const change = ((finalPrice - initialPrice) / initialPrice * 100)
      return change.toFixed(2) // Returns string with 2 decimal places
    }
  
    setPriceChanges({
      '30min': `${calculateChange(history30m)}%`,
      '1hr': `${calculateChange(history1hr)}%`,
      '5hr': `${calculateChange(history5hr)}%`,
      '24hr': `${calculateChange(history24hr)}%`,
    })
  }, [history30m, history1hr, history5hr, history24hr])

const [price, setPrice] = useState(0)
const r1 = reserves?.[0]
const r2 = reserves?.[1]



const { data: Symbol, isPending } = useReadContract({
  contract: getAmmContract(pair as Address || token2?.address, currentChain),
  method: "token1",
  params: [],
});
useEffect(() => {
  const interval = setInterval(() => {
    const fetchPrice = async () => {
      const fetchedPrice = await getTokenPrice(token1?.symbol);
      setPrice(fetchedPrice);
    };
    fetchPrice();
  }, 30000); // 30 seconds refresh
  return () => clearInterval(interval);
}, [token1?.symbol]);

const liquidity = getLiquidity(token1?.symbol);

  return (
    <>
      <div className={`token-header-container10 `}>
        <div className="token-header-container11">
          <div className="token-header-container12">
            <div className="token-header-container13">
              <svg
                width="24"
                height="24"
                viewBox="0 0 32 32"
                className="token-header-icon10"
              >
                <path
                  d="m16 2l-4.55 9.22l-10.17 1.47l7.36 7.18L6.9 30l9.1-4.78L25.1 30l-1.74-10.13l7.36-7.17l-10.17-1.48Z"
                  fill="currentColor"
                ></path>
              </svg>
              <div className="token-header-container14">
                <div className="token-header-container15">
                  <img
                    src={token1?.image}
                    className="token-header-image1"
                  />
                </div>
                <div className="token-header-container16">
                  <img
                   src={token2?.image}
                    className="token-header-image2"
                  />
                </div>
              </div>
            </div>
            <div className="token-header-container17">
              <h3 className="token-header-text10">
              <span className="token-header-text29">{token1 && token2 ? `${token1?.symbol}/${token2?.symbol}` : 'Unselected'}</span>
              </h3>
              <div className="token-header-container18">
                <span className="token-header-text11">
                <span className="token-header-text32">
                        Contract: {truncateAddress(pair)}
                      </span>
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className="token-header-icon12"
                  onClick={handleCopyClick}
                >
                  <path
                    d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="token-header-container19">
              <div className="token-header-container20">
               
                <span className="token-header-text12">
                <span className="token-header-text22">Holders: </span>
                </span>
                <span className="token-header-text13">
                <span className="token-header-text28">0.0%</span>
                </span>
              </div>
           
            </div>
          </div>
          <div className="token-header-container22">
            <div className="token-header-container23">
              <h1 className="token-header-text14">
              <span className="token-header-text26">${token1?.symbol==='USDT'?formatNumber(1):formatNumber(toEther(currentPrice || toWei('0')))}</span>
              </h1>
              <span className={`token-header-text15  ${
        parseFloat(priceChanges["24hr"]) > 0 ? 'positive' : parseFloat(priceChanges["24hr"])===0 ? '': parseFloat(priceChanges["24hr"])<0 && 'negative'
      }`}>
              <span className="token-header-text25">  {parseFloat(priceChanges["24hr"]) > 0 && '+'}{priceChanges["24hr"]}</span>
              </span>
            </div>
            <div className="token-header-container25">
              <h1 className="token-header-text18">
              <span className="token-header-text23">Market cap</span>
              </h1>
              <span className="token-header-text19">
              <span className="token-header-text31">0.0</span>
              </span>
            </div>
            <div className="token-header-container26">
              <h1 className="token-header-text20">
              <span className="token-header-text30">Liquidity</span>
              </h1>
              <span className="token-header-text21">
              <span className="token-header-text24">${formatNumber(toEther(liquidity))}</span>
              </span>
            </div>
            <svg
            onClick={openModal3}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="token-header-icon21"
            >
              <path
                d="m21.32 9.55l-1.89-.63l.89-1.78A1 1 0 0 0 20.13 6L18 3.87a1 1 0 0 0-1.15-.19l-1.78.89l-.63-1.89A1 1 0 0 0 13.5 2h-3a1 1 0 0 0-.95.68l-.63 1.89l-1.78-.89A1 1 0 0 0 6 3.87L3.87 6a1 1 0 0 0-.19 1.15l.89 1.78l-1.89.63a1 1 0 0 0-.68.94v3a1 1 0 0 0 .68.95l1.89.63l-.89 1.78A1 1 0 0 0 3.87 18L6 20.13a1 1 0 0 0 1.15.19l1.78-.89l.63 1.89a1 1 0 0 0 .95.68h3a1 1 0 0 0 .95-.68l.63-1.89l1.78.89a1 1 0 0 0 1.13-.19L20.13 18a1 1 0 0 0 .19-1.15l-.89-1.78l1.89-.63a1 1 0 0 0 .68-.94v-3a1 1 0 0 0-.68-.95M20 12.78l-1.2.4A2 2 0 0 0 17.64 16l.57 1.14l-1.1 1.1l-1.11-.6a2 2 0 0 0-2.79 1.16l-.4 1.2h-1.59l-.4-1.2A2 2 0 0 0 8 17.64l-1.14.57l-1.1-1.1l.6-1.11a2 2 0 0 0-1.16-2.82l-1.2-.4v-1.56l1.2-.4A2 2 0 0 0 6.36 8l-.57-1.11l1.1-1.1L8 6.36a2 2 0 0 0 2.82-1.16l.4-1.2h1.56l.4 1.2A2 2 0 0 0 16 6.36l1.14-.57l1.1 1.1l-.6 1.11a2 2 0 0 0 1.16 2.79l1.2.4ZM12 8a4 4 0 1 0 4 4a4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2"
                fill="currentColor"
              ></path>
            </svg>
            <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM877.714 449.714v126.857c0 8.571-6.857 18.857-16 20.571l-105.714 16c-6.286 18.286-13.143 35.429-22.286 52 19.429 28 40 53.143 61.143 78.857 3.429 4 5.714 9.143 5.714 14.286s-1.714 9.143-5.143 13.143c-13.714 18.286-90.857 102.286-110.286 102.286-5.143 0-10.286-2.286-14.857-5.143l-78.857-61.714c-16.571 8.571-34.286 16-52 21.714-4 34.857-7.429 72-16.571 106.286-2.286 9.143-10.286 16-20.571 16h-126.857c-10.286 0-19.429-7.429-20.571-17.143l-16-105.143c-17.714-5.714-34.857-12.571-51.429-21.143l-80.571 61.143c-4 3.429-9.143 5.143-14.286 5.143s-10.286-2.286-14.286-6.286c-30.286-27.429-70.286-62.857-94.286-96-2.857-4-4-8.571-4-13.143 0-5.143 1.714-9.143 4.571-13.143 19.429-26.286 40.571-51.429 60-78.286-9.714-18.286-17.714-37.143-23.429-56.571l-104.571-15.429c-9.714-1.714-16.571-10.857-16.571-20.571v-126.857c0-8.571 6.857-18.857 15.429-20.571l106.286-16c5.714-18.286 13.143-35.429 22.286-52.571-19.429-27.429-40-53.143-61.143-78.857-3.429-4-5.714-8.571-5.714-13.714s2.286-9.143 5.143-13.143c13.714-18.857 90.857-102.286 110.286-102.286 5.143 0 10.286 2.286 14.857 5.714l78.857 61.143c16.571-8.571 34.286-16 52-21.714 4-34.857 7.429-72 16.571-106.286 2.286-9.143 10.286-16 20.571-16h126.857c10.286 0 19.429 7.429 20.571 17.143l16 105.143c17.714 5.714 34.857 12.571 51.429 21.143l81.143-61.143c3.429-3.429 8.571-5.143 13.714-5.143s10.286 2.286 14.286 5.714c30.286 28 70.286 63.429 94.286 97.143 2.857 3.429 4 8 4 12.571 0 5.143-1.714 9.143-4.571 13.143-19.429 26.286-40.571 51.429-60 78.286 9.714 18.286 17.714 37.143 23.429 56l104.571 16c9.714 1.714 16.571 10.857 16.571 20.571z"></path>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .positive {
            color:  rgb(93, 255, 93) !important;
          }
          
          .negative {
            color: #f44336 !important;
          }
          .token-header-container10 {
            gap: 8px;
            flex: 0 0 auto;
            color: #5a5a5a;
            width: 100%;
            display: flex;
            align-items: flex-start;
            padding-top: var(--dl-space-space-halfunit);
            border-color: rgba(120, 120, 120, 0.4);
            border-width: 1px;
            padding-left: var(--dl-space-space-unit);
            padding-right: var(--dl-space-space-unit);
            flex-direction: column;
            padding-bottom: var(--dl-space-space-halfunit);
            backdrop-filter: blur(1px);
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
          }
          .token-header-container11 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .token-header-container12 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            display: flex;
            align-items: center;
          }
          .token-header-container13 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .token-header-icon10 {
            fill: var(--dl-color-theme-neutral-dark);
            color: #e89c00;
            cursor: pointer;
          }
          .token-header-container14 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            width: 47px;
            height: 47px;
            display: flex;
            padding: 4px;
            position: relative;
            align-items: center;
            border-color: rgba(0, 0, 0, 0.18);
            border-width: 0px;
            backdrop-filter: blur(20px);
            border-radius: 10px;
            justify-content: center;
            background-color: rgba(0, 0, 0, 0.2);
          }
          .token-header-container15 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            overflow: hidden;
            align-items: center;
            justify-content: flex-end;
          }
          .token-header-image1 {
            height: 30px;
            object-fit: cover;
          }
          .token-header-container16 {
            flex: 0 0 auto;
            right: -12px;
            width: auto;
            bottom: -8px;
            height: auto;
            display: flex;
            overflow: hidden;
            position: absolute;
            align-items: center;
            justify-content: flex-end;
          }
          .token-header-image2 {
            height: 22px;
            overflow: hidden;
            object-fit: cover;
            border-radius: var(--dl-radius-radius-radius4);
            object-position: left;
          }
          .token-header-container17 {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            padding-left: 10px;
            flex-direction: column;
            justify-content: center;
          }
          .token-header-text10 {
            color: #a0a0a0;
            width: 100%;
            font-size: 25px;
          }
          .token-header-container18 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .token-header-icon12 {
            fill: var(--dl-color-theme-neutral-dark);
            color: #737373;
            cursor: pointer;
          }
          .token-header-container19 {
            gap: 5px;
            flex: 0 0 auto;
            width: auto;
            height: 55px;
            display: flex;
            align-items: flex-end;
          }
          .token-header-container20 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            padding: 3px;
            align-items: center;
            border-radius: var(--dl-radius-radius-radius4);
            background-color: #a4a4a4;
          }
          .token-header-text12 {
            font-size: 14px;
          }
          .token-header-text13 {
            color: lightgray;
            font-size: 14px;
          }
          .token-header-container21 {
            flex: 0 0 auto;
            width: auto;
            cursor: pointer;
            height: auto;
            display: flex;
            padding: 3px;
            align-items: center;
            border-radius: var(--dl-radius-radius-radius4);
            justify-content: center;
            background-color: #d9d9d9;
          }
          .token-header-icon16 {
            fill: var(--dl-color-theme-neutral-dark);
            color: #6b6b6b;
          }
          .token-header-container22 {
            gap: var(--dl-space-space-twounits);
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .token-header-container23 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .token-header-text14 {
            font-size: 16px;
          }
         
          .token-header-container24 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .token-header-text16 {
            font-size: 16px;
          }
          .token-header-text17 {
           
          }
          .token-header-container25 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .token-header-text18 {
            font-size: 16px;
          }
          .token-header-text19 {
           
            font-style: normal;
          
            font-weight: 700;
          }
          .token-header-container26 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .token-header-text20 {
            font-size: 16px;
          }
          .token-header-text21 {
           
            font-style: normal;
          
            font-weight: 700;
          }
          .token-header-icon21 {
            cursor: pointer;
          }
          .token-header-text22 {
            display: inline-block;
          }
          .token-header-text23 {
            display: inline-block;
          }
          .token-header-text24 {
            display: inline-block;
          }
          .token-header-text25 {
            display: inline-block;
          }
          .token-header-text26 {
            display: inline-block;
            color: rgba(70, 70, 70, 0.8);
          }
          .token-header-text27 {
            display: inline-block;
          }
          .token-header-text28 {
            display: inline-block;
          }
          .token-header-text29 {
            display: inline-block;
          }
          .token-header-text30 {
            display: inline-block;
          }
          .token-header-text31 {
            display: inline-block;
          }
          .token-header-text32 {
            display: inline-block;
          }
          .token-header-text33 {
            display: inline-block;
          }
          .token-headerroot-class-name {
            background-color: transparent;
          }
          @media (max-width: 1200px) {
            .token-header-container11 {
              width: 100%;
              height: auto;
            }
            .token-header-container12 {
              width: auto;
              height: auto;
              align-items: center;
              padding-left: var(--dl-space-space-unit);
            }
            .token-header-container13 {
              height: 100%;
            }
            .token-header-icon10 {
              fill: var(--dl-color-theme-neutral-dark);
              color: #a7a7a7;
            }
            .token-header-container14 {
              height: auto;
            }
            .token-header-image1 {
              width: auto;
              height: 33px;
            }
            .token-header-image2 {
              left: 90px;
              width: 100%;
              bottom: 17px;
              height: 15px;
            }
            .token-header-container17 {
              align-items: flex-start;
            }
            .token-header-icon12 {
              fill: var(--dl-color-theme-neutral-dark);
              color: #808080;
            }
          }
          @media (max-width: 991px) {
            .token-header-container14 {
              height: auto;
              border-radius: var(--dl-radius-radius-imageradius);
            }
            .token-header-image1 {
              width: auto;
              height: 33px;
            }
            .token-header-container16 {
              right: -10px;
              width: auto;
              bottom: -10px;
              position: absolute;
            }
            .token-header-image2 {
              width: auto;
              height: 15px;
            }
          }
          @media (max-width: 767px) {
            .token-header-container12 {
              padding-left: 0px;
            }
            .token-header-image1 {
              width: auto;
              height: 33px;
            }
            .token-header-image2 {
              left: 75px;
              width: auto;
            }
            .token-header-container20 {
              display: none;
            }
            .token-header-container24 {
              display: none;
            }
            .token-header-container25 {
              display: none;
            }
            .token-header-container26 {
              display: none;
            }
          }
          @media (max-width: 479px) {
            .token-header-container10 {
              padding-left: var(--dl-space-space-halfunit);
              padding-right: var(--dl-space-space-halfunit);
            }
            .token-header-container12 {
              gap: var(--dl-space-space-halfunit);
            }
            .token-header-container14 {
              height: auto;
            }
            .token-header-image1 {
              width: auto;
              height: 32px;
            }
            .token-header-container16 {
              right: -8px;
              width: auto;
              bottom: -6px;
              position: absolute;
            }
            .token-header-image2 {
              left: 65px;
              width: auto;
              bottom: 12px;
              height: 15px;
            }
            .token-header-container17 {
              padding-left: 0px;
            }
            .token-header-text10 {
              font-size: 18px;
            }
            .token-header-text11 {
              font-size: 14px;
            }
            .token-header-container20 {
              display: none;
            }
            .token-header-container21 {
              display: none;
            }
            .token-header-container24 {
              display: none;
            }
            .token-header-container25 {
              display: none;
            }
            .token-header-container26 {
              display: none;
            }
            .token-header-icon21 {
              display: none;
            }
            .token-header-text25 {
              font-size: 10px;
            }
            .token-header-text26 {
              font-size: 16px;
            }
            .token-header-text32 {
              font-size: 10px;
            }
          }
        `}
      </style>
    </>
  )
}



export default TokenHeader
