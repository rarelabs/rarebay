import React, { Fragment, useState, useEffect } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'
import { FACTORY_CONTRACTT, FACTORY_CONTRACT, TokenContext
} from '../lib/tokenContext';
import { useContext } from 'react';
import Change from './change'
import { getContract, Address, toWei, toEther } from 'thirdweb';
import { client } from '../lib/thirdweb-client';
import { useReadContract } from 'thirdweb/react';
import { formatNumber } from './swap';
import { ethers } from 'ethers';
import Image from 'next/image';


const Transactions = (props) => {
  if (!props.visible) return null; 
  const [priceChanges, setPriceChanges] = useState<Record<string, string>>({
    '30min': '0.00%',
    '1hr': '0.00%',
    '5hr': '0.00%',
    '24hr': '0.00%',
  });
  
  // And update the ranges type:
  const ranges: Record<string, number> = {
    '30min': 30 * 60,
    '1hr': 60 * 60,
    '5hr': 5 * 60 * 60,
    '24hr': 24 * 60 * 60,
  };


  const factoryContract = FACTORY_CONTRACT();
  const factoryContractt = FACTORY_CONTRACTT();
  const { token1, setToken1, token2, setToken2, currentChain, tokenReserves, getTokenPrice, getLiquidity } = useContext(TokenContext);
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
const liquidity = getLiquidity(token1?.symbol || token2?.symbol);


  const contract = getContract({
    client: client,
    chain: currentChain,
    address: oracle || '0xd19DEA1Cab59E4Fc3170B5510572b0292f27eC3f',
    abi:  [
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

  const { data: twap, isPending: twapLoading } = useReadContract({
    contract: contract,
    method: "getTWAP",
    params: [token1?.address, token2?.address],
  });
  const { data: txnData, isPending: txnLoading } = useReadContract({
    contract: contract,
    method: "getTransactionData",
    params: [token1?.address, token2?.address],
  });
  // To get the PriceData struct from the public mapping; note that we need token addresses
  const { data: records, isPending: recordsLoading } = useReadContract({
    contract: contract,
    method: "priceRecords",
    params: [token1?.address, token2?.address],
  });

  // Additional states for token metrics (these might come from token1 or an external source)
  const [holders, setHolders] = useState(token1?.holders || 0);
  const [marketCap, setMarketCap] = useState(token1?.marketCap || 0);
  const [volume, setVolume] = useState(token1?.volume || 0);

  const [circulatingSupply, setCirculatingSupply] = useState(token1?.circulatingSupply || 0);

  // Compute transaction counts from txnData ([buyCount, sellCount, lastUpdated])
  const transactionCount = txnData ? parseInt(txnData[0].toString(), 10) + parseInt(txnData[1].toString(), 10) : 0;
  const buyCount = txnData ? parseInt(txnData[0].toString(), 10) : 0;
  const sellCount = txnData ? parseInt(txnData[1].toString(), 10) : 0;
  const total = buyCount + sellCount;
  const redWidth = total > 0 ? (buyCount / total) * 100 : 50;
  const greenWidth = total > 0 ? (sellCount / total) * 100 : 50;
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

  const { data: getPrice } = useReadContract({
    contract: contract,
    method: "priceRecords",
    params: [token1?.address, token2?.address],
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
const r1 = tokenReserves[0];
const r2 = tokenReserves[1];
  return (
    <>
      <div
        id="transactions"
        className={`transactions-container10 ${props.rootClassName} `}
      >
        <Change
          text2={
            <Fragment>
             <span className={`transactions-text10 ${
        parseFloat(priceChanges["30min"]) > 0 ? 'positive' : parseFloat(priceChanges["30min"])===0 ? '': parseFloat(priceChanges["30min"])<0 && 'negative'
      }`}>
        {parseFloat(priceChanges["30min"]) > 0 && '+'}{priceChanges["30min"]}
      </span>
            </Fragment>
          }
          text3={
            <Fragment>
               <span className={`transactions-text11 ${
        parseFloat(priceChanges["1hr"]) > 0 ? 'positive' : parseFloat(priceChanges["1hr"])===0 ? '': parseFloat(priceChanges["1hr"])<0 && 'negative'
      }`}>
         {parseFloat(priceChanges["1hr"]) > 0 && '+'}{priceChanges["1hr"]}
      </span>
            </Fragment>
          }
          text4={
            <Fragment>
              <span className={`transactions-text12 ${
        parseFloat(priceChanges["5hr"]) > 0 ? 'positive' : parseFloat(priceChanges["5hr"])===0 ? '': parseFloat(priceChanges["5hr"])<0 && 'negative'
      }`}>
        {parseFloat(priceChanges["5hr"]) > 0 && '+'}{priceChanges["5hr"]}
      </span>
            </Fragment>
          }
          text5={
            <Fragment>
            <span className={`transactions-text13 ${
        parseFloat(priceChanges["24hr"]) > 0 ? 'positive' : parseFloat(priceChanges["24hr"])===0 ? '': parseFloat(priceChanges["24hr"])<0 && 'negative'
      }`}>
         {parseFloat(priceChanges["24hr"]) > 0 && '+'}{priceChanges["24hr"]}
      </span>
            </Fragment>
          }
          heading={
            <Fragment>
              <span className="transactions-text14">30m</span>
            </Fragment>
          }
          heading1={
            <Fragment>
              <span className="transactions-text15">1h</span>
            </Fragment>
          }
          heading2={
            <Fragment>
              <span className="transactions-text16">5h</span>
            </Fragment>
          }
          heading3={
            <Fragment>
              <span className="transactions-text17">24h</span>
            </Fragment>
          }
          rootClassName="changeroot-class-name"
        ></Change>
        <div className="transactions-container11">
          <div className="transactions-traders">
            <div className="transactions-container17">
              <div className="transactions-container18">
                <span className="transactions-text21">
                  {props.text15 ?? (
                    <Fragment>
                      <span className="transactions-text54">Transactions: {transactionCount}</span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
            <div className='center'>
            <div className="color-bar">
        <div className="red" style={{ width: `${redWidth}%` }}></div>
        <div className="green" style={{ width: `${greenWidth}%` }}></div>
      </div>
            </div>
            <div className="transactions-container19">
              <div className="transactions-container20">
                <span className="transactions-text22">
                  {props.text16 ?? (
                    <Fragment>
                      <span className="transactions-text44">Buys: {buyCount}</span>
                    </Fragment>
                  )}
                </span>
              </div>
            
              <div className="transactions-container22">
                <span className="transactions-text23">
                  {props.text17 ?? (
                    <Fragment>
                      <span className="transactions-text40">Sells: {sellCount}</span>
                    </Fragment>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="transactions-container24">
          <div className="transactions-container25">
            <div className="transactions-container26">
            <Image
            width={20}
            height={20}
                alt={props.imageAlt}
                src={token1 ? token1.image : token2 ? token2?.image : ''}
                className="transactions-image"
              />
            </div>
            <div className="transactions-container27">
              <h1 className="transactions-text24">
                {props.heading10 ?? (
                  <Fragment>
                    <span className="transactions-text50">{token1 ? token1.symbol : token2 ? token2?.symbol : 'Unselected'}</span>
                  </Fragment>
                )}
              </h1>
              <span>
                {props.text18 ?? (
                  <Fragment>
                    <span className="transactions-text38">{token1 ? token1.name : token2 ? token2?.name : ''}</span>
                  </Fragment>
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="transactions-container28">
          <div className="transactions-container29">
            <h1 className="transactions-text26">
              {props.heading4 ?? (
                <Fragment>
                  <span className="transactions-text42">Holders</span>
                </Fragment>
              )}
            </h1>
            <span className="transactions-text27">
              {props.text6 ?? (
                <Fragment>
                  <span className="transactions-text52">{holders}</span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="transactions-container30">
            <h1 className="transactions-text28">
              {props.heading5 ?? (
                <Fragment>
                  <span className="transactions-text53">Market cap</span>
                </Fragment>
              )}
            </h1>
            <span className="transactions-text29">
              {props.text7 ?? (
                <Fragment>
                  <span className="transactions-text56">$0.0</span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="transactions-container31">
            <h1 className="transactions-text30">
              {props.heading6 ?? (
                <Fragment>
                  <span className="transactions-text45">Liquidity</span>
                </Fragment>
              )}
            </h1>
            <span className="transactions-text31">
              {props.text8 ?? (
                <Fragment>
                  <span className="transactions-text48">${formatNumber(toEther(liquidity))}</span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="transactions-container32">
            <h1 className="transactions-text32">
              {props.heading7 ?? (
                <Fragment>
                  <span className="transactions-text43">Volume</span>
                </Fragment>
              )}
            </h1>
            <span className="transactions-text33">
              {props.text9 ?? (
                <Fragment>
                  <span className="transactions-text46">${}</span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="transactions-container33">
            <h1 className="transactions-text34">
              {props.heading8 ?? (
                <Fragment>
                  <span className="transactions-text55">Total Supply</span>
                </Fragment>
              )}
            </h1>
            <span className="transactions-text35">
              {props.text10 ?? (
                <Fragment>
                  <span className="transactions-text41">{formatNumber(toEther(totalSupply || toWei('0')))}</span>
                </Fragment>
              )}
            </span>
          </div>
          <div className="transactions-container34">
            <h1 className="transactions-text36">
              {props.heading9 ?? (
                <Fragment>
                  <span className="transactions-text49">
                    Circulating Supply
                  </span>
                </Fragment>
              )}
            </h1>
            <span className="transactions-text37">
              {props.text11 ?? (
                <Fragment>
                  <span className="transactions-text51">{circulatingSupply}</span>
                </Fragment>
              )}
            </span>
          </div>
        </div>
      </div>
      <style jsx>
        {`
      
      .color-bar {
        display: flex;
        width: 100%;
        height: 8px;
        gap: 5px;
        overflow: hidden;
    border-radius: 10px;
      }
      .red {
        background-color: limegreen;
        transition: width 0.3s ease;
      }
      .green {
        background-color: red;
        transition: width 0.3s ease;
      }
          .transactions-container10 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            position: relative;
            align-items: flex-start;
            padding-top: var(--dl-space-space-unit);
            border-color: rgba(120, 120, 120, 0.4);
            border-width: 1px;
            flex-direction: column;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 0px;
            font-size: 10px;
          }
          .transactions-text10 {
            display: inline-block;
          }
          .transactions-text11 {
            display: inline-block;
          }
          .transactions-text12 {
            display: inline-block;
          }
          .transactions-text13 {
            display: inline-block;
          }
          .transactions-text14 {
            display: inline-block;
          }
          .transactions-text15 {
            display: inline-block;
          }
          .transactions-text16 {
            display: inline-block;
          }
          .transactions-text17 {
            display: inline-block;
          }
          .transactions-container11 {
            gap: 2px;
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .transactions-transactions {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .transactions-container12 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: flex-start;
            padding-left: var(--dl-space-space-halfunit);
            justify-content: flex-start;
          }
          .transactions-container13 {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .transactions-text18 {
            color: rgb(59, 59, 59);
          }
          .transactions-container14 {
            gap: 2px;
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: flex-start;
            flex-direction: row;
          }
          .transactions-green {
            gap: 4px;
            flex: 0 0 auto;
            width: 50%;
            height: auto;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
          }
          .transactions-container15 {
            flex: 0 0 auto;
            width: 100%;
            height: 8px;
            display: flex;
            align-items: flex-start;
            border-radius: 100px;
            background-color: rgba(30, 148, 0, 0.63);
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          .transactions-text19 {
            font-size: 14px;
          }
          .transactions-red {
            gap: 4px;
            flex: 0 0 auto;
            width: 50%;
            height: auto;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
          }
          .transactions-container16 {
            flex: 0 0 auto;
            width: 100%;
            height: 8px;
            display: flex;
            align-items: flex-start;
            border-radius: 100px;
            background-color: rgba(198, 0, 3, 0.63);
            border-top-left-radius: 0;
            border-top-right-radius: 100px;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 100px;
          }
          .transactions-text20 {
            fill: initial;
            font-size: 14px;
          }
          .transactions-traders {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .transactions-container17 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: flex-start;
            padding-left: var(--dl-space-space-halfunit);
            justify-content: flex-start;
          }
          .transactions-container18 {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .transactions-text21 {
            font-size: 15px;
            
          }
          .transactions-container19 {
            gap: 2px;
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            justify-content: space-between;
          }
          .transactions-container20 {
            gap: 4px;
            flex: 0 0 auto;
            width: 50%;
            height: auto;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
       
          .transactions-text22 {
            font-size: 14px;
          }
          .transactions-container22 {
            gap: 4px;
            flex: 0 0 auto;
            width: 50%;
            height: auto;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
          }
        
          .transactions-text23 {
            font-size: 14px;
          }
          .transactions-container24 {
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
          }
          .transactions-container25 {
            gap: var(--dl-space-space-halfunit);
            height: auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
          }
          .transactions-container26 {
            flex: 0 0 auto;
            display: flex;
            align-items: flex-start;
          }
          .transactions-image {
            width: 30px;
            object-fit: cover;
          }
          .transactions-container27 {
            flex: 0 0 auto;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .transactions-text24 {
            font-size: 18px;
          }
          .transactions-container28 {
            gap: var(--dl-space-space-halfunit);
            width: 100%;
            height: auto;
            display: grid;
            padding: var(--dl-space-space-halfunit);
            grid-template-columns: 1fr 1fr;
          }
          .transactions-container29 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            border-radius: var(--dl-radius-radius-imageradius);
            flex-direction: column;
            justify-content: center;
            background-color: rgba(55, 55, 55, 0.59);
            backdrop-filter: blur(10px);
          }
          .transactions-text26 {
            color: #c5c5c5;
            font-size: 16px;
          }
          .transactions-text27 {
            color: #e2dddd;
          }
          .transactions-container30 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            border-radius: var(--dl-radius-radius-imageradius);
            flex-direction: column;
            justify-content: center;
            background-color: rgba(63, 63, 63, 0.59);
          }
          .transactions-text28 {
            fill: #626262;
            color: #c5c5c5;
            font-size: 14px;
          }
          .transactions-text29 {
            fill: #e2dddd;
            color: #e2dddd;
          }
          .transactions-container31 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            border-radius: var(--dl-radius-radius-imageradius);
            flex-direction: column;
            justify-content: center;
            background-color: rgba(55, 55, 55, 0.59);
            backdrop-filter: blur(10px);
          }
          .transactions-text30 {
            fill: #626262;
            color: #c5c5c5;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
          }
          .transactions-text31 {
            fill: #e2dddd;
            color: #e2dddd;
          }
          .transactions-container32 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            border-radius: var(--dl-radius-radius-imageradius);
            flex-direction: column;
            justify-content: center;
            background-color: rgba(55, 55, 55, 0.59);
            backdrop-filter: blur(10px);
          }
          .transactions-text32 {
            fill: #626262;
            color: #c5c5c5;
            font-size: 14px;
          }
          .transactions-text33 {
            fill: #e2dddd;
            color: #e2dddd;
          }
          .transactions-container33 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            border-radius: var(--dl-radius-radius-imageradius);
            flex-direction: column;
            justify-content: center;
            background-color: rgba(55, 55, 55, 0.59);
            backdrop-filter: blur(10px);
          }
          .transactions-text34 {
            fill: #626262;
            color: #c5c5c5;
            font-size: 14px;
          }
          .transactions-text35 {
            fill: #e2dddd;
            color: #e2dddd;
          }
          .transactions-container34 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            align-items: center;
            border-radius: var(--dl-radius-radius-imageradius);
            flex-direction: column;
            justify-content: center;
            background-color: rgba(55, 55, 55, 0.59);
            backdrop-filter: blur(10px);
          }
          .transactions-text36 {
            fill: #626262;
            color: #c5c5c5;
            font-size: 14px;
          }
          .transactions-text37 {
            fill: #e2dddd;
            color: #e2dddd;
          }
          .transactions-text38 {
            display: inline-block;
          }
          .transactions-text39 {
            display: inline-block;
            font-size: 14px;
            
          }
          .transactions-text40 {
            display: inline-block;
          }
          .transactions-text41 {
            display: inline-block;
          }
          .transactions-text42 {
            display: inline-block;
            font-size: 14px;
          }
          .transactions-text43 {
            display: inline-block;
          }
          .transactions-text44 {
            display: inline-block;
          }
          .transactions-text45 {
            display: inline-block;
          }
          .transactions-text46 {
            display: inline-block;
          }
          .transactions-text47 {
            display: inline-block;
          }
          .transactions-text48 {
            display: inline-block;
          }
          .transactions-text49 {
            display: inline-block;
          }
          .transactions-text50 {
            display: inline-block;
          }
          .transactions-text51 {
            display: inline-block;
          }
          .transactions-text52 {
            display: inline-block;
          }
          .transactions-text53 {
            display: inline-block;
          }
          .transactions-text54 {
            display: inline-block;
            font-size: 14px;
          }
          .transactions-text55 {
            display: inline-block;
          }
          .transactions-text56 {
            display: inline-block;
          }
          .transactions-text57 {
            display: inline-block;
          }

          @media (max-width: 1200px) {
            .transactions-container25 {
              width: auto;
              height: auto;
              align-items: center;
              padding-left: var(--dl-space-space-unit);
            }
            .transactions-container26 {
              width: auto;
              height: auto;
              padding: var(--dl-space-space-halfunit);
            }
            .transactions-image {
              width: 50px;
              height: 100%;
            }
          }
          @media (max-width: 479px) {
            .transactions-image {
              width: 30px;
            }
            .transactions-text38 {
              font-size: 12px;
            }
            .transactions-text50 {
              font-size: 15px;
            }
          }
        `}
      </style>
    </>
  )
}

Transactions.defaultProps = {
  text18: undefined,
  text12: undefined,
  text17: undefined,
  text10: undefined,
  imageAlt: 'image',
  heading4: undefined,
  imageSrc: '/core-200w.png',
  heading7: undefined,
  text16: undefined,
  heading6: undefined,
  text9: undefined,
  text13: undefined,
  text8: undefined,
  heading9: undefined,
  heading10: undefined,
  rootClassName: '',
  text11: undefined,
  text6: undefined,
  heading5: undefined,
  text15: undefined,
  heading8: undefined,
  text7: undefined,
  text14: undefined,
  visible: undefined,
  
}

Transactions.propTypes = {
  text18: PropTypes.element,
  text12: PropTypes.element,
  text17: PropTypes.element,
  text10: PropTypes.element,
  imageAlt: PropTypes.string,
  heading4: PropTypes.element,
  imageSrc: PropTypes.string,
  heading7: PropTypes.element,
  text16: PropTypes.element,
  heading6: PropTypes.element,
  text9: PropTypes.element,
  text13: PropTypes.element,
  text8: PropTypes.element,
  heading9: PropTypes.element,
  heading10: PropTypes.element,
  rootClassName: PropTypes.string,
  text11: PropTypes.element,
  text6: PropTypes.element,
  heading5: PropTypes.element,
  text15: PropTypes.element,
  heading8: PropTypes.element,
  text7: PropTypes.element,
  text14: PropTypes.element,
  visible: PropTypes.any
}

export default Transactions