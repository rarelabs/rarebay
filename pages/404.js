import React from 'react'
import Head from 'next/head'

import { useTranslations } from 'next-intl'

const NotFound = (props) => {
  return (
    <>
      <div className="not-found-container1">
      <Head>
  <title>RareBay | Game</title>
  <meta name="description" content="Bitcoin powered⚡ DeFi world.
Swap, Trade, Stake, Play, Earn, Learn, seamlessly, anywhere." />
  
  {/* Open Graph Meta Tags */}
  <meta property="og:title" content="RareBay | Interface" />
  <meta property="og:description" content="Bitcoin powered⚡ DeFi world.
Swap, Trade, Stake, Play, Earn, Learn, seamlessly, anywhere." />
  <meta property="og:image" content="https://rarebay.xyz/rare-900w.png" />  {/* Replace with your image URL */}
  <meta property="og:url" content={window.location.href} />
  
  {/* Twitter Meta Tags */}
  <meta name="twitter:card" content="RareBay | Interface" />
  <meta name="twitter:title" content="RareBay | Interface" />
  <meta name="twitter:description" content="Bitcoin powered⚡ DeFi world.
Swap, Trade, Stake, Play, Earn, Learn, seamlessly, anywhere." />
  <meta name="twitter:image" content="https://rarebay.xyz/rare-900w.png" />  {/* Replace with your image URL */}
</Head>
        <div className="not-found-container2">
          <h1 className="not-found-text2">404</h1>
        </div>
        <div className="not-found-container3">
        </div>
      </div>
      <style jsx>
        {`
          .not-found-container1 {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .not-found-container2 {
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .not-found-text2 {
            color: rgb(38, 38, 38);
            font-size: 252px;
            margin-top: -20px;
            font-weight: 900;
            margin-bottom: -20px;
            letter-spacing: -20px;
          }
          .not-found-container3 {
            width: 421px;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .not-found-text3 {
            text-align: center;
            font-weight: 400;
          }
        `}
      </style>
    </>
  )
}

export default NotFound

