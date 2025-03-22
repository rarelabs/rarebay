import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { truncateAddress } from '../utils/truncateAddress'
import { FACTORY_CONTRACTT, FACTORY_CONTRACT, TokenContext } from '../lib/tokenContext'
import { getContract, toEther } from 'thirdweb'
import { client } from '../lib/thirdweb-client'
import { useContractEvents, useReadContract } from 'thirdweb/react'
import { prepareEvent } from "thirdweb"
import { fromWei } from 'web3-utils'
import { formatNumber } from './swap'

export const timeAgo = (timestamp) => {
  const now = Math.floor(Date.now() / 1000)
  const secondsAgo = now - timestamp

  if (secondsAgo < 60) return `${secondsAgo}s ago`
  if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)}m ago`
  if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)}h ago`
  return `${Math.floor(secondsAgo / 86400)}d ago`
}


const Txtables = (props) => {
  const { token1, token2, currentChain } = useContext(TokenContext)
  const factoryContract = FACTORY_CONTRACT()
  const factoryContractt = FACTORY_CONTRACTT()
  
  const { data: pair } = useReadContract({
    contract: currentChain.id === 1116 ? factoryContract : factoryContractt,
    method: "getPair",
    params: [token1?.address, token2?.address],
  })

  const { data: oracle } = useReadContract({
    contract: currentChain.id === 1116 ? factoryContract : factoryContractt,
    method: "getPairOracle",
    params: [pair],
  })

  const contract = getContract({
    client: client,
    chain: currentChain,
    address: oracle || '0xd19DEA1Cab59E4Fc3170B5510572b0292f27eC3f',
    abi:   [
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
            "name": "inputAmount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "receivedAmount",
            "type": "uint256"
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
          },
          {
            "internalType": "uint256",
            "name": "inputAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "receivedAmount",
            "type": "uint256"
          }
        ],
        "name": "updatePrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
  })

  // Prepare the event signature for TransactionRecorded events
  const preparedEvent = prepareEvent({
    signature:
      "event TransactionRecorded(address indexed token1, address indexed token2, bool isBuy, uint256 inputAmount, uint256 receivedAmount, uint256 timestamp)",
  })

  const { data: events } = useContractEvents({
    contract,
    events: [preparedEvent],
  })

  return (
    <div className={`txtables-transactions ${props.rootClassName}`}>
     {events && events.length > 0 ? (
  <ul className="txtables-ul list">
    {[...events]
      .sort((a, b) => b.transactionIndex - a.transactionIndex) // Sorting in descending order
      .slice(0, 8) // Taking only the latest event
      .map((event, index) => {
        const { token1, token2, isBuy, timestamp } = event.data as unknown as {
          token1: any
          token2: any
          isBuy: boolean
          timestamp: number
        }
        return (
          <>
          <li key={index} className="txtables-li list-item">
            <strong> {event?.transactionIndex} </strong>
             <div className='c'  style={{display: 'flex', borderRadius: '6px', padding: '5px', background: 'rgba(0, 70, 70, 70.8)', opacity: '0.5', fontSize: '13px', minWidth: '110px', justifyContent: 'center'}}>
              <strong></strong> {event?.args?.isBuy ? <p className='positive'>Buy {!event.args.isBuy ? formatNumber(toEther(event.args.inputAmount)): formatNumber(toEther(event.args.receivedAmount))} </p> : <p className='negative'>Sell {!event.args.isBuy ? formatNumber(toEther(event.args.inputAmount)): formatNumber(toEther(event.args.receivedAmount))}</p>}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '6px', padding: '5px', opacity: '1', minWidth: '80px', fontSize: '13px'}}>
              <strong></strong> {timeAgo(fromWei(event?.args?.timestamp?.toString(), 'wei'))}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '6px', padding: '5px', background: 'black', opacity: '0.5', width: 'auto'}}>
              <strong>{event?.blockNumber?.toString()} </strong>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '6px', padding: '5px', opacity: '0.5', width: 'auto'}}>
              <strong> {truncateAddress(event?.transactionHash)} </strong>
              <a href={currentChain?.id===1116
                  ? `https://scan.coredao.org/tx/${event?.transactionHash}`
                  : `https://scan.test.btcs.network/tx/${event?.transactionHash}`}>
                <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M22 3.41421L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L20.5858 2H18C17.4477 2 17 1.55228 17 1C17 0.447715 17.4477 0 18 0H23C23.5523 0 24 0.447715 24 1V6C24 6.55228 23.5523 7 23 7C22.4477 7 22 6.55228 22 6V3.41421Z" fill="#949494"></path>
                </svg>
              </a>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '6px', padding: '5px', opacity: '0.5', width: 'auto'}}>
              <strong></strong>{event?.args?.isBuy ? truncateAddress(event?.args?.token1) : truncateAddress(event?.args?.token2)}{event?.args.token1===token1?.address && token1?.symbol}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '6px', padding: '5px', opacity: '0.5', width: 'auto'}}>
              <strong></strong>{!event?.args?.isBuy ? truncateAddress(event?.args?.token1) : truncateAddress(event?.args?.token2)}
            </div>
          </li>
          </>
        )
      })}
  </ul>
      ) : (
        <div className="txtables-nodata">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="txtables-icon1"
          >
            <g fill="none">
              <path d="M24 0v24H0V0z"></path>
              <path
                d="M12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                fill="currentColor"
              ></path>
              <path
                d="M16.382 4a2 2 0 0 1 1.71.964l.079.142l3.512 7.025a3 3 0 0 1 .308 1.109l.009.232V19a2 2 0 0 1-1.85 1.995L20 21H4a2 2 0 0 1-1.995-1.85L2 19v-5.528a3 3 0 0 1 .22-1.13l.097-.212l3.512-7.024a2 2 0 0 1 1.628-1.1L7.618 4zM8 14H4v5h16v-5h-4v.5a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 8 14.5zm8.382-8H7.618l-3 6H8.5a1.5 1.5 0 0 1 1.493 1.356L10 13.5v.5h4v-.5a1.5 1.5 0 0 1 1.356-1.493L15.5 12h3.882z"
                fill="gray"
              ></path>
            </g>
          </svg>
          <span className="txtables-text2">No data found</span>
        </div>
      )}
      <style jsx>{`
        .txtables-transactions {
          flex: 0 0 auto;
          width: 100%;
          display: flex;
          padding: 10px;
          padding-top: 0px;
          position: relative;
          min-width: auto;
          color: gray;
          height: 380px;
          align-items: center;
          flex-direction: column;
          justify-content: start;
          overflow: scroll;
        }
        .txtables-ul {
          margin: 0;
          padding: 0;
          list-style: none;
          width: 100%;
        }
        .txtables-li {
          width: 100%;
          border-bottom: 1px solid rgba(50 ,50, 50, 0.5);
          display: flex;
          padding: 10px;
          gap: 20px;
          justify-content: space-between;
          align-items: center;
          overflow: scroll;
        }
        .txtables-nodata {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          height: 100%;
        }
        .txtables-icon1 {
          width: 60px;
          height: auto;
        }
        .txtables-text2 {
          display: inline-block;
          margin-top: 10px;
        }
      `}</style>
    </div>
  )
}

Txtables.defaultProps = {
  rootClassName: '',
  text: undefined,
  events: []
}

Txtables.propTypes = {
  rootClassName: PropTypes.string,
  text: PropTypes.element,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.shape({
        token1: PropTypes.string,
        token2: PropTypes.string,
        isBuy: PropTypes.bool,
        timestamp: PropTypes.number,
      }),
    })
  ),
}

export default Txtables
