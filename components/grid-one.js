import React, { Fragment, useState } from 'react'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl'

import Tabs from './tabs'
import Swap from './swap'
import Trade from './trade'

import Transactions from './transactions'
import Pools from './pools'

const GridOne = (props) => {
  if (!props.visible) return null; // Do not render if not visible
  const style = {
    order: props.order, // Use order from props
    // Add other styles if needed
  };
  const [activeTab, setActiveTab] = useState('swap'); // Default active tab

  

  return (
    <>
      <div style={style} className={`grid-one-container1 ${props.rootClassName} `}>
        <div className="grid-one-container2"></div>
        <Tabs
        togglePro={props.togglePro}
        proMode={props.proMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openModal3={props.openModal3}
        
        ></Tabs>
       {activeTab === 'swap' && <Swap></Swap>}
        {activeTab === 'limit' && 
        <Trade></Trade>
        }
          {activeTab === 'liquidity' && 
          <Pools />
          }
        <Transactions
        visible={props.proMode}
        
          rootClassName="transactionsroot-class-name"
        ></Transactions>

      </div>
      <style jsx>
        {`
          .grid-one-container1 {
            gap: var(--dl-space-space-halfunit);
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .grid-one-container2 {
            flex: 0 0 auto;
            width: 100%;
            height: 100px;
            display: none;
            align-items: flex-start;
          }
          .grid-one-text10 {
            display: inline-block;
          }
          .grid-one-text11 {
            display: inline-block;
          }
          .grid-one-text12 {
            display: inline-block;
          }
          .grid-one-text13 {
            display: inline-block;
          }
          .grid-one-text14 {
            display: inline-block;
          }
          .grid-one-text15 {
            display: inline-block;
            font-family: 'Arial Black';
          }
          .grid-one-text16 {
            display: inline-block;
            font-family: 'Arial Black';
          }
          .grid-one-text17 {
            display: inline-block;
          }
          .grid-one-text18 {
            display: inline-block;
          }
          .grid-one-text19 {
            display: inline-block;
          }
          .grid-one-text20 {
            display: inline-block;
          }
          .grid-one-text21 {
            display: inline-block;
          }
          .grid-one-text22 {
            display: inline-block;
          }
          .grid-one-text23 {
            display: inline-block;
          }
          .grid-one-text24 {
            display: inline-block;
          }
          .grid-one-text25 {
            display: inline-block;
          }
          .grid-one-text26 {
            display: inline-block;
          }
          .grid-one-text27 {
            display: inline-block;
          }
          .grid-one-text28 {
            display: inline-block;
          }
          .grid-one-text29 {
            display: inline-block;
          }
          .grid-one-text30 {
            display: inline-block;
          }
          .grid-one-text31 {
            display: inline-block;
          }
          .grid-one-text32 {
            display: inline-block;
          }
          .grid-one-text33 {
            display: inline-block;
          }
          .grid-one-text34 {
            display: inline-block;
          }
          .grid-one-text35 {
            display: inline-block;
          }
          .grid-one-text36 {
            display: inline-block;
          }
          .grid-one-text37 {
            display: inline-block;
            font-size: 14px;
            font-family: 'Arial Black';
          }
          .grid-one-text38 {
            display: inline-block;
          }
          .grid-one-text39 {
            display: inline-block;
          }
          .grid-one-text40 {
            display: inline-block;
            font-size: 14px;
          }
          .grid-one-text41 {
            display: inline-block;
          }
          .grid-one-text42 {
            display: inline-block;
          }
          .grid-one-text43 {
            display: inline-block;
          }
          .grid-one-text44 {
            display: inline-block;
          }
          .grid-one-text45 {
            display: inline-block;
          }
          .grid-one-text46 {
            display: inline-block;
          }
          .grid-one-text47 {
            display: inline-block;
          }
          .grid-one-text48 {
            display: inline-block;
          }
          .grid-one-text49 {
            display: inline-block;
          }
          .grid-one-text50 {
            display: inline-block;
          }
          .grid-oneroot-class-name {
            top: 0px;
            left: 0px;
            width: 23%;
            bottom: 0px;
            height: auto;
            position: static;
          }
          @media (max-width: 1600px) {
            .grid-one-container1 {
              width: 100%;
              padding-top: 3px;
            }
            .grid-oneroot-class-name {
              width: auto;
            }
          }
          @media (max-width: 1200px) {
            .grid-one-container1 {
              width: 100%;
            }
            .grid-oneroot-class-name {
              width: 30%;
              height: auto;
            }
          }
          @media (max-width: 991px) {
            .grid-one-container1 {
              width: 100%;
            }
            .grid-one-container2 {
              height: 52px;
            }
            .grid-oneroot-class-name {
              width: auto;
            }
          }
          @media (max-width: 767px) {
            .grid-one-container1 {
              width: 100%;
            }
            .grid-oneroot-class-name {
              width: 100%;
              display: flex;
              position: relative;
            }
          }
          @media (max-width: 479px) {
            .grid-one-container1 {
              width: 100%;
            }
            .grid-one-container2 {
              display: none;
              border-width: 0px;
            }
            .grid-one-text43 {
              font-size: 12px;
            }
            .grid-one-text50 {
              font-size: 15px;
            }
            .grid-oneroot-class-name {
              height: auto;
              display: flex;
              padding-top: 0px;
            }
          }
        `}
      </style>
    </>
  )
}

GridOne.defaultProps = {
  rootClassName: '',
  order: undefined,
  openModal3: undefined,
  visible: undefined,
  togglePro: undefined,
  proMode: undefined
}

GridOne.propTypes = {
  rootClassName: PropTypes.string,
  order: PropTypes.any,
  openModal3: PropTypes.any,
  visible: PropTypes.any,
  togglePro: PropTypes.any,
  proMode: PropTypes.any
}

export default GridOne
