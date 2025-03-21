import React, { Fragment, useState, useEffect, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { FACTORY_CONTRACTT, FACTORY_CONTRACT, TokenContext } from '../lib/tokenContext'
import Chart from './charts'
import { getContract } from 'thirdweb'
import { client } from '../lib/thirdweb-client'
import { useReadContract } from 'thirdweb/react'

const Candlesticks = (props) => {
  const { token1, token2, currentChain } = useContext(TokenContext)
  const [chartData, setChartData] = useState([])

  // Define available ranges in seconds.
  const ranges = {
    '30m': 30 * 60,
    '1h': 60 * 60,
    '4h': 4 * 60 * 60,
    '24h': 24 * 60 * 60
  }

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
    address: oracle || '0x5b1670639F70645D207d23e97D097BD9E8620c4b',
    abi: [/* Your contract ABI here */]
  })

  // Fetch the full 24h price history.
  // This allows the Chart component to filter data for any range.
  const { data: historyData } = useReadContract({
    contract: contract,
    method: "getPriceHistory",
    params: [
      token1?.address, 
      token2?.address, 
      BigInt(ranges['24h'])
    ],
  })

  // Transform the data to the candlestick format expected by lightweight‑charts.
  const processedData = useMemo(() => {
    if (!historyData || !historyData[0] || !historyData[1]) return []

    return historyData[0].map((price, index) => ({
      time: Number(historyData[1][index]) * 1000, // Convert UNIX timestamp (in seconds) to milliseconds
      open: Number(price) / 1e18,
      high: Number(price) / 1e18,
      low: Number(price) / 1e18,
      close: Number(price) / 1e18,
      volume: 0 // Volume is not available in price history
    }))
  }, [historyData])

  // Update chartData state whenever processedData changes.
  useEffect(() => {
    if (processedData.length > 0) {
      setChartData(processedData)
    }
  }, [processedData])

  
  return (
    <div className={`candlesticks-container ${props.rootClassName}`}>
<div className='center-c'>
<div className='hourglass' />
      <hr />
      <h4>Querying data...</h4>
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