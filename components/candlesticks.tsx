import React, { Fragment, useState, useEffect, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { FACTORY_CONTRACTT, FACTORY_CONTRACT, TokenContext } from '../lib/tokenContext'
import dynamic from "next/dynamic";
import { getContract } from 'thirdweb'
import { client } from '../lib/thirdweb-client'
import { useReadContract } from 'thirdweb/react'

const Chart = dynamic(() => import("./charts"), { ssr: false });
const Candlesticks = (props) => {
  const { token1, token2, currentChain } = useContext(TokenContext)
  
  // Get factory contracts.
  const factoryContract = FACTORY_CONTRACT()
  const factoryContractt = FACTORY_CONTRACTT()

  // Get pair address.
  const { data: pair } = useReadContract({
    contract: currentChain.id === 1116 ? factoryContract : factoryContractt,
    method: "getPair",
    params: [token1?.address, token2?.address],
  })

  // Get oracle address.
  const { data: oracle } = useReadContract({
    contract: currentChain.id === 1116 ? factoryContract : factoryContractt,
    method: "getPairOracle",
    params: [pair],
  })

  // Create contract instance.
  const contract = getContract({
    client: client,
    chain: currentChain,
    address: '0x8ab18d9Af4e679795677d667E91cf18425046D84',
    abi:  [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_priceOracle",
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
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
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
            "name": "timeRange",
            "type": "uint256"
          }
        ],
        "name": "getCandlesticks",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "open",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "low",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "close",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "buyVolume",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "sellVolume",
                "type": "uint256"
              }
            ],
            "internalType": "struct CandleStick.Candlestick[]",
            "name": "",
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
            "name": "tokenA",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "tokenB",
            "type": "address"
          }
        ],
        "name": "getCandlesticks1hr",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "open",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "low",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "close",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "buyVolume",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "sellVolume",
                "type": "uint256"
              }
            ],
            "internalType": "struct CandleStick.Candlestick[]",
            "name": "",
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
            "name": "tokenA",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "tokenB",
            "type": "address"
          }
        ],
        "name": "getCandlesticks1week",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "open",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "low",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "close",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "buyVolume",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "sellVolume",
                "type": "uint256"
              }
            ],
            "internalType": "struct CandleStick.Candlestick[]",
            "name": "",
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
            "name": "tokenA",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "tokenB",
            "type": "address"
          }
        ],
        "name": "getCandlesticks24hr",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "open",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "low",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "close",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "buyVolume",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "sellVolume",
                "type": "uint256"
              }
            ],
            "internalType": "struct CandleStick.Candlestick[]",
            "name": "",
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
            "name": "tokenA",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "tokenB",
            "type": "address"
          }
        ],
        "name": "getCandlesticks30min",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "open",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "high",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "low",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "close",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "buyVolume",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "sellVolume",
                "type": "uint256"
              }
            ],
            "internalType": "struct CandleStick.Candlestick[]",
            "name": "",
            "type": "tuple[]"
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
        "name": "priceOracle",
        "outputs": [
          {
            "internalType": "contract IPriceOracle",
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
            "name": "_oracle",
            "type": "address"
          }
        ],
        "name": "setOracle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
  })

  // Fetch the full 24h price history.
  // This allows the Chart component to filter data for any range.
  const { data: candlesticks1hr } = useReadContract({
    contract: contract,
    method: "getCandlesticks1hr",
    params: [
      token1?.address, 
      token2?.address, 
    ],
  })
  const { data: candlesticks30min } = useReadContract({
    contract: contract,
    method: "getCandlesticks30min",
    params: [
      token1?.address, 
      token2?.address, 
    ],
  })

  const { data: candlesticks24hr } = useReadContract({
    contract: contract,
    method: "getCandlesticks24hr",
    params: [
      token1?.address, 
      token2?.address, 
    ],
  })

  const { data: candlesticks1week } = useReadContract({
    contract: contract,
    method: "getCandlesticks1week",
    params: [
      token1?.address, 
      token2?.address, 
    ],
  })

  return (
    <div className={`candlesticks-container ${props.rootClassName}`}>
 <div className="center-c">
          <div className="hourglass" />
          <hr />
          <h4 style={{ color: "GrayText" }}>Querying data...</h4>
        </div>
      <style jsx>{`
        .candlesticks-container {
          width: 100%;
          padding: 10px;
          height: 430px;
          background: var(--bg-color);
          border-radius: var(--dl-radius-radius-cardradius);
          overflow: hidden;
          position: relative;
          display: flex;
          justify-content: center;
          coor: gray;
          align-items: center;
        }
        
        @media (max-width: 1200px) {
          .candlesticks-container {
            height: 400px;
          }
        }
        
        @media (max-width: 767px) {
          .candlesticks-container {
            height: 300px;
          }
        }
      `}</style>
    </div>
  )
}

Candlesticks.defaultProps = {
  rootClassName: '',
}

Candlesticks.propTypes = {
  rootClassName: PropTypes.string,
}

export default Candlesticks